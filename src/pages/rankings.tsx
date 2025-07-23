import type { JSX } from "react";
import { useWarsById } from "../hooks2/useWarsById";
import NotFound from "./notfound";
import Loading from "../components/atom/loading";
//import RankingCard from "../components/atom/rankingcard";
import RankingsDisplay from "../components/organisms/rankingsdisplay";
import type { WinLoss } from "../types/winloss";

function Rankings(): JSX.Element {
    const { wars, err, loading } = useWarsById([]);

    if (err) return <NotFound />;
    if (loading) return <Loading />;

    // const companies = new Map<string, { atkWin: number, atkLoss: number, defWin: number, defLoss: number }>();
    const companiesM: Map<string, WinLoss> = new Map();
    const companiesG: Map<string, WinLoss> = new Map();

    for (const war of wars) {
        const companies = war.league === "M" ? companiesM : companiesG;
        let attacker = companies.get(war.attacker);
        let defender = companies.get(war.defender);

        if (!attacker) {
            attacker = {
                name: war.attacker,
                defenseWins: 0,
                defenseLoss: 0,
                attackWins: 0,
                attackLoss: 0,
            };
            companies.set(war.attacker, attacker);
        }
        if (!defender) {
            defender = {
                name: war.defender,
                defenseWins: 0,
                defenseLoss: 0,
                attackWins: 0,
                attackLoss: 0,
            };
            companies.set(war.defender, defender);
        }

        attacker.attackWins += Number(war.attacker === war.winner);
        attacker.attackLoss += Number(war.attacker !== war.winner);
        defender.defenseWins += Number(war.defender === war.winner);
        defender.defenseLoss += Number(war.defender !== war.winner);
    }

    // const entries = [...companies.entries()];

    // // Optional: Sort by total wins for rankings
    // entries.sort(([, aStats], [, bStats]) => {
    //     const aWins = aStats.atkWin + aStats.defWin;
    //     const bWins = bStats.atkWin + bStats.defWin;
    //     return bWins - aWins;
    // });

    // return (
    //     <div>
    //         {entries.map(([name, stats], index) => (
    //             <RankingCard
    //                 key={name}
    //                 rank={index + 1}
    //                 name={name}
    //                 faction="Gray" // You might want to derive this from the war data instead
    //                 defWins={stats.defWin}
    //                 defLoss={stats.defLoss}
    //                 atkWins={stats.atkWin}
    //                 atkLoss={stats.atkLoss}
    //             />
    //         ))}
    //     </div>
    // );
    return (
        <div className="flex flex-col pt-8 max-w-6xl mx-auto gap-4">
            <div className="bg-gray-800 rounded-lg">
                <h1 className="text-white font-semibold text-xl p-2">Main League</h1>
                <RankingsDisplay rankings={[...companiesM.entries()].map((a, _) => a[1])} />
            </div>

            <div className="bg-gray-800 rounded-lg">
                <h1 className="text-white font-semibold text-xl p-2">G League</h1>
                <RankingsDisplay rankings={[...companiesG.entries()].map((a, _) => a[1])} />
            </div>
        </div>
    );
}


export default Rankings;
