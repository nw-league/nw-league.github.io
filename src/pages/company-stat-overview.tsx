import type { JSX } from "react";
import type { War } from "../types/war";
import { summarize, summarizeWars } from "../utils/leaderboard";
import type { LeaderboardEntry } from "../types/leaderboard";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface CompanyStatOverviewProps {
    companyName: string
    wars: War[],
    leaderboard: LeaderboardEntry[]
}
function CompanyStatOverview({ companyName, wars, leaderboard }: CompanyStatOverviewProps): JSX.Element {
    const lbSummary = summarize(leaderboard);
    const warSummary = summarizeWars(wars, companyName);

    const data = [
        { name: "Win", value: warSummary.win },
        { name: "Loss", value: warSummary.loss },
    ];
    const COLORS = ['#4ade80', '#f87171', '#facc15']; // Tailwind green-400, red-400, yellow-400
    return (
        <div className="flex w-full text-w">
            <div className="flex flex-col items-center gap-2">
                <h1 className="text-white text-xl font-semibold text-center">Win/Loss</h1>
                <div className="bg-gray-800 p-4 rounded-lg w-auto h-auto">
                    <ResponsiveContainer width={250} height={180}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                                startAngle={-90}
                                endAngle={270}
                                animationDuration={0.1}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>

                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>

    );
}
export default CompanyStatOverview;
