import React from 'react';
import type { GroupPerformance } from '../../types/leaderboard';
import GroupDisplay from './groupdisplay';

interface GroupsDetailProps {
    groups?: Map<number, GroupPerformance>;
}

const GroupsDetail: React.FC<GroupsDetailProps> = ({ groups }) => {

    const rows = []
    if (groups) {
        const sortedGroups = Array.from(groups.entries()).sort((a, b) => a[0] - b[0]);
        for (const [n, group] of sortedGroups) {
            rows.push(
                <div className="w-full overflow-x-auto">
                    <GroupDisplay group={group} groupId={n} />
                </div>
            )
        }
    }



    return (
        <div className="rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-8">
            {rows}
        </div>
    );
};

export default GroupsDetail;
