import type { Leaderboard } from "../types/leaderboard";
import type { Player } from "../types/player";
import type { PlayerDetails } from "../types/playerdetails";
import type { Role } from "../types/role";
import type { Roster } from "../types/roster";
import type { War } from "../types/war";

export function createPlayerDetails(
    player: Player | null,
    leaderboard: Leaderboard,
    rosters: Map<number, Map<string, Roster>>,
    wars: War[]
): PlayerDetails {

    const usablePlayer = player || {
        id: -1,
        name: 'Scot Lane',
        server: 'San Francisco',
        role: '',
        faction: 'Gray',
        company: 'AGS'
    }

    const pd: PlayerDetails = {
        player: usablePlayer,
        stats: []
    };

    for (const entry of leaderboard.entries) {
        const warRoster = rosters.get(entry.warid);
        if (!warRoster) continue;
        const companyRoster = warRoster.get(entry.company);
        if (!companyRoster) continue;
        let role = ('' as Role);
        let attacker = '';
        let defender = '';
        let isWinner = false;
        for (const [_, group] of companyRoster.groups) {
            for (const player of group) {
                if (player.name === entry.player) {
                    role = player.role;
                }
            }
        }

        for (const war of wars) {
            if (war.id === entry.warid) {
                attacker = war.attacker
                defender = war.defender
                isWinner = entry.company === war.winner;
                break;
            }
        }

        pd.stats.push({ ...entry, attacker, defender, role, isWinner });
    }

    return pd;
}
