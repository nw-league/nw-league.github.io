import type { JSX } from "react";
import type { Player } from "../../types/player";

import PlayerListCard from "../atom/playerlistcard";

interface CompanyMemberProps {
    members: Player[];
}
function CompanyMembersTable({ members }: CompanyMemberProps): JSX.Element {
    // const columns = useMemo<ColumnDef<Player>[]>(() => [
    //     {
    //         accessorKey: 'name',
    //         header: 'Name',
    //         cell: info => info.getValue(),
    //     },
    //     {
    //         accessorKey: 'role',
    //         header: 'Role',
    //         cell: info => info.getValue(),
    //     },
    // ], []);

    return (
        <div className="flex flex-col w-full gap-2 max-w-lg">
            {members.map(v => <div className="hover:scale-105"><PlayerListCard player={v} /></div>)}
        </div>
        // <StatsTable columns={columns} data={members} />
    );
}
export default CompanyMembersTable;
;
