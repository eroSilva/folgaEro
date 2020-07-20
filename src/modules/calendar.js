/** Data atual do sistema */
const systemDate = new Date()

/** Armazenando informações do calendário que serão utilziadas com frequência */
const calendarSettings = {
  dateMain: {
    full: systemDate,
    year: systemDate.getUTCFullYear(),
    month: systemDate.getUTCMonth(),
  },
  dateSelected: {},
  lastDayOff: new Date(2018, 9, 6),
  allDayOffYear: [],
  elements: {
    calendarContainer: document.querySelector('#calendar'),
    calendarMonthYearButton: document.querySelector('#calendarMonthYear'),
    calendarControls: document.querySelector('#calendarControls'),
    calendarMonthDays: document.querySelector('#calendarMonthDays'),
    calendarMonthItem: document.querySelectorAll('#calendarControls .month'),
    calendarYears: document.querySelector('#calendarYears'),
  },
}

/**
 * Função para pegar o nome do mês
 * @param {date} date - Data de referência
 */
const getMonthName = date => {
  return date.toLocaleString('pt-br', { month: 'long' })
}

/**
 * Função para pegar o nome do dia
 * @param {date} date - Data de referência
 */
const getDayOfWeekName = date => {
  return date.toLocaleString('pt-br', { weekday: 'long' })
}

/**
 * Função para pegar o último dia do mês
 * @param {number} year - Ano de referência
 * @param {number} month - Mês de referência
 */
const getLastDayOfMonth = (year, month) => {
  let dateReference = [year, month + 1, 0]

  if (month < 0) dateReference = [year - 1, 12, 0]
  else if (month > 12) dateReference = [year + 1, 1, 0]

  return new Date(...dateReference).getUTCDate()
}

/**
 * Função para pegar os dias que faltam para fechar uma semana completa (no final do mês)
 * @param {number} lastDay - Último dia do mês para controlar o laço de dias que faltam para completar a semana
 */
const getEndDaysOfCalendar = lastDay => {
  const leftDays = []
  let i

  for (i = lastDay + 1; i <= 6; i++) {
    leftDays.push(i)
  }

  return leftDays
}

/**
 * Função para pegar os dias que faltam para fechar uma semana completa (no início do mês)
 * @param {number} fisrtDay - Primeiro dia do mês para controlar o laço de dias que faltam para completar a semana
 */
const getStartDaysOfCalendar = firsDay => {
  const leftDays = []
  let i

  for (i = firsDay - 1; i >= 0; i--) {
    leftDays.push(i)
  }

  return leftDays
}

/**
 * Função para pegar todos os dias do mês
 * @param {number} year - Ano de referência
 * @param {number} month - Mês de referência
 */
const getAllDaysOfMonth = (year, month) => {
  const daysOfMonth = []
  let i

  for (i = 1; i <= getLastDayOfMonth(year, month); i++) {
    const dateMonth = new Date(year, month, i)

    daysOfMonth.push({
      date: dateMonth,
      number: i,
      week: dateMonth.getUTCDay(),
      name: getDayOfWeekName(dateMonth),
    })
  }

  return daysOfMonth
}

/**
 * Função para identificar no HTML os dias que não pertencem a um mês específico
 * @param {array} days - Dias para marcar no HTML
 */
const setOutOfMonth = (...days) => {
  ;[...days].forEach(dayObject => {
    dayObject.map(day => (day.outOfMonth = true))
  })

  return [...days]
}

/**
 * Função para identificar no HTML o mês selecionado
 * @param {number} month - Mês de referência
 */
const setSelectedMonth = month => {
  calendarSettings.elements.calendarMonthItem.forEach(monthItem => {
    monthItem.classList.remove('selected')
  })
  calendarSettings.elements.calendarMonthItem[month].classList.add('selected')
}

/**
 * Função para identificar no HTML o ano selecionado
 * @param {number} year - Ano de referência
 */
const setYearOfCalendar = year => {
  return [year - 2, year - 1, year, year + 1, year + 2]
}

/**
 * Função para calcular todas as folgas anteriores a última folga registrada
 * @param {date} lastDayOff - Data da última folga registrada
 * @param {number} year - Ano de referência
 */
const setStartDayOffs = (lastDayOff, year) => {
  const dayOffDate = {
    year: lastDayOff.getUTCFullYear(),
    month: lastDayOff.getUTCMonth(),
    date: lastDayOff.getUTCDate() - 6,
  }

  if (year <= dayOffDate.year) {
    const prevDayOff = new Date(
      dayOffDate.year,
      dayOffDate.month,
      dayOffDate.date,
    )

    calendarSettings.allDayOffYear.unshift(prevDayOff)
    setStartDayOffs(prevDayOff, year)
  }
}

/**
 * Função para calcular todas as próximas folgas a partir da última folga registrada
 * @param {date} lastDayOff - Data da última folga registrada
 * @param {number} year - Ano de referência
 */
const setEndDayOffs = (lastDayOff, year) => {
  const dayOffDate = {
    year: lastDayOff.getUTCFullYear(),
    month: lastDayOff.getUTCMonth(),
    date: lastDayOff.getUTCDate() + 6,
  }

  if (year >= dayOffDate.year) {
    const prevDayOff = new Date(
      dayOffDate.year,
      dayOffDate.month,
      dayOffDate.date,
    )

    calendarSettings.allDayOffYear.push(prevDayOff)
    setEndDayOffs(prevDayOff, year)
  }
}

const getDayOffsOfMonth = month => {
  return calendarSettings.allDayOffYear.filter(
    dayOff =>
      dayOff.getUTCMonth() >= month - 1 && dayOff.getUTCMonth() <= month + 1,
  )
}

/**
 * Função que monta um array com todas as folgas do Ano, passadas e próximas
 * @param {array} days - Todos os dias de folga até ou a partir do ano da última folga registrada
 */
const setDayOffsCalendar = (days, year, month) => {
  calendarSettings.allDayOffYear = [calendarSettings.lastDayOff]

  setStartDayOffs(calendarSettings.lastDayOff, year)
  setEndDayOffs(calendarSettings.lastDayOff, year)

  const monthDayOffs = getDayOffsOfMonth(month)

  const dayWithDayOffs = days.map(day => {
    monthDayOffs.forEach(dayOff => {
      if (dayOff.getTime() == day.date.getTime()) {
        day.dayOff = true
      }
    })

    return day
  })

  return dayWithDayOffs
}

/**
 * Função para pegar todos os dias do mês, incluíndo os dias que faltam para fechar uma semana completa.
 * @param {number} year - Ano de referência
 * @param {number} month - Mês de referência
 */
const getAllDaysOfCalendar = (year, month) => {
  const arrayOfDays = getAllDaysOfMonth(year, month)
  const arrayNextDays = getAllDaysOfMonth(year, month + 1)
  const arrayPrevDays = getAllDaysOfMonth(year, month - 1)
  const arrayNextDaysSliced = arrayNextDays.filter(
    (e, i) =>
      i < getEndDaysOfCalendar(arrayOfDays[arrayOfDays.length - 1].week).length,
  )
  const arrayPrevDaysSliced = arrayPrevDays
    .reverse()
    .filter((e, i) => i < getStartDaysOfCalendar(arrayOfDays[0].week).length)

  setOutOfMonth(arrayNextDaysSliced, arrayPrevDaysSliced)

  const arrayAllDays = arrayOfDays
    .reverse()
    .concat(arrayPrevDaysSliced)
    .reverse()
    .concat(arrayNextDaysSliced)

  return setDayOffsCalendar(arrayAllDays, year, month)
}

/** Função que seta classe no HTML para abrir os controle do calendário */
const openCalendarControls = () => {
  calendarSettings.elements.calendarControls.classList.add('open')
  calendarSettings.elements.calendarContainer.classList.add('months-open')
}

/** Função que seta classe no HTML para fechar os controle do calendário */
const closeCalendarControls = () => {
  calendarSettings.elements.calendarControls.classList.remove('open')
  calendarSettings.elements.calendarContainer.classList.remove('months-open')
}

/**
 * Função para renderizar os elementos do calendário no HTML
 * @param {number} year - Ano de referência
 * @param {number} month - Mês de referência
 */
const htmlCalendarRender = (year, month) => {
  const monthDays = getAllDaysOfCalendar(year, month)
  const years = setYearOfCalendar(year)
  const targetMonthYear = [
    ...calendarSettings.elements.calendarMonthYearButton.children,
  ]
  const targetMonthDays = calendarSettings.elements.calendarMonthDays
  const targetYears = calendarSettings.elements.calendarYears

  const isOutOfMont = outOfMonth => (outOfMonth ? ' out' : '')
  const isDayOff = dayOff => (dayOff ? ' day-off' : '')
  const setDayClass = (outOfMonth, dayOff) =>
    `${isOutOfMont(outOfMonth)} ${isDayOff(dayOff)}`

  setSelectedMonth(month)

  targetYears.innerHTML = years
    .map(yearItem => {
      return `<li class="year ${
        yearItem == year ? 'selected' : ''
      }" tabindex="0"> ${yearItem} </li>`
    })
    .join('')

  targetMonthYear.map(child =>
    child.classList.contains('year')
      ? (child.innerHTML = year)
      : (child.innerHTML = getMonthName(new Date(year, month + 1, 0))),
  )

  targetMonthDays.innerHTML = monthDays
    .map(day => {
      return `
            <li class="month-day${setDayClass(
              day.outOfMonth,
              day.dayOff,
            )}" tabindex="0">
                <span class="month-day__number">${day.number}</span>
                <span class="month-day__name">${day.name}</span>
            </li>
        `
    })
    .join('')

  calendarSettings.dateSelected = {
    full: new Date(year, month, 0),
    year,
    month,
  }
}

const calendar = () => {
  /** Renderizando calendário do mês corrente */
  htmlCalendarRender(
    calendarSettings.dateMain.year,
    calendarSettings.dateMain.month,
  )

  /** Atribuindo funcionalidades ao calendário */
  calendarSettings.elements.calendarMonthYearButton.addEventListener(
    'click',
    openCalendarControls,
  )

  calendarSettings.elements.calendarMonthItem.forEach(
    (monthItem, monthIndex) => {
      monthItem.addEventListener('click', () => {
        calendarSettings.dateMain.month = monthIndex

        closeCalendarControls()
        htmlCalendarRender(
          calendarSettings.dateMain.year,
          calendarSettings.dateMain.month,
        )
      })
    },
  )

  calendarSettings.elements.calendarYears.addEventListener('click', event => {
    calendarSettings.dateMain.year = parseInt(event.target.innerText, 10)

    closeCalendarControls()
    htmlCalendarRender(
      calendarSettings.dateMain.year,
      calendarSettings.dateMain.month,
    )
  })
}

export { calendar }
