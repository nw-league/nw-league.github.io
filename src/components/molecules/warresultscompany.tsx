import { Handshake, Skull, Sword, FirstAid, Fire, Crown } from "phosphor-react";
import StatWithIcon from "./statwithicon";
import type { StatSummary } from "../../types/leaderboard";
import type { Faction } from "../../types/faction";
import NumberCell from "../atom/numbercell";


interface WarResultsSummaryProp {
    summary: StatSummary,
    faction: Faction,
    isAttacker: boolean,
    isWinner: boolean
}

const WarResultsCompany: React.FC<WarResultsSummaryProp> = ({ summary, faction, isAttacker, isWinner }) => {
    let color = 'bg-gray-700';
    let accent = 'bg-gray-800';
    if (faction === 'Marauder') {
        color = 'bg-green-700';
        accent = 'bg-green-800';
    } else if (faction === 'Covenant') {
        color = 'bg-yellow-700';
        accent = 'bg-yellow-800';
    } else if (faction === 'Syndicate') {
        color = 'bg-purple-700'
        accent = 'bg-purple-800'
    }
    const label = isAttacker ? "Attacker" : "Defender"

    return (
        <div className={`${accent} rounded-lg`}>
            {/* <div className="flex w-full text-gray-200 p-2 justify-center items-center text-shadow-md">{isWinner && <Crown weight={"fill"} />} {label} {isWinner && <Crown weight={"fill"} />}</div> */}
            <div className="flex w-full text-gray-200 p-2 justify-center items-center drop-shadow-lg font-bold"> {isWinner && <Crown weight={"fill"} className="text-yellow-500" />} {label}</div>
            {/* <div className="flex w-full text-gray-200 p-2 justify-center items-center text-shadow-md"> {label}  </div> */}
            <div className={`rounded-b-lg ${color} text-center text-gray-200 p-1`}>
                <div className="text-3xl font-bold">{summary.name}</div>
                <div>{faction}</div>
                <div className="grid gap-4">
                    <div className="grid grid-cols-3 gap-1 drop-shadow-lg">
                        <StatWithIcon icon={<Sword size={32} weight="fill" />} value={summary.kills} />
                        <StatWithIcon icon={<Skull size={32} weight="fill" />} value={summary.deaths} />
                        <StatWithIcon icon={<Handshake size={32} weight="fill" />} value={summary.assists} />
                    </div>
                    <div className="grid grid-cols-2 gap-2 drop-shadow-lg">
                        <StatWithIcon icon={<FirstAid size={32} weight="fill" />} value={<NumberCell value={summary.healing} />} />
                        <StatWithIcon icon={<Fire size={32} weight="fill" />} value={<NumberCell value={summary.damage} />} />
                    </div>
                </div>
            </div>
            {/* <div className="flex w-full justify-center p-2 text-shadow-lh text-gray-200"> */}
            {/* <div className="w-full flex justify-center text-xl" style={{ fontFamily: '"IM Fell English", serif' }}>
                    {isWinner ? "Victory" : "Defeat"}
                </div> */}
            {/* <div className="font-imfell flex w-full justify-center">
                    {isWinner ? "Victory" : "Defeat"}
                </div> */}
            {/* </div> */}
        </div>
    );
};

export default WarResultsCompany;
