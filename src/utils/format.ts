export function formatCompact(value: number): string {
    return Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 0 }).format(value);
}

export function formatThousands(value: number): string {
    return value.toLocaleString();
}
