import GroupsSummary from "../components/molecules/groupssummary";
import LeaderboardDisplay from "../components/molecules/leaderboarddisplay";
import WarResultsCompany from "../components/molecules/warresultscompany";
import WarStatsPanel from "../components/molecules/warstatspanel";
import { groupStats, sampleLeaderboard, company2Groups } from "../context/datacontext";


const WarDetail: React.FC = () => {
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
                        <WarResultsCompany
                            name={"Company1"}
                            faction={"Marauder"}
                            kills={147}
                            deaths={258}
                            assists={2135}
                            healing={27536531}
                            damage={47942178}
                            winner={false}
                        />
                    </div>
                    <div className="h-fit">
                        <WarResultsCompany
                            name={"Company2"}
                            faction={"Syndicate"}
                            kills={258}
                            deaths={147}
                            assists={5092}
                            healing={26408280}
                            damage={52485992}
                            winner={true}
                        />
                    </div>
                </div>
                <GroupsSummary company1Groups={groupStats} company2Groups={company2Groups} />
                <LeaderboardDisplay leaderboard={sampleLeaderboard} />
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full bg-gray-900 text-white p-8">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-blue-400">War Not Found</h1>
            </div>
        </div>
    );
}
export default WarDetail;
