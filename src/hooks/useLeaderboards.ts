import { useEffect, useState } from "react";
import { EmptyLeaderboard, type Leaderboard, type StatSummary } from "../types/leaderboard";
import { getLeaderboard, summarizeLeaderboard } from "../services/leaderboardservice";

export function useLeaderboards(warId: number) {
    const [leaderboard, setLeaderboard] = useState<Leaderboard>(EmptyLeaderboard);
    const [summary, setSummary] = useState<Map<string, StatSummary> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        let cancelled = false;
        async function fetchAll() {
            try {
                setLoading(true);
                const lb = await getLeaderboard(warId);
                const s = summarizeLeaderboard(lb);
                if (cancelled) return;
                setLeaderboard(lb);
                setSummary(s);
            } catch (err) {
                if (!cancelled) setError(err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchAll();
        return () => { cancelled = true };
    }, [warId]);

    return { loading, error, leaderboard, summary };
}
