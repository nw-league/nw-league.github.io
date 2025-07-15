import type { GroupPerformance, Leaderboard, StatSummary } from "../types/leaderboard";
import type { GroupKey, Roster } from "../types/roster";

export function getGroupDetails(leaderboard: Leaderboard, rosters: Map<string, Roster>): Map<string, Map<GroupKey, GroupPerformance>> {
    const performance = new Map<string, Map<GroupKey, GroupPerformance>>();

    for (const [company, roster] of rosters) {
        let companyPerformance = performance.get(company);
        if (!companyPerformance) {
            companyPerformance = new Map<GroupKey, GroupPerformance>();
            performance.set(company, companyPerformance);
        }

        for (const [gk, players] of roster.groups) {
            let groupPerformance = companyPerformance.get(gk);
            if (!groupPerformance) {
                groupPerformance = { stats: [] }
                companyPerformance.set(gk, groupPerformance);
            }

            for (const entry of leaderboard.entries) {
                for (const player of players) {
                    if (player.name === entry.player) {
                        entry.role = player.role;
                        groupPerformance.stats.push({ ...entry, role: player.role, });
                    }
                }
            }
        }
    }

    return performance;
}

export function getGroupSummaries(groupDetails: Map<string, Map<GroupKey, GroupPerformance>>) {
    const summaires = new Map<string, Map<GroupKey, StatSummary>>();

    for (const [company, details] of groupDetails) {
        let summary = summaires.get(company);
        if (!summary) {
            summary = new Map<GroupKey, StatSummary>();
            summaires.set(company, summary);
        }

        for (const [gk, entries] of details) {
            let group = summary.get(gk);
            if (!group) {
                group = {
                    name: String(gk),
                    score: 0,
                    kills: 0,
                    deaths: 0,
                    assists: 0,
                    healing: 0,
                    damage: 0,
                    count: 0,
                }
                summary.set(gk, group);
            }

            for (const entry of entries.stats) {
                group.score += entry.score;
                group.kills += entry.kills;
                group.deaths += entry.deaths;
                group.assists += entry.assists;
                group.healing += entry.healing;
                group.damage += entry.damage;
            }
        }
    }

    return summaires;
}
