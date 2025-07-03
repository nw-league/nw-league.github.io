import { useParams } from "react-router-dom";
import NotFound from "./notfound";

import PlayerWarHistory from "../components/organisms/playerwarhistory";
import PlayerCard from "../components/organisms/playercard";
import { usePlayer } from "../hooks/usePlayerDetailsNew";
import Loading from "../components/atom/loading";
import type { Player } from "../types/player";

function PlayerDetails() {
    const { playerName } = useParams<{ playerName: string }>();

    if (!playerName) return <NotFound />

    const { loading, error, player } = usePlayer(playerName);

    if (loading) return <Loading />;
    if (error) return <NotFound />;

    const useablePlayer = player || {
        id: -1,
        name: playerName,
        server: 'Glass City',
        role: '',
        faction: 'Gray',
        company: ''
    } as Player;

    return (
        <div className="flex flex-col max-w-4xl mx-auto mt-4 gap-2s">
            <PlayerCard player={useablePlayer} />
            <div className="bg-gray-700 rounded-lg">
                <h1 className="text-white font-semibold p-2">War History</h1>
                <PlayerWarHistory playerName={playerName} />
            </div>
        </div>
    );
}

export default PlayerDetails
