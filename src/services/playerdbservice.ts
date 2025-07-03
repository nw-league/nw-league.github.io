import { constructQuery } from "../utils/querybuilder";
import { Qop } from "../types/queryparameter";
import { fetchTableFromGoogleSheets, type DataType } from "./googlesheets";
import type { Player } from "../types/player";
import type { Role } from "../types/role";
import type { Faction } from "../types/faction";

const kPlayerDbSheetId: string = '1Zpmwiu2M3AHdPVwaZ8A-nIPN5eKGclLSfnLl_Xn10PA';

export async function getPlayer(playerName: string): Promise<Player | null> {
    const params = [{ column: 'B', fn: Qop.Eq, value: playerName }];
    const query = constructQuery(['A', 'B', 'C', 'D', 'E', 'F'], params);
    let data: DataType[][] = [];
    try {
        data = await fetchTableFromGoogleSheets(kPlayerDbSheetId, 'players', query);
    } catch (err) {
        return null;
    }

    if (data.length !== 0) {
        const row = data[0];
        const id = row[0] as number;
        const name = row[1] as string;
        const server = row[2] as string;
        const role = row[3] as Role;
        const faction = row[4] as Faction;
        const company = row[5] as string;
        return { id, name, server, role, faction, company };
    }

    return null;
}
