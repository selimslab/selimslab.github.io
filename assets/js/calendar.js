

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
