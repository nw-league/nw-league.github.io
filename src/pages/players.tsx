import { Link } from "react-router-dom";
import Loading from "../components/atom/loading";
import PlayerListCard from "../components/atom/playerlistcard";
import Construction from "../components/molecules/construction";
import { usePlayers } from "../hooks/usePlayers";
import { useState } from "react";

const Players: React.FC = () => {
    const { loading, error, players } = usePlayers();
    const [search, setSearch] = useState("");

    if (loading) return <Loading></Loading>
    if (error || !players) return <Construction></Construction>


    const filteredPlayers = players.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <div className="flex flex-col max-w-4xl  pt-4 pb-4  mx-auto gap-6" >
            <input
                type="text"
                placeholder="Search players..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 w-full"
            />
            <div className="flex flex-col gap-2">
                {filteredPlayers.map(p => (
                    <Link to={`/players/${p.name}`}>
                        <div className="hover:scale-105">
                            <PlayerListCard player={p} />
                        </div>
                    </Link>
                ))}
            </div>
        </div >
    );
}

export default Players;
