import React from 'react';
import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import type { StatSummary } from '../../types/leaderboard';

interface GroupsSummaryProps {
    groups?: Map<number, StatSummary>;
}
const GroupsSummary: React.FC<GroupsSummaryProps> = ({
    groups
}) => {
    const tableGroups: Array<StatSummary & { groupId: number }> = React.useMemo(() => {
        if (!groups) return [];
        return Array.from(groups.entries())
            .map(([groupId, stats]) => ({
                ...stats,
                groupId,
            }))
            .sort((a, b) => a.groupId - b.groupId);
    }, [groups]);

    const columns = React.useMemo<ColumnDef<StatSummary & { groupId: number }>[]>(
        () => [
            {
                header: 'Group',
                accessorKey: 'groupId',
            },
            {
                header: 'Score',
                accessorKey: 'score',
                cell: info => info.getValue<number>().toLocaleString(),
            },
            {
                header: 'Kills',
                accessorKey: 'kills',
                cell: info => info.getValue<number>().toLocaleString(),
            },
            {
                header: 'Deaths',
                accessorKey: 'deaths',
                cell: info => info.getValue<number>().toLocaleString(),
            },
            {
                header: 'Assists',
                accessorKey: 'assists',
                cell: info => info.getValue<number>().toLocaleString(),
            },
            {
                header: 'Healing',
                accessorKey: 'healing',
                cell: info => info.getValue<number>().toLocaleString(),
            },
            {
                header: 'Damage',
                accessorKey: 'damage',
                cell: info => info.getValue<number>().toLocaleString(),
            },
        ],
        []
    );

    const table = useReactTable({
        data: tableGroups,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="bg-gray-800 text-white rounded-lg shadow-md overflow-x-auto">
            <h2 className="text-xl font-bold p-2">Group Summary</h2>


            {groups ? (
                <table className="w-full table-auto border-collapse">
                    <thead className="bg-gray-700">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className="p-3 border-b border-gray-600 text-left"
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="text-center p-4 text-gray-400"
                                >
                                    No groups available
                                </td>
                            </tr>
                        ) : (
                            table.getRowModel().rows.map(row => (
                                <tr
                                    key={row.id}
                                    className={row.index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <td
                                            key={cell.id}
                                            className="p-3 border-b border-gray-700 text-sm"
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            ) : (<div className='text-gray-500 p-2'>No data</div>)}
        </div>
    );
};

export default GroupsSummary;
