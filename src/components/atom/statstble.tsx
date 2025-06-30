import React, { useState, type JSX } from "react";
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type SortingState,
} from "@tanstack/react-table";

interface StatsTableProps<T> {
    columns: ColumnDef<T>[];
    data: T[];
}

function StatsTable<T>({ columns, data }: StatsTableProps<T>): JSX.Element {
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const headerRow: JSX.Element[] = [];
    for (const headerGroup of table.getHeaderGroups()) {
        const headerCells: JSX.Element[] = [];
        for (const header of headerGroup.headers) {
            headerCells.push(
                <th
                    key={header.id}
                    colSpan={header.colSpan}
                    onClick={header.column.getToggleSortingHandler()}
                    className="p-1 cursor-pointer select-none border-b border-gray-600 text-left"
                >
                    <div className="flex relative justify-center w-full space-x-2 text-gray-200">
                        <span>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                        </span>
                        <span className="text-xs absolute right-0.5">
                            {{ asc: "▲", desc: "▼" }[header.column.getIsSorted() as string] ?? null}
                        </span>
                    </div>
                </th>
            );
        }
        headerRow.push(<tr key={headerGroup.id}>{headerCells}</tr>);
    }

    const tableRows: JSX.Element[] = [];
    for (const [sortedIndex, row] of table.getSortedRowModel().rows.entries()) {
        const rowCells: JSX.Element[] = [];
        for (const cell of row.getVisibleCells()) {
            rowCells.push(
                <td key={cell.id} className={`p-1 border border-gray-800 ${sortedIndex % 2 === 0 ? "bg-gray-800" : "bg-gray-900"} text-gray-200`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
            );
        }
        tableRows.push(<tr key={row.id}>{rowCells}</tr>)
    }

    return (
        <table className="min-w-full table-auto border-collapse text-sm">
            <thead className="bg-gray-700">{headerRow}</thead>
            <tbody>{tableRows}</tbody>
        </table>
    );
}

export default StatsTable;
