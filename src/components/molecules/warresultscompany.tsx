import { Handshake, Skull, Sword, FirstAid, Crosshair } from "phosphor-react";
import StatWithIcon from "./statwithicon";
import type { StatSummary } from "../../types/leaderboard";
import type { Faction } from "../../types/faction";


interface WarResultsSummaryProp {
    summary: StatSummary,
    faction: Faction,
}

const WarResultsCompany: React.FC<WarResultsSummaryProp> = ({ summary, faction }) => {
    const border = false ? "border-3" : "border-none"
    let color = 'bg-gray-700';
    if (faction === 'Marauder') {
        color = 'bg-green-700';
    } else if (faction === 'Covenant') {
        color = 'bg-yellow-700';
    } else if (faction === 'Syndicate') {
        color = 'bg-purple-700'
    }

    return (
        <div className={``}>
            <div className={`rounded-lg ${color} ${border} border-yellow-500 text-center text-gray-200 p-1`}>
                <div className="text-3xl font-bold">{summary.name}</div>
                <div>{faction}</div>
                <div className="grid gap-4">
                    <div className="grid grid-cols-3 gap-1">
                        <StatWithIcon icon={<Crosshair size={32} weight="fill" />} value={summary.kills} />
                        <StatWithIcon icon={<Skull size={32} weight="fill" />} value={summary.deaths} />
                        <StatWithIcon icon={<Handshake size={32} weight="fill" />} value={summary.assists} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <StatWithIcon icon={<FirstAid size={32} weight="fill" />} value={summary.healing} />
                        <StatWithIcon icon={<Sword size={32} weight="fill" />} value={summary.damage} />
                    </div>
                </div>
            </div >
        </div>
    );
};

export default WarResultsCompany;
