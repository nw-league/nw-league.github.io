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

    const companies = [...summary.keys()];
    const company1 = companies[0];
    const company2 = companies[1];

    const attacker = war.attacker === company1 ? company1 : company2;
    const defender = company1 === attacker ? company2 : company1;
    const attackerSummary = summary.get(attacker);
    const defenderSummary = summary.get(defender);
    const attackerFaction = factions.get(attacker);
    const defenderFaction = factions.get(defender);
    const attackerGroupSummary = groupSummary.get(attacker);
    const defenderGroupSummary = groupSummary.get(defender);
    const attackerGroups = groupDetails.get(attacker);
    const defenderGroups = groupDetails.get(defender);

    if (!attackerSummary || !attackerFaction || !defenderSummary || !defenderFaction) {
        return <div className="text-gray-500 p-8">Error loading leaderboard.</div>;
    }
    return (
        <div className="bg-gray-900 flex justify-center"> {/* fills screen & centers children */}
            <div className="flex flex-col w-full gap-4 p-4">
                <WarStatsPanel date={war.date} captures={{}} map={war.map} />
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="w-full md:w-1/2">
                        <WarResultsCompany summary={attackerSummary} faction={attackerFaction} isAttacker={true} isWinner={war.winner === war.attacker} />
                    </div>
                    <div className="w-full md:w-1/2">
                        <WarResultsCompany summary={defenderSummary} faction={defenderFaction} isAttacker={false} isWinner={war.winner === war.defender} />
                    </div>
                </div>

                <div className="hidden md:block text-center text-gray-400">
                    <GroupsComponent attackerName={attacker} attackerSummary={attackerGroupSummary} defenderName={defender} defenderSummary={defenderGroupSummary} attackerGroups={attackerGroups} defenderGroups={defenderGroups} />
                    <LeaderboardDisplay leaderboard={leaderboard} companies={factions} />
                </div>
                <div className="block md:hidden text-center text-gray-400">
                    Leaderboard hidden on small screens
                </div>
                <div className="mb-" />
            </div>
        </div>
    );
}
export default WarDetail;
