import type { Player } from "./player";


export interface Group {
    players: Player[];
}

export interface Roster {
    groups: Group[];
}
