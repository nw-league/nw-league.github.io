// tests/test_main.tsx
import { getWars } from '../src/services/wardbservice';
import { getLeaderboard } from '../src/services/leaderboardservice';
import { getRosters } from '../src/services/rosterservice';

const c = await getWars([]);
const lb = await getLeaderboard(1);
const r = await getRosters(1);
console.log(c);
console.log(lb);
console.log(r);
