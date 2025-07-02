import { QueryParameter, QueryOperator, getCompanyFaction, getLeaderboard, getWar, getWars, getRosters, createPlayerDetails } from '../src/services/wardbservice'
import { useWarData } from '../src/hooks/useWarData';

const playerName = 'Marveel'

const lb = await getLeaderboard([{
    column: "B", fn: "=" as unknown as QueryOperator, value: playerName
}]);
const warqp = lb.entries.map(item => {
    return {
        column: "A", fn: "=" as unknown as QueryOperator, value: item.warid
    };
});
const rqp: QueryParameter[] = lb.entries.map(item => {
    return {
        column: "B", fn: "=" as unknown as QueryOperator, value: item.warid
    };
})
rqp.push({ column: "A", fn: "=" as unknown as QueryOperator, value: playerName });
const w = await getWars(warqp);
const r = await getRosters(rqp);
const p = createPlayerDetails(lb, r, w);
console.log(p);
