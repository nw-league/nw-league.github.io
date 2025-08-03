import { useEffect, useState } from "react";
import type { Roster } from "../types/roster";
import { getRosters } from "../services/rosterservice";
import { Qop } from "../types/queryparameter";

export function useRosters(warIds: number[]) {
    const [rosters, setRosters] = useState<Map<number, Map<string, Roster>>>(new Map());
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any>(null);
    const warKey = warIds.sort().join(',');

    console.log(warKey);

    useEffect(() => {
        let cancelled = false;
        console.log('useRosters use effect triggered');
        async function fetchAll() {
            try {
                setLoading(true);
                if (warIds.length === 0) {
                    setRosters(new Map());
                    console.log("userRoster() here 0");
                } else {
                    console.log("userRoster() here 1");
                    const qp = warIds.map(v => ({ column: "B", fn: Qop.Eq, value: v }));
                    console.log("userRoster() here 2");
                    const r = await getRosters(qp);
                    console.log("userRoster() here 3");
                    if (cancelled) return;
                    console.log("userRoster() here 4");
                    console.log(r);
                    console.log("userRoster() here 5");
                    setRosters(r);
                    console.log("userRoster() here 6");
                }
            } catch (err) {
                if (!cancelled) setError(err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        fetchAll();
        return () => { cancelled = true };
    }, [warKey]);
    return { loading, error, rosters };
}
