export const generateHours = (start: number, end: number, interval: number): string[] => {
    const padZero = (num: number): string => num < 10 ? `0${num}` : `${num}`;

    const hours: string[] = [];

    for (let h = start; h <= end; h++) {
        for (let m of [0, interval]) {
            hours.push(`${padZero(h)}:${padZero(m)}`);
        }
    }

    return hours;
}