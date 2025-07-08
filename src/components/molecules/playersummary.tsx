import type { JSX } from "react";
import { usePlayerStats } from "../../hooks/usePlayerStats";
import Loading from "../atom/loading";
import { FireIcon, FirstAidIcon, HandshakeIcon, HashIcon, SkullIcon, SwordIcon } from "@phosphor-icons/react";
import StatWithIcon from "./statwithicon";
import NumberCell from "../atom/numbercell";
import type { Player } from "../../types/player";
import { factionBgPrimary } from "../../utils/factions";

interface PlayerSummaryProps {
    player: Player
}
function PlayerSummary({ player }: PlayerSummaryProps): JSX.Element {

    const { loading, error, summary } = usePlayerStats(player.name);
    if (loading) return <div className="text-white" ><Loading /></div>
    if (error || !summary) return <></>

    const isVisible = !(!error && summary) ? "invisible" : "";
    const color = factionBgPrimary(player.faction);
    return (
        <div className={`grid grid-cols-1 text-white ${isVisible} ${color} p-1`}>
            <h1 className="font-semibold">Lifetime Stats</h1>
            <div className={`grid grid-flow-col`}>
                <StatWithIcon icon={<HashIcon weight="bold" />} value={<NumberCell value={summary.count} />} />
                <StatWithIcon icon={<SwordIcon weight="fill" />} value={<NumberCell value={summary.kills} />} />
                <StatWithIcon icon={<SkullIcon weight="fill" />} value={<NumberCell value={summary.deaths} />} />
                <StatWithIcon icon={<HandshakeIcon weight="fill" />} value={<NumberCell value={summary.assists} />} />
                <StatWithIcon icon={<FirstAidIcon weight="fill" />} value={<NumberCell value={summary.healing} />} />
                <StatWithIcon icon={<FireIcon weight="fill" />} value={<NumberCell value={summary.damage} />} />
            </div>
        </div>
    );
}

export default PlayerSummary
