// tests/test_main.tsx
import { getWars } from '../src/services/wardbservice';
import { getLeaderboard, summarizeLeaderboard } from '../src/services/leaderboardservice';
import { getRosters } from '../src/services/rosterservice';
import { getGroupDetails } from '../src/utils/groupdetails';

const c = await getWars([]);
const lb = await getLeaderboard(1);
const s = summarizeLeaderboard(lb);
const r = await getRosters(1);
const gd = getGroupDetails(lb, r);
console.log(s);
console.log(c);
console.log(lb);
console.log(r);
console.log(gd);
