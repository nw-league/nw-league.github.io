import { useEffect, useState } from "react";
import { type LeaderboardEntry, type StatSummary } from "../types/leaderboard";
import { getLeaderboard, summarizeLeaderboard } from "../services/leaderboardservice";
import { Qop } from "../types/queryparameter";

export function useLeaderboardsByPlayer(player: string) {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [summary, setSummary] = useState<Map<string, StatSummary>>(new Map());
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        let cancelled = false;
        async function fetchAll() {
            try {
                setLoading(true);
                const qp = { column: "C", fn: Qop.Eq, value: player };
                const lb = await getLeaderboard([qp]);

                if (!lb) throw new Error("Problem getting leaderboard.");

                const s = summarizeLeaderboard(lb);
                if (cancelled) return;

                setLeaderboard(lb.entries);
                setSummary(s);

            } catch (err) {
                if (!cancelled) setError(err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchAll();
        return () => { cancelled = true };
    }, [player]);

    return { loading, error, leaderboard, summary };
}
