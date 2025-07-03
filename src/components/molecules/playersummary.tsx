import type { JSX } from "react";
import { usePlayerStats } from "../../hooks/usePlayerStats";
import Loading from "../atom/loading";
import { FireIcon, FirstAidIcon, HandshakeIcon, SigmaIcon, SkullIcon, SwordIcon } from "@phosphor-icons/react";

interface PlayerSummaryProps {
    playerName: string
}
function PlayerSummary({ playerName }: PlayerSummaryProps): JSX.Element {

    const { loading, error, summary } = usePlayerStats(playerName);
    if (loading) return <Loading />
    if (error || !summary) return <></>

    return (
        <div className="flex text-white">
            <div className="grid grid-cols-1">
                <SigmaIcon />
                <span>{summary.count}</span>

            </div>

            <span><SwordIcon />{summary.kills}</span>
            <span><SkullIcon />{summary.deaths}</span>
            <span><HandshakeIcon /> {summary.assists}</span>
            <span><FirstAidIcon />{summary.healing}</span>
            <span><FireIcon />{summary.damage}</span>
        </div>
    );
}

export default PlayerSummary
