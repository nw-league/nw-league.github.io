import type { JSX } from "react";
import Loading from "../atom/loading";
import { FireIcon, FirstAidIcon, HandshakeIcon, HashIcon, SkullIcon, SwordIcon } from "@phosphor-icons/react";
import StatWithIcon from "./statwithicon";
import NumberCell from "../atom/numbercell";
import type { Player } from "../../types/player";
import { factionBgPrimary, factionBgSecondary } from "../../utils/factions";
import { usePlayerStats } from "../../hooks/usePlayerStats";

interface PlayerSummaryProps {
    player: Player
}
function PlayerSummary({ player }: PlayerSummaryProps): JSX.Element {

    const { loading, error, summary, averages } = usePlayerStats(player.name);
    if (loading) return <div className="text-white" ><Loading /></div>
    if (error || !summary) return <>nothing</>

    const isVisible = !(!error && summary) ? "invisible" : "";
    const color = factionBgSecondary(player.faction);
    return (
        <div className={`grid grid-cols-1 text-white ${isVisible} ${color} p-1`}>
            <h1 className="font-semibold">Lifetime Totals</h1>
            <div className={`grid grid-cols-6`}>
                <StatWithIcon icon={<HashIcon weight="bold" />} value={<NumberCell value={summary.count} />} />
                <StatWithIcon icon={<SwordIcon weight="fill" />} value={<NumberCell value={summary.kills} />} />
                <StatWithIcon icon={<SkullIcon weight="fill" />} value={<NumberCell value={summary.deaths} />} />
                <StatWithIcon icon={<HandshakeIcon weight="fill" />} value={<NumberCell value={summary.assists} />} />
                <StatWithIcon icon={<FirstAidIcon weight="fill" />} value={<NumberCell value={summary.healing} />} />
                <StatWithIcon icon={<FireIcon weight="fill" />} value={<NumberCell value={summary.damage} />} />
            </div>
            <h1 className="font-semibold">Per 30 minutes</h1>
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
    );
}

export default PlayerSummary
