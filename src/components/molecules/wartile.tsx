import { type JSX } from "react";
import type { War } from "../../types/war";

export interface WarTileProps {
    war: War;
}

function WarTile({ war }: WarTileProps): JSX.Element {
    return (
        <div className="bg-gray-800 text-gray-200 w-full h-full flex items-center justify-center rounded-lg p-2">
            <div className="text-center">
                <div className="font-semibold">{war.attacker}</div>
                <div className="text-sm text-gray-400">vs</div>
                <div className="font-semibold">{war.defender}</div>
                <div className="text-sm text-gray-400">{war.map}</div>
            </div>
            {/* <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-sm text-gray-400">
                <div className="text-sm text-gray-400">{war.map}</div>
            </div> */}
        </div>
    );
}


export default WarTile;
