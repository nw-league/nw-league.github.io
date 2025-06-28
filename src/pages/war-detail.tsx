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
        <div className="min-h-screen bg-gray-900 flex justify-center"> {/* fills screen & centers children */}
            <div className="grid grid-rows-[auto_1fr] p-8 gap-8 max-w-480 w-full"> {/* centered content with max width */}
                <WarStatsPanel
                    date={war.date}
                    captures={{}}
                    map={war.map}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8">
                    <div className="h-fit">
                        <WarResultsCompany summary={attackerSummary} faction={attackerFaction} isAttacker={true} isWinner={war.winner === war.attacker} />
                    </div>
                    <div className="h-fit">
                        <WarResultsCompany summary={defenderSummary} faction={defenderFaction} isAttacker={false} isWinner={war.winner === war.defender} />
                    </div>
                </div>

                <GroupsComponent attackerName={attacker} attackerSummary={attackerGroupSummary} defenderName={defender} defenderSummary={defenderGroupSummary} attackerGroups={attackerGroups} defenderGroups={defenderGroups} />
                <LeaderboardDisplay leaderboard={leaderboard} companies={factions} />
                <div className="mb-8" />
            </div>
        </div>
    );
}
export default WarDetail;
