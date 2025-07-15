import type { CaptureTimes } from "./captures";

export interface War {
    id: number;
    date: Date;
    map: string;
    attacker: string;
    defender: string;
    winner: string;
    duration: number;
    captures: CaptureTimes;
}

export const WarTable = {
    id: "A",
    date: "B",
    time: "C",
    server: "D",
    territory: "E",
    attacker: "F",
    defender: "G",
    winner: "H",
    pointa: "I",
    pointb: "J",
    pointc: "K",
    fort: "L",
    duration: "M",
}
