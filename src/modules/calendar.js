// Informações do calendário
const DateMain = new Date();

const CalendarElements = {
    calendarContainer   : document.querySelector('#calendar'),
    calendarMonthButton : document.querySelector('#calendarMonth'),
    calendarControls    : document.querySelector('#calendarControls'),
    calendarMonthDays   : document.querySelector('#calendarMonthDays'),
    calendarMonthItem   : document.querySelectorAll('#calendarControls .month'),
}

const getMonthName = (date) => {
    return date.toLocaleString('pt-br', {month:'long'});
};

const getDayOfWeekName = (date) => {
    return date.toLocaleString('pt-br', {weekday:'long'});
}

const getLastDayOfMonth = (year, month) => {
    return (month > 12 || month < 0) ?  false : new Date(year, month, 0).getUTCDate();
}

const getEndDaysOfCalendar = (lastDay) => {
    const leftDays = [];
    let i;

    for(i=lastDay+1; i<= 6; i++){
        leftDays.push(i);
    }

    return leftDays;
}

const getStartDaysOfCalendar = (firsDay) => {
    const leftDays = [];
    let i;

    for(i=firsDay-1; i>=0; i--){
        leftDays.push(i);
    }

    return leftDays;
}

const getAllDaysOfMonth = (year, month) => {
    const daysOfMonth = [];
    let i;

    for(i = 1; i <= getLastDayOfMonth(year, month); i++) {
        const dateMonth = new Date(year, month - 1, i);

        daysOfMonth.push({
            dayTo: i,
            day: dateMonth.getUTCDay(),
            name: getDayOfWeekName(dateMonth)
        });
    }

    return daysOfMonth;
}

const setOutOfMonth = (...days) => {
    [...days].map((dayObject) => {
        dayObject.map((day) => day.outOfMonth = true);
    });

    return [...days];
}

const getAllDaysOfCalendar = (year, month) => {
    const arrayOfDays = getAllDaysOfMonth(year, month);
    const arrayNextDays = getAllDaysOfMonth(year, month+1);
    const arrayPrevDays = getAllDaysOfMonth(year, month-1);
    const arrayNextDaysSliced = arrayNextDays.filter((e,i) => i < getEndDaysOfCalendar(arrayOfDays[arrayOfDays.length - 1].day).length);
    const arrayPrevDaysSliced = arrayPrevDays.reverse().filter((e,i) => i < getStartDaysOfCalendar(arrayOfDays[0].day).length);

    setOutOfMonth(arrayNextDaysSliced, arrayPrevDaysSliced);

    return arrayOfDays.reverse().concat(arrayPrevDaysSliced).reverse().concat(arrayNextDaysSliced);
}

const htmlCalendarRender = (dayMonth, month) => {
    const targetMonth = CalendarElements.calendarMonthButton;
    const targetMonthDays = CalendarElements.calendarMonthDays;

    targetMonth.innerHTML = getMonthName(new Date(startYear, month+1, 0));

    targetMonthDays.innerHTML = dayMonth.map((day) => {
        return `
            <li class="month-day${(day.outOfMonth) ? ' out' : ''}" tabindex="0">
                <span class="month-day__number">${day.dayTo}</span>
                <span class="month-day__name">${day.name}</span>
            </li>
        `
    }).join('');
}


// Pegando mês e ano corrente
const startYear = DateMain.getUTCFullYear();
const startMonth = DateMain.getUTCMonth();


// Renderizando o calendário do mês corrente
htmlCalendarRender(getAllDaysOfCalendar(startYear, startMonth), startMonth);


// Atribuindo funcionalidades ao calendário
CalendarElements.calendarMonthButton.addEventListener('click', () => {
    CalendarElements.calendarControls.classList.add('open');
    CalendarElements.calendarContainer.classList.add('months-open');
});

CalendarElements.calendarMonthItem.forEach((monthItem, monthIndex) => {
    monthItem.addEventListener('click', () => {
        CalendarElements.calendarControls.classList.remove('open');
        CalendarElements.calendarContainer.classList.remove('months-open');

        htmlCalendarRender(getAllDaysOfCalendar(startYear, monthIndex), monthIndex);
    });
});
