import type { Group } from "./roster";

export interface LeaderboardEntry {
    warid: number;
    name: string;
    score: number;
    kills: number;
    deaths: number;
    assists: number;
    healing: number;
    damage: number;
    company: string;
}
export interface PlayerDetailsEntry extends LeaderboardEntry {
    role: string;
    attacker: string;
    defender: string;
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
    group: Group;
    stats: LeaderboardEntry[];
}
