import type { CaptureTimes } from "../../types/captures";
import StatWithIcon from "./statwithicon";
import { formatSeconds } from "../../utils/time";

interface WarStatsPanelProps {
    date: string;
    map: string;
    captures: CaptureTimes
}

const WarStatsPanel: React.FC<WarStatsPanelProps> = ({ date, map, captures }) => {

    return (
        <div className="bg-gray-800 text-white rounded-lg p-4 space-y-2">
            <div className="grid grid-cols-2 w-full gap-4">

                {/* Left side: map + date */}
                <div className="grid grid-rows-2 place-items-center w-full">
                    <div className="font-bold text-3xl">{map}</div>
                    <div className="text-sm">{date}</div>
                </div>

                {/* Right side: captures */}
                <div className="grid grid-cols-4 place-items-center w-full">
                    <StatWithIcon icon={<div>A</div>} value={formatSeconds(captures?.pointA || 0)} />
                    <StatWithIcon icon={<div>B</div>} value={formatSeconds(captures?.pointB || 0)} />
                    <StatWithIcon icon={<div>C</div>} value={formatSeconds(captures?.pointC || 0)} />
                    <StatWithIcon icon={<div>Fort</div>} value={formatSeconds(captures?.fort || 0)} />
                </div>

            </div>
        </div>

    );
};

export default WarStatsPanel;
