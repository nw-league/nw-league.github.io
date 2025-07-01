import { QueryParameter, QueryOperator, getCompanyFaction, getLeaderboard, getWar, getWars } from '../src/services/wardbservice'

// getLeaderboard(1).then((leaderboard) => {
//     getRoster(1).then((roster) => {
//         const sg = summarizeGroups(leaderboard, roster);
//         console.log("Summarized groups", sg);
//     });
// }).catch((err) => {
//     console.error("Error fetching leaderboard:", err);
// });

// getWar(1).then((war) => console.log(war));
const fnv: QueryOperator = "<=";
const param = [{
    column: "B",
    fn: "<=" as unknown as QueryOperator,
    value: new Date(),
}, {
    column: "F",
    fn: "IS NOT" as unknown as QueryOperator,
    value: null
}];

getWars(param, 5, { column: "B", direction: 'desc' });
