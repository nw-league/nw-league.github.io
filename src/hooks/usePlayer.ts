import { useEffect, useState } from "react";
import { getPlayer } from "../services/playerservice";
import type { Player } from "../types/player";

export function usePlayer(playerName: string) {
    const [player, setPlayer] = useState<Player | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchData() {
            try {
                setLoading(true);

                const p = await getPlayer(playerName);

                if (cancelled) return;
                setPlayer(p)

            } catch (err) {
                if (!cancelled) setError(err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchData();

        return () => {
            cancelled = true; // Prevent state update on unmounted component
        };
    }, [playerName]);

    return { error, loading, player };
}
