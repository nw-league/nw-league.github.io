import { constructQuery } from "../utils/querybuilder";
import { Qop } from "../types/queryparameter";
import { fetchTableFromGoogleSheets, type DataType } from "./googlesheets";
import type { Faction } from "../types/faction";
import type { Company } from "../types/company";

const kPlayerDbSheetId: string = '1Zpmwiu2M3AHdPVwaZ8A-nIPN5eKGclLSfnLl_Xn10PA';

export async function getCompanies(companyNames?: string[]): Promise<Company[]> {
    const params = companyNames ? companyNames.map(v => ({ column: 'B', fn: Qop.Eq, value: v })) : undefined;
    const query = constructQuery(['A', 'B', 'C', 'D', 'E'], params);
    let data: DataType[][] = [];
    try {
        data = await fetchTableFromGoogleSheets(kPlayerDbSheetId, 'companies', query);
    } catch (err) {
        return [];
    }

    return data.map(row => ({
        id: row[0] as number,
        name: row[1] as string,
        shorthand: row[2] as string,
        server: row[3] as string,
        faction: row[4] as Faction
    }));
}
