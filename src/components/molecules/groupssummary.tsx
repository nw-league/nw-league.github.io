import React from 'react';
import {
    type ColumnDef,


} from '@tanstack/react-table';
import type { StatSummary } from '../../types/leaderboard';
import NumberCell from '../atom/numbercell';
import LabelIcon from '../atom/labelicon';
import StatsTable from '../atom/statstble';
import { FireIcon, FirstAidIcon, HandshakeIcon, PlusCircleIcon, SkullIcon, SwordIcon, UsersIcon } from '@phosphor-icons/react';

interface GroupsSummaryProps {
    groups?: Map<number, StatSummary>;
}
const GroupsSummary: React.FC<GroupsSummaryProps> = ({
    groups
}) => {


    const columns = React.useMemo<ColumnDef<StatSummary>[]>(
        () => [
            {
                accessorKey: 'name',
                header: () => (<LabelIcon text={"Group"} icon={<UsersIcon weight="fill" />} />),
                cell: info => (
                    <div className="text-left">
                        {info.getValue<string>()}
                    </div>
                )
            },
            {
                accessorKey: 'score',
                header: () => (<LabelIcon text={'Score'} icon={<PlusCircleIcon weight="fill" />} />),
                cell: info => (
                    <div className="text-right">
                        <NumberCell value={info.getValue<number>()} />
                    </div>
                ),
            },
            {
                accessorKey: 'kills',
                header: () => <LabelIcon text='Kills' icon={<SwordIcon weight='fill' />} />,
                cell: info => (
                    <div className="text-right">
                        <NumberCell value={info.getValue<number>()} />
                    </div>
                ),
            },
            {
                accessorKey: 'deaths',
                header: () => <LabelIcon text='Deaths' icon={<SkullIcon weight='fill' />} />,
                cell: info => (
                    <div className="text-right">
                        <NumberCell value={info.getValue<number>()} />
                    </div>
                ),
            },
            {
                accessorKey: 'assists',
                header: () => <LabelIcon text='Assists' icon={<HandshakeIcon weight='fill' />} />,
                cell: info => (
                    <div className="text-right">
                        <NumberCell value={info.getValue<number>()} />
                    </div>
                ),
            },
            {
                accessorKey: 'healing',
                header: () => <LabelIcon text='Healing' icon={<FirstAidIcon weight='fill' />
                } />,
                cell: info => (
                    <div className="text-right">
                        <NumberCell value={info.getValue<number>()} />
                    </div>
                ),
            },
            {
                accessorKey: 'damage',
                header: () => <LabelIcon text='Damage' icon={<FireIcon weight='fill' />} />,
                cell: info => (
                    <div className="text-right">
                        <NumberCell value={info.getValue<number>()} />
                    </div>
                ),
            },
        ],
        []
    );

    const data: Array<StatSummary> = React.useMemo(() => {
        if (!groups) return [];

        return Array.from(groups.keys())
            .sort((a, b) => a - b)
            .map(key => groups.get(key))
            .filter((item): item is StatSummary => item !== undefined);
    }, [groups]);

    return (
        <div className="bg-gray-800 text-white rounded-lg shadow-md overflow-x-auto">
            <h2 className="text-lg font-bold p-2">Group Summary</h2>

            {groups ? (
                <div className="text-lg"><StatsTable columns={columns} data={data} /></div>
            ) : (<div className='text-gray-500 p-2'>No data</div>)}
        </div>
    );
};

export default GroupsSummary;
