import React from 'react';
import type { LeaderboardEntry } from '../../types/leaderboard';
import GroupDisplay from './groupdisplay';

interface GroupsDetailProps {
    groups?: Map<number, LeaderboardEntry[]>;
}

const GroupsDetail: React.FC<GroupsDetailProps> = ({ groups }) => {

    const rows = []
    if (groups) {
        const sortedGroups = Array.from(groups.entries()).sort((a, b) => a[0] - b[0]);
        for (const [n, group] of sortedGroups) {
            rows.push(
                <GroupDisplay group={group} groupId={n} />
            )
        }
    }
    return <div className="rounded-lg grid grid-cols-1 md:grid-cols-2 mt-8 mb-8 gap-16">
        {rows}
    </div>;
};

export default GroupsDetail;
