import { constructQuery } from "../utils/querybuilder";
import { Qop } from "../types/queryparameter";
import { fetchTableFromGoogleSheets, type DataType } from "./googlesheets";
import type { Faction } from "../types/faction";
import type { Company } from "../types/company";

const kPlayerDbSheetId: string = '1Zpmwiu2M3AHdPVwaZ8A-nIPN5eKGclLSfnLl_Xn10PA';

export async function getCompanies(companyNames?: string[]): Promise<Company[]> {
    const params = companyNames ? companyNames.map(v => ({ column: 'B', fn: Qop.Eq, value: v })) : undefined;
    const query = constructQuery(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'], params);
    let data: DataType[][] = [];
    try {
        data = await fetchTableFromGoogleSheets(kPlayerDbSheetId, 'companies', query);
    } catch (err) {
        return [];
    }

    // const companies: Company[] = [];
    // for (const row of data) {
    //     const id = row[0] as number;
    //     const name = row[1] as string;
    //     const shorthand = row[2] as string;
    //     const server = row[3] as string;
    //     const faction = row[4] as Faction;
    //     const governor = row[5] as string;
    //     const captains = (row[6] as string).split(',').map(v => v.trim());
    //     const shotcaller = row[7] as string;
    //     const tier = row[8] as string;
    //     const icon = row[0] as string;
    //     companies.push({
    //         id,
    //         name,
    //         shorthand,
    //         server,
    //         faction,
    //         governor,
    //         captains,
    //         shotcaller,
    //         tier,
    //         icon
    //     });
    // }
    return data.map(row => ({
        id: row[0] as number,
        name: row[1] as string,
        shorthand: row[2] as string,
        server: row[3] as string,
        faction: row[4] as Faction,
        governor: row[5] as string,
        captains: row[6] ? (row[6] as string).split(',').map(v => v.trim()) : [],
        shotcaller: row[7] as string,
        tier: row[8] as string,
        icon: row[0] as string,
    }));
}
