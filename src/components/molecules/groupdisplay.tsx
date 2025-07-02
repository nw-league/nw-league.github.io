import React, { useMemo } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import type { GroupPerformance, LeaderboardEntry } from '../../types/leaderboard';
import NumberCell from '../atom/numbercell';
import LabelIcon from '../atom/labelicon';
import { Fire, FirstAid, GameController, Handshake, PlusCircle, Skull, Sword, UserList } from 'phosphor-react';
import StatsTable, { type Calculation } from '../atom/statstble';
import { Link } from 'react-router-dom';
import { kRoleOrder } from '../../constants/roleorder';


interface GroupDisplayProps {
    groupId: number;
    group: GroupPerformance;
}

const GroupDisplay: React.FC<GroupDisplayProps> = ({ groupId, group }) => {
    const sort = [{ id: "role", desc: false }];

    const columns = React.useMemo<ColumnDef<LeaderboardEntry>[]>(
        () => [
            {
                accessorKey: 'name',
                header: () => (<LabelIcon text={"Player"} icon={<UserList weight="fill" />} />),
                cell: info => (
                    <div className="text-left hover:underline">
                        <Link to={`/players/${info.getValue<string>()}`}>
                            {info.getValue<string>()}
                        </Link>
                    </div>
                )
            },
            {
                accessorKey: 'role',
                header: () => <LabelIcon text={'Role'} icon={<GameController weight="fill" />} />,
                sortingFn: (rowA, rowB) => {
                    const a = rowA.getValue<string>('role');
                    const b = rowB.getValue<string>('role');
                    const ai = kRoleOrder.indexOf(a);
                    const bi = kRoleOrder.indexOf(b);
                    return ai - bi;
                },
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

    const combinedData = useMemo(() => {
        return group.stats.map(entry => {
            const player = group.group.players.find(p => p.name === entry.name);
            return { ...entry, role: player?.role ?? "Unknown" };
        })
    }, [group]);


    return (
        <div className="text-white">
            <div className="font-bold p-2 bg-gray-800 rounded-t-lg text-xs">Group {groupId}</div>
            <StatsTable columns={columns} data={combinedData} sort={sort} calc={calcColumns} />
        </div >
    );
};

export default GroupDisplay
