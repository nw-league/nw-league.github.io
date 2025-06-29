import React from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    type ColumnDef,
} from '@tanstack/react-table';
import type { LeaderboardEntry } from '../../types/leaderboard';
import NumberCell from '../atom/numbercell';
import LabelIcon from '../atom/labelicon';
import { Fire, FirstAid, GameController, Handshake, PlusCircle, Skull, Sword, UserList } from 'phosphor-react';

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

    const table = useReactTable({
        data: group ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="text-white bg-gray-800 rounded-lg">
            <h3 className="text-xl font-bold p-2">Group {groupId}</h3>
            < table className="w-full table-auto border-collapse text-sm">
                <thead className="bg-gray-700">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    className=" p-2 border-b border-gray-600"
                                >
                                    <div className="flex justify-center items-center w-full">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr
                            key={row.id}
                            className={row.index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}
                        >
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="p-1 border border-gray-700">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table >
        </div >
    );
};

export default GroupDisplay
