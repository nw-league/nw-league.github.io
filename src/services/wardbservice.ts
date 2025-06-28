import type { Faction } from "../types/faction";
import type { Leaderboard, LeaderboardEntry, StatSummary } from "../types/leaderboard";
import type { Roster } from "../types/roster";
import { joinCondition } from "../utils/querybuilder";
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

export async function getRoster(warId: number): Promise<Roster> {
    const warStr = `${warId}`;
    const query = `SELECT A, B, C, D, E WHERE B=${warStr}`;
    const data = await fetchTableFromGoogleSheets(kSheetId, 'groups', query);

    const roster: Roster = { groups: new Map() };

    for (const row of data) {
        const name = row[0] as string;
        const role = row[4] as string;
        const group = row[2] as number;

        let rosterGroup = roster.groups.get(group);
        if (!rosterGroup) {
            rosterGroup = { players: [] };
            roster.groups.set(group, rosterGroup);
        }
        rosterGroup.players.push({ name, role });
    }

    return roster;
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

export function summarizeGroups(leaderboard: Leaderboard, roster: Roster): Map<number, StatSummary> {
    const groupSummaries = new Map();

    for (let [n, _] of roster.groups) {
        groupSummaries.set(n, {
            name: `${n}`,
            score: 0,
            kills: 0,
            deaths: 0,
            assists: 0,
            healing: 0,
            damage: 0,
        })
    }

    for (const entry of leaderboard.entries) {
        for (const [n, group] of roster.groups) {
            if (group.players.map(item => item.name).includes(entry.name)) {
                const summary = groupSummaries.get(n);
                summary.score += entry.score;
                summary.kills += entry.kills;
                summary.deaths += entry.deaths;
                summary.assists += entry.assists;
                summary.healing += entry.healing;
                summary.damage += entry.damage;
            }
        }
    }

    return groupSummaries;
}
