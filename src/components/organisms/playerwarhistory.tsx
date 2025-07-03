import { Link } from "react-router-dom";
import NotFound from "../../pages/notfound";
import { usePlayerDetails } from "../../hooks/usePlayerDetails";
import type { PlayerDetailsEntry } from "../../types/leaderboard";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import NumberCell from "../atom/numbercell";
import ErrorPage from "../../pages/errorpage";
import Loading from "../atom/loading";
import StatsTable from "../atom/statstble";


export interface PlayerWarHistoryProps {
    playerName: string;
}
function PlayerWarHistory({ playerName }: PlayerWarHistoryProps) {
    const sort = [{ id: "warid", desc: true }];


    const { error, loading, playerDetails } = usePlayerDetails(playerName);
    const columns = useMemo<ColumnDef<PlayerDetailsEntry>[]>(
        () => [
            {
                accessorKey: "warid",
                header: "War",
                cell: info => {
                    const row = info.row.original;
                    return (
                        < Link to={`/wars/${info.getValue<number>()}`}>
                            <span className="hover:underline">{row.attacker} vs {row.defender}</span>
                        </Link >
                    );
                },
            },
            {
                accessorKey: "role",
                header: "Role",
            },
            {
                accessorKey: "score",
                header: "Score",
                cell: info => (
                    <div className="text-right">
                        <NumberCell value={info.getValue<number>()} />
                    </div>
                ),
            },
            {
                accessorKey: "kills",
                header: "Kills",
                cell: info => (
                    <div className="text-right">
                        <NumberCell value={info.getValue<number>()} />
                    </div>
                ),
            },
            {
                accessorKey: "deaths",
                header: "Deaths",
                cell: info => (
                    <div className="text-right">
                        <NumberCell value={info.getValue<number>()} />
                    </div>
                ),
            },
            {
                accessorKey: "assists",
                header: "Assists",
                cell: info => (
                    <div className="text-right">
                        <NumberCell value={info.getValue<number>()} />
                    </div>
                ),
            },
            {
                accessorKey: "healing",
                header: "Healing",
                cell: info => (
                    <div className="text-right">
                        <NumberCell value={info.getValue<number>()} />
                    </div>
                ),
            },
            {
                accessorKey: "damage",
                header: "Damage",
                cell: info => (
                    <div className="text-right">
                        <NumberCell value={info.getValue<number>()} />
                    </div>
                ),
            },
        ],
        []
    );

    if (error) return <ErrorPage error={error} />
    if (loading) return <span className="text-white" ><Loading /></span>
    if (!playerDetails) return <NotFound />

    return (
        <StatsTable columns={columns} data={playerDetails.stats} sort={sort} />
    );
}

export default PlayerWarHistory
