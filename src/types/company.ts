export interface Company {
    id: number;
    name: string;
    faction: string; // Added for Syndicate, Marauder, etc.
    territories: number;
    warsWon: number;
    warsLost: number;
    warStats?: {
        players: number;
        kills: number;
        deaths: number;
        assists: number;
        healing: number;
        damage: number;
        dpk: number; // Damage per kill
        apk: number; // Assists per kill
    };
}
