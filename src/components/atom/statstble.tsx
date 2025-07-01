import { useMemo, useState, type JSX } from "react";
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type SortingState,
} from "@tanstack/react-table";
import { calculateColumnSums } from "../../utils/tableFunctions";
import NumberCell from "./numbercell";

type BottomCalcFunction = "sum" | "average";
export interface Calculation {
    fn: BottomCalcFunction;
    column: string;
}

interface StatsTableProps<T> {
    columns: ColumnDef<T>[];
    data: T[];
    sort?: SortingState;
    calc?: Calculation[];
}

function StatsTable<T>({ columns, data, calc, sort }: StatsTableProps<T>): JSX.Element {
    const [sorting, setSorting] = useState<SortingState>(sort || []);

    const table = useReactTable({
        data,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });


    const bottomRowCalc = useMemo(() => {
        if (calc) {
            return calculateColumnSums(data, calc.map((v) => v.column) as (keyof T)[]);
        } else {
            return {} as Record<string, number>;
        }
    }, [data])

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
                    <div className="flex relative justify-center items-center w-full space-x-2 text-white">
                        <span>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                        </span>
                        <span className="text-xs top-1/2 -translate-y-1/2 right-0.5 absolute">
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
                <td key={cell.id} className={`p-1 border border-gray-700 ${sortedIndex % 2 === 0 ? "bg-gray-800" : "bg-gray-900"} text-white text-nowrap`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
            );
        }
        tableRows.push(<tr key={row.id}>{rowCells}</tr>)
    }

    const sumRowCells: JSX.Element[] = [];
    for (const column of table.getVisibleFlatColumns()) {
        const colId = column.id;
        const sum = bottomRowCalc[colId];
        sumRowCells.push(
            <td key={colId} className="p1 border border-gray-800 bg-gray-700 border-t-3 border-t-gray-600 text-white text-right font-semibold">
                {typeof sum === "number" ? <NumberCell value={sum} /> : null}
            </td>
        )
    }
    const summaryRow = <tr key="summary">{sumRowCells}</tr>;

    return (
        <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-700">{headerRow}</thead>
            <tbody>
                {tableRows}
                {summaryRow}
            </tbody>
        </table>
    );
}

export default StatsTable;
