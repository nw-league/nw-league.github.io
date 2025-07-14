import { kSheetId } from "../constants/sheets";
import { Qop, type QueryParameter } from "../types/queryparameter";
import type { Role } from "../types/role";
import type { Group, GroupKey, Roster } from "../types/roster";
import { constructQuery } from "../utils/querybuilder";
import { fetchTableFromGoogleSheets, type DataType } from "./googlesheets";

export async function getRosters(warId: number): Promise<Map<string, Roster>> {
    const qp: QueryParameter = { column: "B", fn: Qop.Eq, value: warId };
    const query = constructQuery(['A', 'B', 'C', 'D', 'E', 'F', 'G'], [qp]);
    let data: DataType[][] = [];
    try {
        data = await fetchTableFromGoogleSheets(kSheetId, 'rosters', query);
    } catch (err) {
        return new Map();
    }

    const rosters = new Map<string, Roster>();
    for (const row of data) {
        //const id = row[0] as number;
        const war = row[1] as number;
        const company = row[2] as string;
        const player = row[3] as string;
        const role = row[4] as Role;
        const gk = row[5] as GroupKey;
        const qpds = row[6] as boolean;

        let roster = rosters.get(company);
        if (!roster) {
            roster = { warid: war, groups: new Map<GroupKey, Group>() };
            rosters.set(company, roster);
        }

        let group = roster.groups.get(gk);
        if (!group) {
            group = { players: [] };
            roster.groups.set(gk, group);
        }

        group.players.push({ name: player, role, qpds });
    }

    return rosters;
}
