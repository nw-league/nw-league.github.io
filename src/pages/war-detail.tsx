import { useParams } from "react-router-dom";
import LeaderboardDisplay from "../components/molecules/leaderboarddisplay";
import WarResultsCompany from "../components/molecules/warresultscompany";
import WarStatsPanel from "../components/molecules/warstatspanel";
import { useWarData } from "../hooks/useWarData";
import GroupsComponent from "../components/molecules/groupscomponent";



const WarDetail: React.FC = () => {

    const { warId } = useParams<{ warId: string }>();
    const warIdNum = Number(warId);
    const { loading, error, war, leaderboard, summary, factions, groupSummary, groupDetails } = useWarData(warIdNum);

    if (loading) return <div className="text-white p-8">Loading leaderboard...</div>;
    if (error || !leaderboard || !war) return <div className="text-red-500 p-8">Error loading leaderboard.</div>;

    const attackerSummary = summary.get(war.attacker);
    const defenderSummary = summary.get(war.defender);
    const attackerFaction = factions.get(war.attacker);
    const defenderFaction = factions.get(war.defender);
    const attackerGroupSummary = groupSummary.get(war.attacker);
    const defenderGroupSummary = groupSummary.get(war.defender);
    const attackerGroups = groupDetails.get(war.attacker);
    const defenderGroups = groupDetails.get(war.defender);

    if (!attackerSummary || !attackerFaction || !defenderSummary || !defenderFaction) {
        return <div className="text-gray-500 p-8">Error loading leaderboard.</div>;
    }

    return (
        <div className="bg-gray-900 flex justify-center px-4"> {/* fills screen & centers children */}
            <div className="flex flex-col w-full max-w-6xl gap-4 p-4">
                <WarStatsPanel date={war.date} captures={{}} map={war.map} />
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="w-full md:w-1/2">
                        <WarResultsCompany summary={attackerSummary} faction={attackerFaction} isAttacker={true} isWinner={war.winner === war.attacker} />
                    </div>
                    <div className="w-full md:w-1/2">
                        <WarResultsCompany summary={defenderSummary} faction={defenderFaction} isAttacker={false} isWinner={war.winner === war.defender} />
                    </div>
                </div>

                {/* <div className="hidden md:block text-center text-gray-400"> */}
                <GroupsComponent attackerName={war.attacker} attackerSummary={attackerGroupSummary} defenderName={war.defender} defenderSummary={defenderGroupSummary} attackerGroups={attackerGroups} defenderGroups={defenderGroups} />
                <LeaderboardDisplay leaderboard={leaderboard} companies={factions} />
                {/* </div> */}
                {/* <div className="block md:hidden text-center text-gray-400"> */}
                {/* Leaderboard hidden on small screens */}
                {/* </div> */}
                <div className="mb-" />
            </div>
        </div>
    );
}
export default WarDetail;
