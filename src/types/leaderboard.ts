import type { Role } from "./role";

export interface LeaderboardEntry {
    warid: number;
    player: string;
    role: Role;
    score: number;
    kills: number;
    deaths: number;
    assists: number;
    healing: number;
    damage: number;
    company: string;
}

export interface GroupsEntry extends LeaderboardEntry {

}
export interface PlayerDetailsEntry extends LeaderboardEntry {
    attacker: string;
    defender: string;
    isWinner: boolean;
}

export interface Leaderboard {
    entries: LeaderboardEntry[];
}

export interface GroupStats {
    name: string;
    score: number;
    kills: number;
    deaths: number;
    assists: number;
    healing: number;
    damage: number;
    kpar: number;
}

export interface StatSummary {
    name: string;
    score: number;
    kills: number;
    deaths: number;
    assists: number;
    healing: number;
    damage: number;
    count: number;
}

export interface GroupPerformance {
    stats: GroupsEntry[];
}

export interface MapStat {
    played: number;
    win: number;
}

export interface WarsSummary {
    mostPlayed: { name: string, count: number };
    mostWin: { name: string, count: number };
    mostLoss: { name: string, count: number };
    defense: { win: number, loss: number, count: number };
    attack: { win: number, loss: number, count: number };
    overall: { win: number, loss: number, count: number };
}
