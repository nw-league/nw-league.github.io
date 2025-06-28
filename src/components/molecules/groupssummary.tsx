import React, { useState } from 'react';
import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import type { StatSummary } from '../../types/leaderboard';

interface GroupsSummaryProps {
    company1Name: string,
    company2Name: string,
    company1Groups?: Map<number, StatSummary>;
    company2Groups?: Map<number, StatSummary>;
}
const GroupsSummary: React.FC<GroupsSummaryProps> = ({
    company1Groups,
    company2Groups,
    company1Name,
    company2Name,
}) => {
    const [company, setCompany] = useState<number>(0);
    const selectedGroups = company === 0 ? company1Groups : company2Groups;

    const groups: Array<StatSummary & { groupId: number }> = React.useMemo(() => {
        if (!selectedGroups) return [];
        return Array.from(selectedGroups.entries())
            .map(([groupId, stats]) => ({
                ...stats,
                groupId,
            }))
            .sort((a, b) => a.groupId - b.groupId);
    }, [company, company1Groups, company2Groups]);

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
        data: groups,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="bg-gray-800 text-white rounded-lg shadow-md overflow-x-auto">
            <h2 className="text-xl font-bold p-2">Group Summary</h2>

            <div className="flex space-x-4 p-2">
                <button
                    onClick={() => setCompany(0)}
                    className={`px-4 py-2 rounded ${company === 0 ? 'bg-blue-600' : 'bg-gray-600 hover:bg-gray-700'}`}
                >
                    {company1Name}
                </button>
                <button
                    onClick={() => setCompany(1)}
                    className={`px-4 py-2 rounded ${company === 1 ? 'bg-blue-600' : 'bg-gray-600 hover:bg-gray-700'}`}
                >
                    {company2Name}
                </button>
            </div>
            {selectedGroups ? (
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
