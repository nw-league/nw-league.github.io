export function formatSeconds(seconds: number, pad: string = '0'): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, pad)}`;
}
