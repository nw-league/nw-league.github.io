import { useEffect, useMemo, useState } from "react";
import { useRostersByPlayer } from "./useRostersByPlayer";
import { createPlayerDetails } from "../utils/player";
import { usePlayer } from "./usePlayer";
import { useLeaderboardsByPlayer } from "./useLeaderboardsByPlayer";
import { useWarsById } from "./useWarsById";

export function usePlayerDetails(player: string) {
    const [error, setError] = useState<any>(null);

    const pHook = usePlayer(player);
    const rHook = useRostersByPlayer(player);
    const lbHook = useLeaderboardsByPlayer(player);
    const warIds = useMemo(() => lbHook.leaderboard.map(v => v.warid), [lbHook.leaderboard]);
    const wHook = useWarsById(warIds);
    const loading = wHook.loading || rHook.loading || pHook.loading || lbHook.loading;

    const playerDetails = createPlayerDetails(pHook.player, { entries: lbHook.leaderboard }, rHook.rosters, wHook.wars);
    useEffect(() => {
        setError(wHook.error || rHook.error || pHook.error || lbHook.error);
    }, [wHook.error, rHook.error, pHook.error, lbHook.error]);

    return { loading, error, details: playerDetails };
}
