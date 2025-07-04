import type { Faction } from "../types/faction";

export function factionToColor(faction: Faction): string {
    if (faction === "Marauder") {
        return 'green';
    } else if (faction === "Covenant") {
        return 'yellow';
    } else if (faction === 'Syndicate') {
        return 'purple';
    }
    return 'gray';
}
