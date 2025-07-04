import { useParams } from "react-router-dom";
import NotFound from "./notfound";

import PlayerWarHistory from "../components/organisms/playerwarhistory";
import PlayerCard from "../components/organisms/playercard";
import { usePlayer } from "../hooks/usePlayer";
import Loading from "../components/atom/loading";
import type { Player } from "../types/player";
import PlayerSummary from "../components/molecules/playersummary";

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
        <div className="flex flex-col max-w-6xl mx-auto mt-4 gap-2s">
            <PlayerCard player={useablePlayer} />
            <PlayerSummary player={useablePlayer} />
            <PlayerWarHistory playerName={playerName} />
        </div >
    );
}

export default PlayerDetails
