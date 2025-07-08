
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
        mostPlayed: { name: '', count: 0 },
        mostWin: { name: '', count: 0 },
        mostLoss: { name: '', count: 0 },
        defense: { win: 0, loss: 0, count: 0 },
        attack: { win: 0, loss: 0, count: 0 },
        overall: { win: 0, loss: 0, count: 0 },
    }


    const mapStats = new Map<string, MapStat>();

    for (const war of toSummarize) {
        let stat = mapStats.get(war.map);
        if (!stat) {
            stat = { played: 0, win: 0 };
            mapStats.set(war.map, stat);
        }
        stat.played += 1;
        if (war.attacker === forCompany) {
            if (war.winner === forCompany) {
                summary.attack.win += 1;
            } else {
                summary.attack.loss += 1;
            }
        } else {
            if (war.winner === forCompany) {

                summary.defense.win += 1;
            } else {
                summary.defense.loss += 1;
            }
        }
    }
    summary.defense.count = summary.defense.win + summary.defense.loss;
    summary.attack.count = summary.attack.win + summary.attack.loss;
    summary.overall.count = summary.attack.count + summary.defense.count;
    summary.overall.win = summary.attack.win + summary.defense.win;
    summary.overall.loss = summary.attack.loss + summary.defense.loss;

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
            mostPlayed = stat.played;
        }
    }

    summary.mostPlayed = { name: mostPlayedMap, count: mostPlayed };
    summary.mostWin = { name: mostWinMap, count: mostWins };
    summary.mostLoss = { name: mostLossMap, count: mostLosses };
    return summary;
}
