import { useEffect, useState } from "react";
import type { War } from "../types/war";
import { getWars } from "../services/wardbservice";

export function useWars() {
    const [wars, setWars] = useState<War[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [err, setError] = useState<any>(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchAll() {
            try {
                setLoading(true);
                const w = await getWars();
                if (cancelled) return;
                setWars(w);

            } catch (err) {
                if (!cancelled) setError(err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchAll();
        return () => { cancelled = true; };
    }, []);

    return { loading, err, wars };
}
