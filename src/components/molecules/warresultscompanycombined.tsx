import type { JSX } from "react";
import type { Faction } from "../../types/faction";
import type { StatSummary } from "../../types/leaderboard";
import { Link } from "react-router-dom";
import StatWithIcon from "./statwithicon";
import { Crown, Fire, FirstAid, Hand, Handshake, Skull, Sword, X } from "phosphor-react";
import NumberCell from "../atom/numbercell";

interface WarResultsSummaryProp {
    summaries: StatSummary[],
    factions: Faction[],
    attacker: string,
    winner: string
}

function WarResultsCompanyCombined({ summaries, factions, attacker, winner }: WarResultsSummaryProp): JSX.Element {
    // let color = 'bg-gray-700';
    // let accent = 'bg-gray-800';
    // if (faction === 'Marauder') {
    //     color = 'bg-green-700';
    //     accent = 'bg-green-800';
    // } else if (faction === 'Covenant') {
    //     color = 'bg-yellow-700';
    //     accent = 'bg-yellow-800';
    // } else if (faction === 'Syndicate') {
    //     color = 'bg-purple-700'
    //     accent = 'bg-purple-800'
    // }
    // const label = isAttacker ? "Attacker" : "Defender"
    let attackerColor = 'bg-gray-700';
    let attackerAccent = 'bg-gray-800';
    let defenderColor = 'bg-gray-700';
    let defenderAccent = 'bg-gray-800';

    if (factions[0] === "Marauder") {
        attackerColor = 'bg-green-700';
        attackerAccent = 'bg-green-800';
    } else if (factions[0] === "Covenant") {
        attackerColor = 'bg-yellow-700';
        attackerAccent = 'bg-yellow-800';
    } else if (factions[0] === "Syndicate") {
        attackerColor = 'bg-purple-700'
        attackerAccent = 'bg-purple-800';
    }

    if (factions[1] === "Marauder") {
        defenderColor = 'bg-green-700';
        defenderAccent = 'bg-green-800';
    } else if (factions[1] === "Covenant") {
        defenderColor = 'bg-yellow-700';
        defenderAccent = 'bg-yellow-800';
    } else if (factions[1] === "Syndicate") {
        defenderColor = 'bg-purple-700'
        defenderAccent = 'bg-purple-800';
    }

    const isAttackerWinner = summaries[0].name === winner;
    return (
        <div className="grid grid-rows w-full text-white mx-auto">
            <div className="grid grid-cols-[1fr_50px_1fr] w-full items-center place-items-center">
                <div className={`flex w-full ${attackerAccent} rounded-tl-lg w-full h-fit justify-center text-center font-bold`}>
                    Attacker<span>{isAttackerWinner && <Crown weight="fill" className="text-yellow-500 drop-shadow-lg" />}</span>
                </div >
                <div className="bg-gray-700 w-full h-full"></div>
                <div className={`flex w-full ${defenderAccent} rounded-tr-lg w-full h-fit justify-center font-bold`}>
                    Defender<span>{!isAttackerWinner && <Crown weight="fill" className="text-yellow-500 drop-shadow-lg" />}</span>
                </div>
            </div>
            <div className="grid grid-rows-7 w-full text-white mx-auto">
                {/* Row 1: Names */}
                <div className="grid grid-cols-[1fr_50px_1fr] w-full items-center">
                    <div className={`${attackerColor} flex items-center justify-end font-bold text-xl md:text-3xl p-2 w-full h-full`}>{summaries[0].name}</div>
                    <div className="bg-gray-700 text-center text-3xl p-2">vs</div>
                    <div className={`${defenderColor} flex items-center justify-start font-bold text-xl md:text-3xl p-2 w-full h-full`}>{summaries[1].name}</div>
                </div>

                {/* Row 2: Kills */}
                <div className="grid grid-cols-[1fr_50px_1fr] w-full items-center">
                    <div className={`${attackerColor} flex items-center justify-end font-semibold text-xl p-2 w-full h-full`}>{<NumberCell value={summaries[0].kills} />}</div>
                    <div className="bg-gray-700 w-full h-full flex items-center justify-center"><Sword weight="fill" size={32} /></div>
                    <div className={`${defenderColor} flex items-center justify-start font-semibold text-xl p-2 w-full h-full`}>{<NumberCell value={summaries[1].kills} />}</div>
                </div>

                {/* Row 3: Deaths */}
                <div className="grid grid-cols-[1fr_50px_1fr] w-full items-center">
                    <div className={`${attackerColor} flex items-center justify-end font-semibold text-xl p-2 w-full h-full`}>{<NumberCell value={summaries[0].deaths} />}</div>
                    <div className="bg-gray-700 w-full h-full flex items-center justify-center"><Skull weight="fill" size={32} /></div>
                    <div className={`${defenderColor} flex items-center justify-startfont-semibold text-xl p-2 w-full h-full`}>{<NumberCell value={summaries[1].deaths} />}</div>
                </div>

                {/* Row 4: Assists */}
                <div className="grid grid-cols-[1fr_50px_1fr] w-full items-center">
                    <div className={`${attackerColor} flex items-center justify-end p-2 font-semibold text-xl w-full h-full`}>{<NumberCell value={summaries[0].assists} />}</div>
                    <div className="bg-gray-700 w-full h-full flex items-center justify-center"><Handshake weight="fill" size={32} /></div>
                    <div className={`${defenderColor} flex items-center justify-start p-2 font-semibold text-xl w-full h-full`}>{<NumberCell value={summaries[1].assists} />}</div>
                </div>

                {/* Row 5: Healing */}
                <div className="grid grid-cols-[1fr_50px_1fr] w-full items-center">
                    <div className={`${attackerColor} flex items-center justify-end p-2 font-semibold text-xl w-full h-full`}>{<NumberCell value={summaries[0].healing} />}</div>
                    <div className="bg-gray-700 w-full h-full flex items-center justify-center"><FirstAid weight="fill" size={32} /></div>
                    <div className={`${defenderColor} flex items-center justify-start p-2 font-semibold text-xl w-full h-full`}>{<NumberCell value={summaries[1].healing} />}</div>
                </div>

                {/* Row 6: Damage */}
                <div className="grid grid-cols-[1fr_50px_1fr] w-full items-center">
                    <div className={`${attackerColor} rounded-bl-lg flex items-center justify-end p-2 font-semibold text-xl w-full h-full`}>
                        <NumberCell value={summaries[0].damage} />
                    </div>
                    <div className="bg-gray-700 w-full h-full flex items-center justify-center">
                        <Fire weight="fill" size={32} />
                    </div>
                    <div className={`${defenderColor} rounded-br-lg flex items-center justify-start p-2 font-semibold text-xl w-full h-full`}>
                        <NumberCell value={summaries[1].damage} />
                    </div>
                </div>
            </div>


        </div >
    );
}

export default WarResultsCompanyCombined;
