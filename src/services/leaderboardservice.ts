import { kSheetId } from "../constants/sheets";
import { EmptyStatSummary, type Leaderboard, type LeaderboardEntry, type StatSummary } from "../types/leaderboard";
import { Qop, type QueryParameter } from "../types/queryparameter";
import { constructQuery } from "../utils/querybuilder";
import { fetchTableFromGoogleSheets, type DataType } from "./googlesheets";


export function summarizeLeaderboard(leaderboard: Leaderboard): Map<string, StatSummary> {
    const summaries = new Map<string, StatSummary>();

    for (const entry of leaderboard.entries) {
        let summary = summaries.get(entry.company);
        if (!summary) {
            summary = EmptyStatSummary;
            summaries.set(entry.company, summary);
        }

        summary.name = entry.company;
        summary.score += entry.score;
        summary.kills += entry.kills;
        summary.deaths += entry.deaths;
        summary.assists += entry.assists;
        summary.healing += entry.healing;
        summary.count += 1;
    }

    return summaries;
}

export async function getLeaderboard(warId: number): Promise<Leaderboard> {
    const qp: QueryParameter = { column: "B", fn: Qop.Eq, value: warId };
    const query = constructQuery(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'], [qp]);
    let data: DataType[][] = [];
    try {
        data = await fetchTableFromGoogleSheets(kSheetId, 'leaderboards', query);
    } catch (err) {
        return { warId, entries: [] };
    }

    if (data.length === 0) {
        return { warId, entries: [] };
    }

    const entries: LeaderboardEntry[] = data.map((row: any[]) => ({
        warid: row[1] as number,
        player: row[2] as string,
        score: row[3] as number,
        kills: row[4] as number,
        deaths: row[5] as number,
        assists: row[6] as number,
        healing: row[7] as number,
        damage: row[8] as number,
        company: row[9] as string,
    }));

    return { warId, entries };
}
