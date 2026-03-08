
declare const moment: any;
declare const day_names: string[];

function get_formatted_date(date = new Date(), options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }): string {
    return date.toLocaleDateString(undefined, options);
}

function get_weekday(date = new Date()): string {
    return day_names[date.getDay()];
}

function get_date_for_year_day(year = new Date().getFullYear(), month = 0, day = 1): Date {
    return new Date(year, month, day);
}

function get_todays_date(): string {
    return get_formatted_date();
}

function get_the_weekday(date: Date): string {
    return get_weekday(date);
}

function get_the_first_day_of_this_year(): string {
    const d = get_date_for_year_day();
    return get_weekday(d);
}

function get_the_last_day_of_this_year(): string {
    const d = get_date_for_year_day(new Date().getFullYear(), 11, 31);
    return get_weekday(d);
}

function get_sunrise_and_sunset(): void {

}

function show_date(): void {

    const today = moment();
    document.getElementById('current-date')!.innerHTML = today.format('ddd MMM DD');

}

function show_time(): void{
    function updateClock(): void {
        const now = new Date();
        document.getElementById('current-time')!.textContent =
            `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    }

    setInterval(updateClock, 1000);
    updateClock();
}

function getDaysInMonth(year: number, month: number): number {
    return moment({ year, month }).daysInMonth();
}

function getWeekendDays(year: number, month: number, daysInMonth: number): number[] {
    const weekendDays: number[] = [];
    for (let day = 1; day <= daysInMonth; day++) {
        const date = moment({ year, month, day });
        if (isWeekend(date)) {
            weekendDays.push(day);
        }
    }
    return weekendDays;
}

function isWeekend(date: any): boolean {
    const dayOfWeek = date.day();
    return dayOfWeek === 0 || dayOfWeek === 6; // Sunday (0) or Saturday (6)
}

function getFirstDayOfMonth(year: number, month: number): number {
    // Convert from 0-based (Sunday) to 1-based (Monday) week
    const sunBasedDay = moment({ year, month, day: 1 }).day();
    return (sunBasedDay + 6) % 7; // Transform Sunday=0 to Sunday=6
}

function isPastDay(year: number, month: number, day: number): boolean {
    const today = moment();
    const currentYear = today.year();
    const currentDayOfYear = today.dayOfYear();

    const thisDate = moment({ year, month, day });
    const dayOfYear = thisDate.dayOfYear();

    return (year < currentYear) ||
        (year === currentYear && dayOfYear < currentDayOfYear);
}

function isToday(year: number, month: number, day: number): boolean {
    const today = moment();
    return day === today.date() &&
        month === today.month() &&
        year === today.year();
}
