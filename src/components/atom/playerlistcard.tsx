import type { JSX } from "react";
import type { Player } from "../../types/player";
import ProfilePicture from "./profilepicture";
import { Link } from "react-router-dom";

interface PlayerListCardProps {
    player: Player

}

function PlayerListCard({ player }: PlayerListCardProps): JSX.Element {

    return (
        <Link to={`/players/${player.name}`}>
            <div className={`flex items-center bg-gray-700 rounded-lg p-2 gap-2`}>
                <ProfilePicture pictureUrl="https://dqzvgunkova5o.cloudfront.net/statics/2025-06-20/images/NW-bug.svg" size={32} />
                <div className="flex flex-col">
                    <div className="flex items-end text-white gap-2">
                        <div className="font-semibold ">{player.name}</div>

                    </div>
                    <div className="flex gap-2 items-end text-white ">
                        <div className="text-xs">{player.role}</div>
                        {/* <div>{player.faction !== 'Gray' && player.faction}</div>
                    {player.faction !== 'Gray' && player.company && <div>|</div>}
                    <div>{player.company}</div> */}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default PlayerListCard;
