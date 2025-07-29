import { Link } from "react-router-dom";
import NotFound from "../../pages/notfound";
import type { PlayerDetailsEntry } from "../../types/leaderboard";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import NumberCell from "../atom/numbercell";
import ErrorPage from "../../pages/errorpage";
import Loading from "../atom/loading";
import StatsTable from "../atom/statstble";
import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react";
import { usePlayerDetails } from "../../hooks/usePlayerDetails";


export interface PlayerWarHistoryProps {
    playerName: string;
}
function PlayerWarHistory({ playerName }: PlayerWarHistoryProps) {
    const sort = [{ id: "warid", desc: true }];


    const { error, loading, details } = usePlayerDetails(playerName);
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
                accessorKey: "isWinner",
                header: "Win/Loss",
                cell: info => (
                    <div className="flex justify-center items-center">
                        {info.getValue<boolean>() ? <CheckCircleIcon weight="bold" className="text-green-500" /> : <XCircleIcon weight="bold" className="text-red-500" />}
                    </div>
                ),
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
    if (!details) return <NotFound />


    return (
        <div className="bg-gray-700">
            <h1 className="text-white font-semibold p-2">War History</h1>
            <StatsTable columns={columns} data={details.stats} sort={sort} />
        </div>
    );
}

export default PlayerWarHistory
