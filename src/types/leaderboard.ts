export interface LeaderboardEntry {
    name: string;
    score: number;
    kills: number;
    deaths: number;
    assists: number;
    healing: number;
    damage: number;
    company: string;
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
