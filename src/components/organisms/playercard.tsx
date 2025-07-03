import type { JSX } from "react";
import ProfilePicture from "../atom/profilepicture";
import type { Player } from "../../types/player";

export interface PlayerCardProps {
    player: Player
}
function PlayerCard({ player }: PlayerCardProps): JSX.Element {
    let color = 'bg-gray-700';
    if (player.faction === 'Covenant') {
        color = 'bg-yellow-700';
    } else if (player.faction === "Marauder") {
        color = 'bg-green-700';
    } else if (player.faction === 'Syndicate') {
        color = 'bg-purple-700';
    }

    return (
        <div className={`flex items-center ${color} rounded-t-lg p-2 gap-2`}>
            <ProfilePicture pictureUrl="https://dqzvgunkova5o.cloudfront.net/statics/2025-06-20/images/NW-bug.svg" size={32} />
            <div className="flex flex-col">
                <div className="flex items-end text-white gap-2">
                    <div className="text-3xl font-semibold ">{player.name}</div>
                    <div>{player.role}</div>
                </div>
                <div className="flex gap-2 items-end text-white ">
                    <div>{player.faction !== 'Gray' && player.faction}</div>
                    {player.faction !== 'Gray' && player.company && <div>|</div>}
                    <div>{player.company}</div>
                </div>
            </div>
        </div>
    );
}

export default PlayerCard;
