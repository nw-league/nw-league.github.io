import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, type ColumnDef, type SortingState } from "@tanstack/react-table";
import { useMemo, useState, type JSX } from "react";
import type { WinLoss } from "../../types/winloss";
import LabelIcon from "../atom/labelicon";
import { ListNumbersIcon, ThumbsDownIcon, ThumbsUpIcon, UsersThreeIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

import { factionBgSecondary, factionBgTertiary } from "../../utils/factions";

interface RankingsDisplayProps {
    rankings: WinLoss[];
}

function RankingsDisplay({ rankings }: RankingsDisplayProps): JSX.Element {
    const [sorting, setSorting] = useState<SortingState>([{ id: 'rank', desc: true }]);

    const sortedRankings = useMemo(() => {
        return [...rankings].sort((a, b) => {
            const aScore = (a.attackWins + a.defenseWins) - (a.attackLoss + a.defenseLoss);
            const bScore = (b.attackWins + b.defenseWins) - (b.attackLoss + b.defenseLoss);
            return bScore - aScore;
        });
    }, [rankings]);

    const columns = useMemo<ColumnDef<WinLoss>[]>(() => [
        {
            id: 'rank',
            header: () => <LabelIcon icon={<ListNumbersIcon weight="fill" />} text="Rank" />,
            accessorFn: row => (row.attackWins + row.defenseWins) - (row.attackLoss + row.defenseLoss),
            sortingFn: 'basic',
            cell: (info) => <div className="text-center">{info.row.index + 1}</div>,
        },
        {
            accessorKey: 'name',
            id: "company",
            header: () => <LabelIcon icon={<UsersThreeIcon weight="fill" />} text="Company" />,
            cell: (info) => (
                <div className="text-left hover:underline">
                    <Link to={`/companies/${info.getValue<string>()}`}>
                        {info.getValue<string>()}
                    </Link>
                </div>
            ),
        },
        {
            accessorFn: (item) => item.attackWins + item.defenseWins,
            id: 'wins',
            header: () => <LabelIcon icon={<ThumbsUpIcon weight="fill" />} text="Wins" />,
            cell: (info) => <div className="text-center">{info.getValue<number>()}</div>,
        },
        {
            accessorFn: (item) => item.attackLoss + item.defenseLoss,
            id: 'loss',
            header: () => <LabelIcon icon={<ThumbsDownIcon />} text="Losses" />,
            cell: (info) => <div className="text-center">{info.getValue<number>()}</div>,
        },
    ], []);

    const table = useReactTable({
        data: sortedRankings,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="w-full text-white">
            <table className="w-full table-auto border-collapse text-sm">
                <thead className="bg-gray-700">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    colSpan={header.colSpan}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className="cursor-pointer select-none p-2 border-b border-gray-600 text-center"
                                >
                                    <div className="flex justify-center items-center relative w-full space-x-2">
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
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row, index) => {
                        const rowClass = index % 2 === 0 ? factionBgSecondary('Gray') : factionBgTertiary('Gray');
                        return (
                            <tr key={row.id} className={rowClass}>
                                {row.getVisibleCells().map(cell => (
                                    <td
                                        key={cell.id}
                                        className="p-3 border-b border-gray-700 text-sm text-nowrap"
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}


export default RankingsDisplay;
