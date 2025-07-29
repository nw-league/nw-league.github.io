import { getPlayer } from '../src/services/playerservice'
import { getRosters } from '../src/services/rosterservice'
import { getLeaderboard } from '../src/services/leaderboardservice'
import { getWars } from '../src/services/wardbservice'
import { Qop } from '../src/types/queryparameter';
import { createPlayerDetails } from "../src/utils/player";

const player = 'iFord';
const p = await getPlayer(player);
console.log(p);
const r = await getRosters([{ column: "D", fn: Qop.Eq, value: player }]);
console.log(r);
const lb = await getLeaderboard([{ column: "C", fn: Qop.Eq, value: player }]);
console.log(lb);
const w = await getWars([...(lb!.entries.map(v => ({ column: 'A', fn: Qop.Eq, value: v.warid }))), { column: 'N', fn: Qop.Neq, value: true }]);
console.log(w)
const d = createPlayerDetails(p, lb!, r, w);
console.log(d);
