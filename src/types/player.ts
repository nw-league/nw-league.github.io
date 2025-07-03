import type { Faction } from "./faction";
import type { Role } from "./role";

export interface Player {
    id: number,
    name: string;
    server: string;
    role: Role;
    faction: Faction;
    company: string;
}
