import { useEffect, useState } from "react";
import { Qop } from "../types/queryparameter";
import type { War } from "../types/war";
import { getWars } from "../services/wardbservice";

export function useWarsByCompany(companyName: string) {
    const [wars, setWars] = useState<War[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        let cancelled = false;
        async function fetchAll() {
            try {
                setLoading(true);
                const attackerQp = { column: "D", fn: Qop.Eq, value: companyName };
                const defenderQp = { column: "E", fn: Qop.Eq, value: companyName };

                const [atk, def] = await Promise.all([getWars([attackerQp]), getWars([defenderQp])]);
                if (cancelled) return;

                const w = atk.concat(def).sort((a, b) => (a.date.getTime() - b.date.getTime()));

                setWars(w)
            } catch (err) {
                if (!cancelled) setError(err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        fetchAll();
        return () => { cancelled = true };
    }, [companyName]);

    return { loading, error, wars };
}
