import { Handshake, Skull, Sword, FirstAid, Crosshair } from "phosphor-react";
import StatWithIcon from "./statwithicon";


interface WarResultsSummaryProp {
    name: string,
    faction: string,
    kills: number,
    deaths: number,
    assists: number,
    healing: number,
    damage: number,
    winner: boolean
}

const WarResultsCompany: React.FC<WarResultsSummaryProp> = ({
    name,
    faction,
    kills,
    deaths,
    assists,
    healing,
    damage,
    winner
}) => {
    const border = winner ? "border-3" : "border-none"
    const color = faction.toLowerCase() === "marauder" ? "bg-green-700" : "bg-purple-800"
    console.log(color)
    return (
        <div className={``}>
            <div className={`rounded-lg ${color} ${border} border-yellow-500 text-center text-gray-200 p-1`}>
                <div className="text-3xl font-bold">{name}</div>
                <div>{faction}</div>
                <div className="grid gap-4">
                    <div className="grid grid-cols-3 gap-1">
                        <StatWithIcon icon={<Crosshair size={32} weight="fill" />} value={kills} />
                        <StatWithIcon icon={<Skull size={32} weight="fill" />} value={deaths} />
                        <StatWithIcon icon={<Handshake size={32} weight="fill" />} value={assists} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <StatWithIcon icon={<FirstAid size={32} weight="fill" />} value={healing} />
                        <StatWithIcon icon={<Sword size={32} weight="fill" />} value={damage} />
                    </div>
                </div>
            </div >
        </div>
    );
};

export default WarResultsCompany;
