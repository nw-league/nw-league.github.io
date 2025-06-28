import { useParams } from "react-router-dom";
import GroupsSummary from "../components/molecules/groupssummary";
import LeaderboardDisplay from "../components/molecules/leaderboarddisplay";
import WarResultsCompany from "../components/molecules/warresultscompany";
import WarStatsPanel from "../components/molecules/warstatspanel";
import { useWarData } from "../hooks/useWarData";


const WarDetail: React.FC = () => {

    const { warId } = useParams<{ warId: string }>();
    const warIdNum = Number(warId);
    const { loading, error, leaderboard, summary, factions, groupSummary } = useWarData(warIdNum);

    if (loading) return <div className="text-white p-8">Loading leaderboard...</div>;
    if (error || !leaderboard) return <div className="text-red-500 p-8">Error loading leaderboard.</div>;

    const companies = [...summary.keys()];
    const company1 = companies[0];
    const company2 = companies[1];

    const summary1 = summary.get(company1);
    const summary2 = summary.get(company2);

    const faction1 = factions.get(company1);
    const faction2 = factions.get(company2);

    if (!summary1 || !summary2 || !faction1 || !faction2) {
        return <div className="text-red-500 p-8">Error loading leaderboard.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 flex justify-center"> {/* fills screen & centers children */}
            <div className="grid grid-rows-[auto_1fr] p-8 gap-8 max-w-480 w-full"> {/* centered content with max width */}
                <WarStatsPanel
                    date={"06/25/2025"}
                    captures={{
                        pointA: 28 * 60 + 44,
                        pointB: 22 * 60 + 37,
                        pointC: 710,
                        fort: 29,
                    }}
                    map={"Everfall"}
                />

                <div className="grid grid-cols-2 w-full gap-8">
                    <div className="h-fit">
                        <WarResultsCompany summary={summary1} faction={faction1} />
                    </div>
                    <div className="h-fit">
                        <WarResultsCompany summary={summary2!} faction={faction2} />
                    </div>
                </div>
                <GroupsSummary company1Groups={groupSummary} company1Name={company1} company2Name={company2} />
                <LeaderboardDisplay leaderboard={leaderboard} />
                <div className="mb-8" />
            </div>
        </div>
    );
}
export default WarDetail;
