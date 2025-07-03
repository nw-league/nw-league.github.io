import type { PlayerDetailsEntry } from "./leaderboard";
import type { Player } from "./player";

export interface PlayerDetails {
    player: Player;
    stats: PlayerDetailsEntry[];
}
