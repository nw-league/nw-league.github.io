import { useEffect, useState } from "react";
import type { QueryParameter } from "../types/queryparameter";
import type { War } from "../types/war";
import { getWars } from "../services/wardbservice";

export function useWars(withIds: number[]) {
    const [wars, setWars] = useState<War[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        let cancelled = false;
        async function fetchAll() {
            try {
                setLoading(true);
                const query: QueryParameter[] = [];
                for (const wid of withIds) {
                    query.push({ column: "A", fn: "=", value: wid });
                }
                const w = await getWars(query);
                if (cancelled) return;
                setWars(w)
            } catch (err) {
                if (!cancelled) setError(err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        fetchAll();
        return () => { cancelled = true };
    }, []);

    return { loading, error, wars };
}
