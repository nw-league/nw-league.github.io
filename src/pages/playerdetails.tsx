import { Link, useParams } from "react-router-dom";
import { usePlayerDetails } from "../hooks/usePlayerDetails";
import NotFound from "./notfound";
import Loading from "../components/atom/loading";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { LeaderboardEntry, PlayerDetailsEntry } from "../types/leaderboard";
import NumberCell from "../components/atom/numbercell";
import StatsTable from "../components/atom/statstble";
import ErrorPage from "./errorpage";

function PlayerDetails() {
    const { playerName } = useParams<{ playerName: string }>();
    if (!playerName) return <NotFound />

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
    if (loading) return <Loading />
    if (!playerDetails) return <NotFound />

    return (
        <div className="flex flex-col max-w-3xl mx-auto">
            <div>
                <div className="text-white text-2xl mt-4 mb-4">{playerName}</div>
            </div>
            <div>
                <StatsTable columns={columns} data={playerDetails.stats} />
            </div>
        </div>
    );
}

export default PlayerDetails
