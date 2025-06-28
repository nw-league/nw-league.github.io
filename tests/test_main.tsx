import { getCompanyFaction, getLeaderboard, getRoster, summarizeGroups } from '../src/services/wardbservice'

getLeaderboard(1).then((leaderboard) => {
    getRoster(1).then((roster) => {
        const sg = summarizeGroups(leaderboard, roster);
        console.log("Summarized groups", sg);
    });
}).catch((err) => {
    console.error("Error fetching leaderboard:", err);
});
