
export function calculateColumnSums<T>(data: T[], numericKeys: (keyof T)[]): Record<string, number> {
    const sums = {} as Record<string, number>;
    for (const key of numericKeys) {
        sums[key as string] = data.reduce((acc, row) => acc + (row[key] as unknown as number ?? 0), 0);
    }
    return sums;
}
