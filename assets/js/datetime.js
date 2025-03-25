const day_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function get_formatted_date(date = new Date(), options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) {
    return date.toLocaleDateString(undefined, options);
}

function get_weekday(date = new Date()) {
    return day_names[date.getDay()];
}

function get_date_for_year_day(year = new Date().getFullYear(), month = 0, day = 1) {
    return new Date(year, month, day);
}

function get_todays_date() {
    return get_formatted_date();
}

function get_the_weekday(date) {
    return get_weekday(date);
}

function get_the_first_day_of_this_year() {
    const d = get_date_for_year_day();
    return get_weekday(d);
}

function get_the_last_day_of_this_year() {
    const d = get_date_for_year_day(new Date().getFullYear(), 11, 31);
    return get_weekday(d);
}

function show_date_and_time() {

    const today = moment();

    document.querySelector("#current-date").innerHTML = today.format('dddd, MMMM DD');

    function updateClock() {
        const now = new Date();
        document.getElementById('current-time').textContent =
            `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    }

    setInterval(updateClock, 1000);
    updateClock();
}

function getDaysInMonth(year, month) {
    return moment({ year, month }).daysInMonth();
  }

  function getWeekendDays(year, month, daysInMonth) {
    const weekendDays = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = moment({ year, month, day });
      if (isWeekend(date)) {
        weekendDays.push(day);
      }
    }
    return weekendDays;
  }

  function isWeekend(date) {
    const dayOfWeek = date.day();
    return dayOfWeek === 0 || dayOfWeek === 6; // Sunday (0) or Saturday (6)
  }

  function getFirstDayOfMonth(year, month) {
    // Convert from 0-based (Sunday) to 1-based (Monday) week
    const sunBasedDay = moment({ year, month, day: 1 }).day();
    return (sunBasedDay + 6) % 7; // Transform Sunday=0 to Sunday=6
  }

  function isPastDay(year, month, day) {
    const today = moment();
    const currentYear = today.year();
    const currentDayOfYear = today.dayOfYear();

    const thisDate = moment({ year, month, day });
    const dayOfYear = thisDate.dayOfYear();

    return (year < currentYear) ||
      (year === currentYear && dayOfYear < currentDayOfYear);
  }

  function isToday(year, month, day) {
    const today = moment();
    return day === today.date() &&
      month === today.month() &&
      year === today.year();
  }


