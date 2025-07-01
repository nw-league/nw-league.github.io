import type { LeaderboardEntry } from "./leaderboard";
import type { Player } from "./player";


export interface Group {
    players: Player[];
}

export interface Roster {
    groups: Map<number, Group>;
}
