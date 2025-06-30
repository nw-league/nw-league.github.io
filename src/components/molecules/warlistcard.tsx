import { Crown, Shield, Sword, Truck } from "phosphor-react";
import type { War } from "../../types/war";
import { formatDate } from "../../utils/time";
import { Link } from "react-router-dom";

export interface WarListCardProp {
    war: War,
}
const WarListCard: React.FC<WarListCardProp> = ({ war }) => {
    const attackerWins = war.attacker === war.winner;
    const defenderWins = war.defender === war.winner;

    return (
        <Link to={`/wars/${war.id}`}>
            <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex flex-row">
                    <div className="grid grid-cols-3 w-full place-items-center">
                        <div className="grid grid-rows2 place-items-center">
                            {attackerWins ? (
                                <Crown weight="fill" className="text-yellow-400" />
                            ) : (
                                <Crown weight="fill" className="invisible" />
                            )}
                            <span className="font-bold">{war.attacker}</span>

                        </div>
                        <div className="flex flex-row h-full w-full items-center justify-center text-center">
                            <Sword size={32} weight="fill" className="text-gray-500" />
                            <span className="text-gray-500 ml-8 mr-8">vs</span>
                            <Shield size={32} weight="fill" className="text-gray-500" />
                        </div>
                        <div className="grid grid-rows2 place-items-center">
                            {defenderWins ? (
                                <Crown weight="fill" className="text-yellow-400" />
                            ) : (
                                <Crown weight="fill" className="invisible" />
                            )}
                            <span className="font-bold">{war.defender}</span>
                        </div>
                        <div className="text-sm text-gray-400">
                            {formatDate(war.date)}
                        </div>
                        <div className="grid grid-cols-2 text-sm text-gray-400 text-nowrap">
                            {/* <div>{war.map}</div>
                    <div>{formatDate(war.date)}</div> */}
                        </div>
                        <div className="text-sm text-gray-400">
                            {war.map}
                        </div>
                    </div>

                </div>
            </div >
        </Link>
    );
    // return (
    //     <Link to={`/wars/${war.id}`}>
    //         <div className="bg-gray-800 rounded-lg p-4">
    //             <div className="grid grid-cols-3 w-full place-items-center">
    //                 <div className="grid grid-rows2 place-items-center">
    //                     {attackerWins ? (
    //                         <Crown weight="fill" className="text-yellow-400" />
    //                     ) : (
    //                         <Crown weight="fill" className="invisible" />
    //                     )}
    //                     <span className="font-bold">{war.attacker}</span>

    //                 </div>
    //                 <div className="flex flex-col w-full items-center justify-center text-center">
    //                     <span className="text-gray-500">vs</span>
    //                 </div>
    //                 <div className="grid grid-rows2 place-items-center">
    //                     {defenderWins ? (
    //                         <Crown weight="fill" className="text-yellow-400" />
    //                     ) : (
    //                         <Crown weight="fill" className="invisible" />
    //                     )}
    //                     <span className="font-bold">{war.defender}</span>
    //                 </div>
    //                 <div className="text-sm text-gray-400">
    //                     {formatDate(war.date)}
    //                 </div>
    //                 <div className="grid grid-cols-2 text-sm text-gray-400 text-nowrap">
    //                     {/* <div>{war.map}</div>
    //                 <div>{formatDate(war.date)}</div> */}
    //                 </div>
    //                 <div className="text-sm text-gray-400">
    //                     {war.map}
    //                 </div>
    //             </div>
    //         </div >
    //     </Link>
    // );
};

export default WarListCard;
