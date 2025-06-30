import React from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import type { LeaderboardEntry } from '../../types/leaderboard';
import NumberCell from '../atom/numbercell';
import LabelIcon from '../atom/labelicon';
import { Fire, FirstAid, GameController, Handshake, PlusCircle, Skull, Sword, UserList } from 'phosphor-react';
import StatsTable, { type Calculation } from '../atom/statstble';


interface GroupDisplayProps {
    groupId: number;
    group: LeaderboardEntry[];
}

const GroupDisplay: React.FC<GroupDisplayProps> = ({ groupId, group }) => {
    const columns = React.useMemo<ColumnDef<LeaderboardEntry>[]>(
        () => [
            {
                accessorKey: 'name',
                header: () => (<LabelIcon text={"Player"} icon={<UserList weight="fill" />} />),
                cell: info => (
                    <div className="text-left">
                        {info.getValue<string>()}
                    </div>
                )
            },
            {
                accessorKey: 'role',
                header: () => <LabelIcon text={'Role'} icon={<GameController weight="fill" />} />,
            },
            {
                accessorKey: 'score',
                header: () => (<LabelIcon text={'Score'} icon={<PlusCircle weight="fill" />} />),
                cell: info => (
                    <div className="text-right">
                        <NumberCell value={info.getValue<number>()} />
                    </div>
                ),
            },
            {
                accessorKey: 'kills',
                header: () => <LabelIcon text='Kills' icon={<Sword weight='fill' />} />,
                cell: info => (
                    <div className="text-right">
                        <NumberCell value={info.getValue<number>()} />
                    </div>
                ),
            },
            {
                accessorKey: 'deaths',
                header: () => <LabelIcon text='Deaths' icon={<Skull weight='fill' />} />,
                cell: info => (
                    <div className="text-right">
                        <NumberCell value={info.getValue<number>()} />
                    </div>
                ),
            },
            {
                accessorKey: 'assists',
                header: () => <LabelIcon text='Assists' icon={<Handshake weight='fill' />} />,
                cell: info => (
                    <div className="text-right">
                        <NumberCell value={info.getValue<number>()} />
                    </div>
                ),
            },
            {
                accessorKey: 'healing',
                header: () => <LabelIcon text='Healing' icon={<FirstAid weight='fill' />} />,
                cell: info => (
                    <div className="text-right">
                        <NumberCell value={info.getValue<number>()} />
                    </div>
                ),
            },
            {
                accessorKey: 'damage',
                header: () => <LabelIcon text='Damage' icon={<Fire weight='fill' />} />,
                cell: info => (
                    <div className="text-right">
                        <NumberCell value={info.getValue<number>()} />
                    </div>
                ),
            },
        ],
        []
    );

    const calcColumns: Calculation[] = [
        { fn: "sum", column: "score" },
        { fn: "sum", column: "kills" },
        { fn: "sum", column: "deaths" },
        { fn: "sum", column: "assists" },
        { fn: "sum", column: "healing" },
        { fn: "sum", column: "damage" },
    ]

    return (
        <div className="text-white">
            <div className="font-bold p-2 bg-gray-800 rounded-t-lg">Group {groupId}</div>
            <StatsTable columns={columns} data={group} calc={calcColumns} />
        </div >
    );
};

export default GroupDisplay
