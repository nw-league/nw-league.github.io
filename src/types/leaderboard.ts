import type { Group } from "./roster";

export interface LeaderboardEntry {
    warid: number;
    player: string;
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
    isWinner: boolean;
}

export interface Leaderboard {
    warId: number;
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

export const EmptyLeaderboard: Leaderboard = { warId: 0, entries: [] };
export const EmptyStatSummary: StatSummary = {
    name: '',
    score: 0,
    kills: 0,
    deaths: 0,
    assists: 0,
    healing: 0,
    damage: 0,
    count: 0,
};
