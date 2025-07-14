export function formatSeconds(seconds: number, pad: string = '0'): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, pad)}`;
}

export function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

export function convertFromGoogleSheetsDateString(dateString: string): Date | null {
    console.log(dateString);
    // Match the Date string pattern "Date(year, month, day)"
    const regex = /Date\((\d{4}),(\d{1,2}),(\d{1,2})\)/;
    const matches = dateString.match(regex);

    if (matches) {
        const year = parseInt(matches[1], 10);
        const month = parseInt(matches[2], 10);  // Month is 0-based in JavaScript
        const day = parseInt(matches[3], 10);

        // Return a new Date object
        return new Date(year, month, day);
    } else {
        // Return null if the string doesn't match the Date format
        console.error("Invalid date string format");
        return null;
    }
}

export function formatPercent(value: number, figures?: number): string {
    let sigFig = figures ? figures : 2;
    return `${(value * 100).toFixed(sigFig)}%`
}
