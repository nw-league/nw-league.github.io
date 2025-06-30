import type { Company } from "../types/company";
import type { Faction } from "../types/faction";
import type { Leaderboard, LeaderboardEntry, StatSummary } from "../types/leaderboard";
import type { Group, Roster } from "../types/roster";
import type { War } from "../types/war";
import { joinCondition } from "../utils/querybuilder";
import { convertFromGoogleSheetsDateString } from "../utils/time";
import { fetchTableFromGoogleSheets } from "./googlesheets";

const kLeaderboardSheetName = "leaderboards";
const kLeadboardQuery = "SELECT D, B, E, F, G, H, I, J, K where C={warId}";
const kWarId = "{warId}"
const kSheetId = "14byZyCAX_N_AA-y_1tv4CLtgTCaOB-Zq8QbOHmavE6Y";

const kIdxName = 1;
const kIdxScore = 2;
const kIdxKills = 3;
const kIdxDeaths = 4;
const kIdxAssists = 5;
const kIdxHealing = 6;
const kIdxDamage = 7;
const kIdxCompany = 8;

const kIdxCompanyName = 0;
const kIdxFactiion = 1;

export async function getLeaderboard(warId: number): Promise<Leaderboard> {
    const warStr = `${warId}`;
    const query = kLeadboardQuery.replace(kWarId, warStr);
    const data = await fetchTableFromGoogleSheets(kSheetId, kLeaderboardSheetName, query);

    const leaderboard: Leaderboard = { entries: [] };

    for (const row of data) {
        const entry: LeaderboardEntry = {
            name: String(row[kIdxName] ?? ""),
            company: String(row[kIdxCompany] ?? ""),
            score: Number(row[kIdxScore] ?? 0),
            kills: Number(row[kIdxKills] ?? 0),
            deaths: Number(row[kIdxDeaths] ?? 0),
            assists: Number(row[kIdxAssists] ?? 0),
            healing: Number(row[kIdxHealing] ?? 0),
            damage: Number(row[kIdxDamage] ?? 0),
        };
        leaderboard.entries.push(entry);
    }

    return leaderboard
}

export async function getCompanyFaction(companyNames: string[]): Promise<Map<string, Faction>> {
    const companyFactions = new Map();
    if (companyNames.length === 0) { return companyFactions; }
    const condition = joinCondition(companyNames, 'OR', 'A');
    const query = `SELECT A, B WHERE (${condition})`;
    const data = await fetchTableFromGoogleSheets(kSheetId, 'companies', query);

    for (const row of data) {
        const name = row[kIdxCompanyName];
        const faction = row[kIdxFactiion];
        companyFactions.set(name, faction);
    }

    return companyFactions;
}

export async function getRosters(warId: number): Promise<Map<string, Roster>> {
    const warStr = `${warId}`;
    const query = `SELECT A, B, C, D, E WHERE B=${warStr}`;
    const data = await fetchTableFromGoogleSheets(kSheetId, 'groups', query);

    const rosters = new Map<string, Roster>();
    for (const row of data) {
        const name = row[0] as string;
        const role = row[4] as string;
        const group = row[2] as number;
        const company = row[3] as string;

        let roster = rosters.get(company);
        if (!roster) {
            roster = { groups: new Map<number, Group>() };
            rosters.set(company, roster);
        }

        let rosterGroup = roster.groups.get(group);
        if (!rosterGroup) {
            rosterGroup = { players: [] };
            roster.groups.set(group, rosterGroup);
        }
        rosterGroup.players.push({ name, role });
    }

    return rosters;
}

export async function getWars(): Promise<War[]> {
    const query = 'SELECT A, B, C, D, E, F, I';
    const data = await fetchTableFromGoogleSheets(kSheetId, 'wars', query);

    const wars = [];
    for (const row of data) {
        const id = row[0] as number;
        const date = convertFromGoogleSheetsDateString(row[1] as string)!;
        const map = row[2] as string;
        const attacker = row[3] as string;
        const defender = row[4] as string;
        const winner = row[5] as string;
        const duration = row[6] as number;
        wars.push({ id, date, map, attacker, defender, winner, duration });
    }
    return wars;
}

export async function getWar(warId: number): Promise<War> {
    const warStr = `${warId}`;
    const query = `SELECT A, B, C, D, E, F, I WHERE A=${warStr}`;
    const data = await fetchTableFromGoogleSheets(kSheetId, 'wars', query);

    const id = data[0][0] as number;
    const date = convertFromGoogleSheetsDateString(data[0][1] as string)!;
    const map = data[0][2] as string;
    const attacker = data[0][3] as string;
    const defender = data[0][4] as string;
    const winner = data[0][5] as string;
    const duration = data[0][6] as number;

    return { id, date, map, attacker, defender, winner, duration };
}

export async function getCompanies(): Promise<Company[]> {
    const query = `SELECT D, E`;
    const data = await fetchTableFromGoogleSheets(kSheetId, 'wars', query);

    const companiesSet = new Set<string>();
    for (const row of data) {
        companiesSet.add(row[0] as string);
        companiesSet.add(row[1] as string);
    }

    const companies = Array.from(companiesSet);
    const factions = await getCompanyFaction(companies);

    const c: Company[] = [];
    for (const company of companies) {
        let f = factions.get(company);
        if (!f) { f = 'Gray' };
        c.push({
            name: company,
            faction: f,
        });
    }

    return c.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
}

export function splitIntoGroups(leaderboard: Leaderboard, groups: Map<string, Roster>): Map<string, Map<number, LeaderboardEntry[]>> {
    const warGroupStats = new Map<string, Map<number, LeaderboardEntry[]>>();

    for (const [company, roster] of groups) {
        let companyGroupStats = warGroupStats.get(company);
        if (!companyGroupStats) {
            companyGroupStats = new Map<number, LeaderboardEntry[]>();
            warGroupStats.set(company, companyGroupStats);
        }

        for (const [n, group] of roster.groups) {
            let groupStats = companyGroupStats.get(n);
            if (!groupStats) {
                groupStats = [];
                companyGroupStats.set(n, groupStats);
            }
            for (const player of group.players) {
                for (const entry of leaderboard.entries) {
                    if (entry.name === player.name) {
                        groupStats.push(entry);
                    }
                }
            }
        }
    }

    return warGroupStats;
}

export function summarizeLeaderboard(leaderboard: Leaderboard): Map<string, StatSummary> {
    const summaries = new Map<string, StatSummary>();

    for (const entry of leaderboard.entries) {
        let summary = summaries.get(entry.company);
        if (!summary) {
            summary = {
                name: entry.company,
                score: 0,
                kills: 0,
                deaths: 0,
                assists: 0,
                healing: 0,
                damage: 0,
            };
            summaries.set(entry.company, summary);
        }

        summary.score += entry.score;
        summary.kills += entry.kills;
        summary.deaths += entry.deaths;
        summary.assists += entry.assists;
        summary.healing += entry.healing;
        summary.damage += entry.damage;
    }

    return summaries;
}

export function summarizeGroups(leaderboard: Leaderboard, rosters: Map<string, Roster>): Map<string, Map<number, StatSummary>> {
    const companyGroupSummaries = new Map();

    for (const [company, roster] of rosters) {
        let groupSummary = companyGroupSummaries.get(company);
        if (!groupSummary) {
            groupSummary = new Map<number, StatSummary>();
            companyGroupSummaries.set(company, groupSummary);
        }
        for (const entry of leaderboard.entries) {
            for (const [n, group] of roster.groups) {
                if (group.players.some(player => player.name === entry.name)) {
                    let summary = groupSummary.get(n);
                    if (!summary) {
                        summary = { name: `${n}`, score: 0, kills: 0, deaths: 0, assists: 0, healing: 0, damage: 0 };
                        groupSummary.set(n, summary);
                    }
                    summary.score += entry.score;
                    summary.kills += entry.kills;
                    summary.deaths += entry.deaths;
                    summary.assists += entry.assists;
                    summary.healing += entry.healing;
                    summary.damage += entry.damage;
                }
            }
        }
    }

    return companyGroupSummaries;
}

async function createTheFullPicture(leaderboard: Leaderboard, rosters: Map<string, Roster>) {

}
