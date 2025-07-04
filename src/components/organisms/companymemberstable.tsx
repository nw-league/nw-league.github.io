import { useMemo, type JSX } from "react";
import type { Player } from "../../types/player";
import StatsTable from "../atom/statstble";
import type { ColumnDef } from "@tanstack/react-table";

interface CompanyMemberProps {
    members: Player[];
}
function CompanyMembersTable({ members }: CompanyMemberProps): JSX.Element {
    const columns = useMemo<ColumnDef<Player>[]>(() => [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'role',
            header: 'Role',
            cell: info => info.getValue(),
        },
    ], []);

    return (
        <StatsTable columns={columns} data={members} />
    );
}
export default CompanyMembersTable;
