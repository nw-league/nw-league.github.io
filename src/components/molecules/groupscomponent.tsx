
import { useState } from 'react';
import type { GroupPerformance, StatSummary } from '../../types/leaderboard';
import GroupsDetail from './groupsdetails';
import GroupsSummary from './groupssummary';

interface GroupsSummaryProps {
    attackerName: string,
    defenderName: string,
    attackerGroups?: Map<number, GroupPerformance>;
    defenderGroups?: Map<number, GroupPerformance>;
    attackerSummary?: Map<number, StatSummary>;
    defenderSummary?: Map<number, StatSummary>;
}
const GroupsComponent: React.FC<GroupsSummaryProps> = ({
    attackerName,
    defenderName,
    attackerGroups,
    defenderGroups,
    attackerSummary,
    defenderSummary
}) => {
    const [company, setCompany] = useState(0);

    const selectedSummary = company === 0 ? attackerSummary : defenderSummary;
    const selectedGroups = company === 0 ? attackerGroups : defenderGroups;

    return <div>
        <div className='text-white'>
            <div className="flex p-2">
                <div dir="ltr">
                    <button
                        onClick={() => setCompany(0)}
                        className={`px-4 py-2 rounded-s-lg ${company === 0 ? 'bg-blue-600' : 'bg-gray-600 hover:bg-gray-700'}`}
                    >
                        {attackerName}
                    </button>
                </div>
                <div dir="rtl">
                    <button
                        onClick={() => setCompany(1)}
                        className={`px-4 py-2 rounded-s-lg ${company === 1 ? 'bg-blue-600' : 'bg-gray-600 hover:bg-gray-700'}`}
                    >
                        {defenderName}
                    </button>
                </div>
            </div>
        </div>
        <div className='grid grid-cols-1 gap-8'>
            <GroupsSummary groups={selectedSummary} />
            <GroupsDetail groups={selectedGroups} />
        </div>
    </div>

};

export default GroupsComponent;
