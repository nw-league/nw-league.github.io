import type { Leaderboard, LeaderboardEntry } from "../../types/leaderboard";
import React from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
    type ColumnDef,
    type SortingState,
} from '@tanstack/react-table';
import type { Faction } from "../../types/faction";
import NumberCell from "../atom/numbercell";
import LabelIcon from "../atom/labelicon";
import { Fire, FirstAid, Handshake, PlusCircle, Skull, Sword, UserList, UsersThree } from "phosphor-react";

type LeaderboardProps = {
    leaderboard: Leaderboard,
    companies: Map<string, Faction>,
};

const LeaderboardDisplay: React.FC<LeaderboardProps> = ({ leaderboard, companies }) => {
    const [sorting, setSorting] = React.useState<SortingState>([
        { id: 'score', desc: true },
    ]);

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
                accessorKey: 'company',
                header: () => (<LabelIcon text='Company' icon={<UsersThree weight="fill" />} />),
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
        data: leaderboard.entries,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg text-white">
            <h2 className="text-xl font-bold p-2">Leaderboard</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                    < thead className="bg-gray-700" >
                        {
                            table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            onClick={header.column.getToggleSortingHandler()}
                                            className="cursor-pointer select-none p-2 border-b border-gray-600 text-left"
                                        >
                                            <div className="flex relative justify-center w-full items-center space-x-2">
                                                <span>
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                </span>
                                                <span className="text-xs absolute right-0.5">
                                                    {{
                                                        asc: '▲',
                                                        desc: '▼',
                                                    }[header.column.getIsSorted() as string] ?? null}
                                                </span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            ))
                        }
                    </thead >
                    <tbody>
                        {table.getRowModel().rows.map((row, index) => {
                            const faction = companies.get(row.original.company);

                            const rowClass = index % 2 === 0 ? faction === 'Marauder'
                                ? 'bg-green-800'
                                : faction === 'Syndicate'
                                    ? 'bg-purple-800'
                                    : faction === 'Covenant'
                                        ? 'bg-yellow-800'
                                        : 'bg-gray-800' : faction === 'Marauder'
                                ? 'bg-green-900'
                                : faction === 'Syndicate'
                                    ? 'bg-purple-900'
                                    : faction === 'Covenant'
                                        ? 'bg-yellow-900'
                                        : 'bg-gray-800';

                            return (
                                <tr key={row.id} className={rowClass}>
                                    {row.getVisibleCells().map(cell => (
                                        <td
                                            key={cell.id}
                                            className="p-3 border-b border-gray-700 text-sm"
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                        {table.getRowModel().rows.length === 0 && (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="text-center p-4 text-gray-400"
                                >
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default LeaderboardDisplay
