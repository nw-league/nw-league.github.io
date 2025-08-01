import type { JSX } from "react";
import Loading from "../atom/loading";
import { FireIcon, FirstAidIcon, HandshakeIcon, HashIcon, SkullIcon, SwordIcon } from "@phosphor-icons/react";
import StatWithIcon from "./statwithicon";
import NumberCell from "../atom/numbercell";
import type { Player } from "../../types/player";
import { factionBgSecondary } from "../../utils/factions";
import { usePlayerStats } from "../../hooks/usePlayerStats";

interface PlayerSummaryProps {
    player: Player
}
function PlayerSummary({ player }: PlayerSummaryProps): JSX.Element {

    const { loading, error, summary, averages } = usePlayerStats(player.name);
    if (loading) return <div className="text-white" ><Loading /></div>
    if (error || !summary) { }

    const isVisible = !(!error && summary) ? "invisible" : "";
    const color = factionBgSecondary(player.faction);
    return (
        <div className="flex flex-row">
            <div className={`${color} p-4`}></div>
            <div className={`grid grid-cols-1 text-white ${isVisible} bg-gray-700 p-1 gap-1 w-full`}>
                <div className="bg-gray-800 p-0.5"></div>
                <h1 className="font-semibold">Lifetime</h1>
                <div className={`grid grid-cols-6 pb-2`}>
                    <StatWithIcon icon={<HashIcon weight="bold" />} value={<NumberCell value={summary ? summary.count : 0} />} />
                    <StatWithIcon icon={<SwordIcon weight="fill" />} value={<NumberCell value={summary ? summary.kills : 0} />} />
                    <StatWithIcon icon={<SkullIcon weight="fill" />} value={<NumberCell value={summary ? summary.deaths : 0} />} />
                    <StatWithIcon icon={<HandshakeIcon weight="fill" />} value={<NumberCell value={summary ? summary.assists : 0} />} />
                    <StatWithIcon icon={<FirstAidIcon weight="fill" />} value={<NumberCell value={summary ? summary.healing : 0} />} />
                    <StatWithIcon icon={<FireIcon weight="fill" />} value={<NumberCell value={summary ? summary.damage : 0} />} />
                </div>
                <div className="bg-gray-800 p-0.5"></div>
                <h1 className="font-semibold">Per War</h1>
                {averages &&
                    <div className={`grid grid-cols-6`}>
                        <StatWithIcon icon={<HashIcon weight="bold" />} value={<NumberCell value={averages.count} />} />
                        <StatWithIcon icon={<SwordIcon weight="fill" />} value={<NumberCell value={averages.kills} figures={2} />} />
                        <StatWithIcon icon={<SkullIcon weight="fill" />} value={<NumberCell value={averages.deaths} figures={2} />} />
                        <StatWithIcon icon={<HandshakeIcon weight="fill" />} value={<NumberCell value={averages.assists} figures={2} />} />
                        <StatWithIcon icon={<FirstAidIcon weight="fill" />} value={<NumberCell value={averages.healing} figures={0} />} />
                        <StatWithIcon icon={<FireIcon weight="fill" />} value={<NumberCell value={averages.damage} figures={0} />} />
                    </div>
                }
            </div>
        </div>
    );
}

export default PlayerSummary
