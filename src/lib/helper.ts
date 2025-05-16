export function formatDate(
    date: Date | string,
    locale: string = 'id-ID',
    options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString(locale, options);
}


export function getDayName(
    date: Date | string,
    locale: string = 'id-ID'
): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString(locale, { weekday: 'long' });
}

export function getHourMinute(
    date: Date | string,
    locale: string = 'id-ID'
): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', hour12: false });
}