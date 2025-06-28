import type { CaptureTimes } from "./captures";
import type { Company } from "./company";
import type { Leaderboard } from "./leaderboard";
import type { Roster } from "./roster";

export interface War {
    id: number;
    date: string;
    map: string;
    attacker: Company;
    attackerRoster: Roster;
    defender: string;
    defenderRoster: Roster;
    winner: string | null;
    duration: number;
    captures: CaptureTimes;
    leaderboard: Leaderboard;
}
