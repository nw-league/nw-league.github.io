import type { WarPlayer } from "./warplayer";


export interface Group {
    players: WarPlayer[];
}

export interface Roster {
    warid: number;
    groups: Map<number, Group>;
}
