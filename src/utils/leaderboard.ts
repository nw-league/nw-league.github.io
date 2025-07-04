import { type StatSummary, type LeaderboardEntry, type MapStat, type WarsSummary } from "../types/leaderboard"
import type { War } from "../types/war";

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

export function summarizeWars(toSummarize: War[], forCompany: string): WarsSummary {
    const summary: WarsSummary = {
        win: 0,
        loss: 0,
        map: "First Light",
        most_win: "Great Cleave",
        most_loss: "Shattered Mountain",
    }

    const mapStats = new Map<string, MapStat>();

    for (const war of toSummarize) {
        let stat = mapStats.get(war.map);
        if (!stat) {
            stat = { played: 0, win: 0 };
            mapStats.set(war.map, stat);
        }
        stat.played += 1;
        if (war.winner === forCompany) {
            summary.win += 1;
            stat.win += 1;
        } else {
            summary.loss += 1;
        }
    }

    let mostWins = -1;
    let mostWinMap = "";

    for (const [mapName, stat] of mapStats.entries()) {
        if (stat.win > mostWins) {
            mostWins = stat.win;
            mostWinMap = mapName;
        }
    }
    let mostLosses = -1;
    let mostLossMap = "";

    for (const [mapName, stat] of mapStats.entries()) {
        const losses = stat.played - stat.win;
        if (losses > mostLosses) {
            mostLosses = losses;
            mostLossMap = mapName;
        }
    }

    let mostPlayed = -1;
    let mostPlayedMap = "";
    for (const [mapName, stat] of mapStats.entries()) {
        if (mostPlayed < stat.played) {
            mostPlayedMap = mapName;
        }
    }

    summary.map = mostPlayedMap;
    summary.most_win = mostWinMap;
    summary.most_loss = mostLossMap;
    return summary;
}
