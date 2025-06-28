import type { CaptureTimes } from "../../types/captures";
import StatWithIcon from "./statwithicon";
import { formatDate, formatSeconds } from "../../utils/time";

interface WarStatsPanelProps {
    date: Date;
    map: string;
    captures: CaptureTimes
}

const WarStatsPanel: React.FC<WarStatsPanelProps> = ({ date, map, captures }) => {
    const pa = captures.pointA ? formatSeconds(captures.pointA) : "-";
    const pb = captures.pointB ? formatSeconds(captures.pointB) : "-";
    const pc = captures.pointC ? formatSeconds(captures.pointC) : "-";
    const pf = captures.fort ? formatSeconds(captures.fort) : "-";

    return (
        <div className="bg-gray-800 text-white rounded-lg p-4 space-y-2">
            <div className="grid grid-cols-2 w-full gap-4">

                {/* Left side: map + date */}
                <div className="grid grid-rows-2 place-items-center w-full">
                    <div className="font-bold text-3xl">{map}</div>
                    <div className="text-sm">{formatDate(date)}</div>
                </div>

                {/* Right side: captures */}
                <div className="grid grid-cols-4 place-items-center w-full">
                    <StatWithIcon icon={<div>A</div>} value={pa} />
                    <StatWithIcon icon={<div>B</div>} value={pb} />
                    <StatWithIcon icon={<div>C</div>} value={pc} />
                    <StatWithIcon icon={<div>Fort</div>} value={pf} />
                </div>

            </div>
        </div>

    );
};

export default WarStatsPanel;
