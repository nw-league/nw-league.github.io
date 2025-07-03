import { type StatSummary, type LeaderboardEntry } from "../types/leaderboard"

export function summarize(toSummarize: LeaderboardEntry[]): StatSummary {
    const summary = {
        name: '',
        score: 0,
        kills: 0,
        deaths: 0,
        assists: 0,
        healing: 0,
        damage: 0,
        count: toSummarize.length,
    }

    for (const entry of toSummarize) {
        summary.score += entry.score;
        summary.kills += entry.kills;
        summary.deaths += entry.deaths;
        summary.assists += entry.assists;
        summary.healing += entry.healing;
        summary.damage += entry.damage;
    }

    return summary;
}
