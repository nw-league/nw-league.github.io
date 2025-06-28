import { useEffect, useState } from "react";
import type { Leaderboard, StatSummary } from "../types/leaderboard";
import type { Faction } from "../types/faction";
import { getCompanyFaction, getLeaderboard, getRoster, summarizeGroups, summarizeLeaderboard } from "../services/wardbservice";
import type { Roster } from "../types/roster";

export function useWarData(warId: number) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);
    const [leaderboard, setLeaderboard] = useState<Leaderboard | null>(null);
    const [factions, setFactions] = useState<Map<string, Faction>>(new Map());
    const [summary, setSummary] = useState<Map<string, StatSummary>>(new Map());
    const [roster, setRoster] = useState<Roster | null>(null);
    const [groupSummary, setGroupSummary] = useState<Map<number, StatSummary>>(new Map());

    useEffect(() => {
        let cancelled = false;
        async function fetchAll() {
            try {
                setLoading(true);
                const lb = await getLeaderboard(warId);
                if (cancelled) return;

                const sum = summarizeLeaderboard(lb);
                const companies = [...sum.keys()];
                const f = await getCompanyFaction(companies);
                const g = await getRoster(warId);
                const gs = summarizeGroups(lb, g);
                if (cancelled) return;

                setLeaderboard(lb);
                setSummary(sum);
                setFactions(f);
                setRoster(g);
                setGroupSummary(gs);
            } catch (err) {
                if (!cancelled) setError(err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchAll();
        return () => { cancelled = true; };
    }, [warId]);

    return { loading, error, leaderboard, factions, summary, groupSummary, roster };
}
