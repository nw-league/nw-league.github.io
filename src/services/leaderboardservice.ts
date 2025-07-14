import { kSheetId } from "../constants/sheets";
import type { LeaderboardEntry } from "../types/leaderboard";
import { Qop, type QueryParameter } from "../types/queryparameter";
import { constructQuery } from "../utils/querybuilder";
import { fetchTableFromGoogleSheets, type DataType } from "./googlesheets";



export async function getLeaderboard(warId: number): Promise<LeaderboardEntry[]> {
    const qp: QueryParameter = { column: "B", fn: Qop.Eq, value: warId };
    const query = constructQuery(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'], [qp]);
    let data: DataType[][] = [];
    try {
        data = await fetchTableFromGoogleSheets(kSheetId, 'leaderboards', query);
    } catch (err) {
        return [];
    }

    if (data.length === 0) {
        return [];
    }

    const entires: LeaderboardEntry[] = data.map((row: any[]) => ({
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

    return entires;
}
