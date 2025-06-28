import React from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    type ColumnDef,
} from '@tanstack/react-table';
import type { LeaderboardEntry } from '../../types/leaderboard';

interface GroupDisplayProps {
    groupId: number;
    group: LeaderboardEntry[];
}

const GroupDisplay: React.FC<GroupDisplayProps> = ({ groupId, group }) => {
    const columns = React.useMemo<ColumnDef<LeaderboardEntry>[]>(
        () => [
            {
                accessorKey: 'name',
                header: 'Player Name',
            },
            {
                accessorKey: 'role',
                header: 'Role',
            },
            {
                accessorKey: 'score',
                header: 'Score',
                cell: info => info.getValue<number>().toLocaleString(),
            },
            {
                accessorKey: 'kills',
                header: 'Kills',
                cell: info => info.getValue<number>().toLocaleString(),
            },
            {
                accessorKey: 'deaths',
                header: 'Deaths',
                cell: info => info.getValue<number>().toLocaleString(),
            },
            {
                accessorKey: 'assists',
                header: 'Assists',
                cell: info => info.getValue<number>().toLocaleString(),
            },
            {
                accessorKey: 'damage',
                header: 'Damage',
                cell: info => info.getValue<number>().toLocaleString(),
            },
            {
                accessorKey: 'healing',
                header: 'Healing',
                cell: info => info.getValue<number>().toLocaleString(),
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
        <div className="text-white bg-gray-800 rounded-lg pb-2">
            <h3 className="text-xl font-bold p-2">Group {groupId}</h3>
            <table className="w-full border-collapse text-sm">
                <thead className="bg-gray-700">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    className="p-2 text-left border-b border-gray-600"
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
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
                                <td key={cell.id} className="p-2 border-b border-gray-700">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GroupDisplay
