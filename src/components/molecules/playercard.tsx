import React, { type JSX } from "react";
import { Sword, Skull, Handshake, PlusCircle, GameController } from "phosphor-react";

export interface PlayerStats {
    name: string;
    role: string;
    company?: string;
    kills: number;
    deaths: number;
    assists: number;
    score: number;
    imageUrl?: string;
}

interface PlayerCardProps {
    player: PlayerStats;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
    return (
        <div className="bg-gray-800 text-white rounded-lg shadow-md p-4 w-[280px] flex flex-col gap-2">
            <div className="flex items-center gap-3">
                {player.imageUrl ? (
                    <img
                        src={player.imageUrl}
                        alt={`${player.name}'s avatar`}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-xl">
                        {player.name[0]}
                    </div>
                )}
                <div className="flex flex-col">
                    <span className="font-bold text-lg">{player.name}</span>
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                        <GameController size={16} weight="fill" /> {player.role}
                    </span>
                </div>
            </div>

            {player.company && (
                <div className="text-sm text-gray-400 mt-1">Company: {player.company}</div>
            )}

            <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                <Stat icon={<Sword size={16} />} label="Kills" value={player.kills} />
                <Stat icon={<Skull size={16} />} label="Deaths" value={player.deaths} />
                <Stat icon={<Handshake size={16} />} label="Assists" value={player.assists} />
                <Stat icon={<PlusCircle size={16} />} label="Score" value={player.score} />
            </div>
        </div>
    );
};

interface StatProps {
    icon: JSX.Element;
    label: string;
    value: number;
}

const Stat: React.FC<StatProps> = ({ icon, label, value }) => (
    <div className="flex items-center gap-2 text-gray-300">
        {icon}
        <span>{label}:</span>
        <span className="ml-auto font-semibold text-white">{value}</span>
    </div>
);

export default PlayerCard;
