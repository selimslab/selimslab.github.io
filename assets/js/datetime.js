

const day_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function get_todays_date() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date()
    return today.toLocaleDateString(undefined, options)
}

function get_the_weekday(date) {
    return day_names[date.getDay()]
}

function get_the_first_day_of_this_year() {
    var d = new Date(new Date().getFullYear(), 0, 1);
    return get_the_weekday(d)
}

function get_the_last_day_of_this_year() {
    var d = new Date(new Date().getFullYear(), 11, 31);
    return get_the_weekday(d)
}

function render_year_progress() {

    const today = moment();
    const currentDayOfYear = today.dayOfYear();

    // Update displays
    document.querySelector("#date").innerHTML = today.format('dddd, MMMM DD');
    document.querySelector("#year-ratio").innerHTML = `Day ${currentDayOfYear}`;
    document.querySelector("#weekNumber").innerHTML = `Week ${today.isoWeek()}`;
    document.querySelector("#year-percent").innerHTML = `%${Math.round((currentDayOfYear / 365) * 100)}`;
    document.querySelector("#current-year").innerHTML = `${today.year()}`;

    // Clock update
    function updateClock() {
        const now = new Date();
        document.getElementById('clock').textContent =
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

  // DOM element creation functions
  function createFillerElement() {
    const filler = document.createElement("li");
    filler.classList.add("filler");
    return filler;
  }

  function createDayElement(year, month, day, weekendDays) {
    const dayElement = document.createElement("li");

    // Add day type class
    if (weekendDays.includes(day)) {
      dayElement.classList.add("weekend");
    } else {
      dayElement.classList.add("weekday");
    }

    // Add state classes
    if (isToday(year, month, day)) {
      dayElement.classList.add("now");
    } else if (isPastDay(year, month, day)) {
      dayElement.classList.add("past");
    }

    return dayElement;
  }

  function createMonthTitleElement(monthName) {
    const monthTitle = document.createElement("div");
    monthTitle.classList.add("month-title");
    monthTitle.textContent = monthName;
    return monthTitle;
  }

  function createDaysContainer() {
    const daysContainer = document.createElement("ul");
    daysContainer.classList.add("days");
    return daysContainer;
  }

  function createMonthContainer() {
    return document.createElement("div");
  }

  // Container manipulation functions
  function clearContainer(container) {
    container.innerHTML = '';
  }

  function addFillerDays(container, count) {
    for (let i = 0; i < count; i++) {
      container.appendChild(createFillerElement());
    }
  }

  function getTrailingFillerCount(firstDayOfMonth, daysInMonth) {
    const totalCells = 7 * Math.ceil((firstDayOfMonth + daysInMonth) / 7);
    return totalCells - firstDayOfMonth - daysInMonth;
  }

  // Core rendering functions
  function renderMonthCalendar(container, month, year) {
    const daysInMonth = getDaysInMonth(year, month);
    const weekendDays = getWeekendDays(year, month, daysInMonth);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    // Add leading filler days
    addFillerDays(container, firstDayOfMonth);

    // Add calendar days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = createDayElement(year, month, day, weekendDays);
      container.appendChild(dayElement);
    }

    // Add trailing filler days
    const fillersNeeded = getTrailingFillerCount(firstDayOfMonth, daysInMonth);
    addFillerDays(container, fillersNeeded);
  }

  function renderMonthBlock(month, year, monthNames) {
    const monthContainer = createMonthContainer();
    monthContainer.classList.add("month-container");

    const monthTitle = createMonthTitleElement(monthNames[month]);
    monthContainer.appendChild(monthTitle);

    const daysContainer = createDaysContainer();
    monthContainer.appendChild(daysContainer);

    renderMonthCalendar(daysContainer, month, year);

    return monthContainer;
  }

  // Public API functions
  function renderCalendar(container) {
    const today = moment();
    const currentYear = today.year();
    const monthNames = moment.monthsShort();

    clearContainer(container);

    // Create each month
    for (let month = 0; month < 12; month++) {
      const monthBlock = renderMonthBlock(month, currentYear, monthNames);
      container.appendChild(monthBlock);
    }
  }

  function renderSingleMonthCalendar(container, month, year) {
    const today = moment();
    month = month !== undefined ? month : today.month();
    year = year !== undefined ? year : today.year();

    clearContainer(container);
    renderMonthCalendar(container, month, year);
  }

