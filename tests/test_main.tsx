// import { getPlayer } from '../src/services/playerservice'
// import { getRosters } from '../src/services/rosterservice'
// import { getLeaderboard } from '../src/services/leaderboardservice'
// import { getWars } from '../src/services/wardbservice'
// import { Qop } from '../src/types/queryparameter';
// import { createPlayerDetails } from "../src/utils/player";

// const player = 'iFord';
// const p = await getPlayer(player);
// console.log(p);
// const r = await getRosters([{ column: "D", fn: Qop.Eq, value: player }]);
// console.log(r);
// const lb = await getLeaderboard([{ column: "C", fn: Qop.Eq, value: player }]);
// console.log(lb);
// const w = await getWars([...(lb!.entries.map(v => ({ column: 'A', fn: Qop.Eq, value: v.warid }))), { column: 'N', fn: Qop.Neq, value: true }]);
// console.log(w)
// const d = createPlayerDetails(p, lb!, r, w);
// console.log(d);


import { getCompanies } from '../src/services/companiesservice';
import { getWars } from '../src/services/wardbservice';
import { Qop } from '../src/types/queryparameter';
import { getPlayers } from '../src/services/playerservice';
import { getLeaderboard } from '../src/services/leaderboardservice';
import { createPlayerDetails } from '../src/utils/player';
import { getPlayer } from '../src/services/playerservice';
import { getRosters } from '../src/services/rosterservice';

const c = await getCompanies(['BEAST']);
const attackerQp = { column: "F", fn: Qop.Eq, value: 'BEAST' };
const defenderQp = { column: "G", fn: Qop.Eq, value: 'BEAST' };
const wa = await getWars([attackerQp]);
const wd = await getWars([defenderQp]);
const m = await getPlayers([{ column: "F", fn: Qop.Eq, value: 'BEAST' }]);
const lb = await getLeaderboard([{ column: "J", fn: Qop.Eq, value: 'BEAST' }]);
console.log(c);
console.log(wd);
console.log(wa);
console.log(m);
console.log(lb);
const p = await getPlayer('vShintaro');
const plb = await getLeaderboard([{ column: "C", fn: Qop.Eq, value: 'vShintaro' }]);
const wp = await getWars([...plb?.entries.map(v => ({
    column: "A",
    fn: Qop.Eq,
    value: v.warid
})) || [], { column: "N", fn: Qop.Eq, value: false }]);
const rp = await getRosters([{ column: "D", fn: Qop.Eq, value: 'vShintaro' }]);
const d = createPlayerDetails(p, plb!, rp, wp);


console.log(d);
console.log("WHAT");
