import React, { useState } from 'react';
import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import type { GroupStats } from '../../types/leaderboard';

interface GroupsSummaryProps {
    company1Groups: GroupStats[];
    company2Groups: GroupStats[];
}
const GroupsSummary: React.FC<GroupsSummaryProps> = ({
    company1Groups,
    company2Groups,
}) => {
    // 0 for company 1, 1 for company 2
    const [company, setCompany] = useState<number>(0);

    // Choose groups based on selected company, fallback to empty array
    const groups = company === 0 ? company1Groups : company2Groups || [];

    const columns = React.useMemo<ColumnDef<GroupStats>[]>(
        () => [
            {
                header: 'Group Name',
                accessorKey: 'name',
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
            {
                header: 'KPAR',
                accessorKey: 'kpar',
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
        <div className="bg-gray-800 text-white rounded-lg shadow-md overflow-x-auto p-4">
            <h2 className="text-xl font-bold mb-4">Group Summary</h2>

            {/* Company Selection Buttons */}
            <div className="mb-4 flex space-x-4">
                <button
                    onClick={() => setCompany(0)}
                    className={`px-4 py-2 rounded ${company === 0 ? 'bg-blue-600' : 'bg-gray-600 hover:bg-gray-700'
                        }`}
                >
                    Company 1
                </button>
                <button
                    onClick={() => setCompany(1)}
                    className={`px-4 py-2 rounded ${company === 1 ? 'bg-blue-600' : 'bg-gray-600 hover:bg-gray-700'
                        }`}
                >
                    Company 2
                </button>
            </div>

            {/* Table */}
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
        </div>
    );
};

export default GroupsSummary;
