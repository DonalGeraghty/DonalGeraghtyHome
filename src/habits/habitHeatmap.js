import { getCellFromCells } from './habitCells'
import { formatYmd, isFutureYmd, parseYmd, startOfWeekMonday } from './habitStorage'

const DAY_MS = 86400000

/** @returns {Date} local midnight */
function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

/** Default activity chart window: trailing ~1 month (inclusive). */
export const CONTRIBUTION_DEFAULT_DAY_COUNT = 30

/**
 * Build GitHub-style grid: columns = weeks (Mon-first), rows = Mon..Sun.
 * Covers the last `dayCount` calendar days ending on `now` (inclusive), padded to full weeks.
 *
 * @returns {{
 *   columns: { ymd: string, row: number }[][],
 *   monthLabels: { colIndex: number, label: string }[],
 *   rangeStartYmd: string,
 *   rangeEndYmd: string,
 * }}
 */
export function buildContributionGrid(now = new Date(), dayCount = CONTRIBUTION_DEFAULT_DAY_COUNT) {
  const today = startOfDay(now)
  const rangeEndYmd = formatYmd(today)
  const rangeStart = new Date(today)
  rangeStart.setDate(rangeStart.getDate() - (dayCount - 1))
  const rangeStartYmd = formatYmd(rangeStart)

  const gridMonday = startOfWeekMonday(rangeStart)
  const endMonday = startOfWeekMonday(today)

  const columns = []
  const monthLabels = []
  let prevMonth = -1

  for (let t = gridMonday.getTime(); t <= endMonday.getTime(); t += 7 * DAY_MS) {
    const monday = new Date(t)
    const col = []
    for (let row = 0; row < 7; row++) {
      const d = new Date(monday)
      d.setDate(monday.getDate() + row)
      col.push({ ymd: formatYmd(d), row })
    }
    const colIndex = columns.length
    const monM = monday.getMonth()
    if (monM !== prevMonth) {
      const short = monday.toLocaleDateString('en-IE', { month: 'short' })
      monthLabels.push({
        colIndex,
        label: dayCount <= 31 ? short : short.slice(0, 1),
      })
      prevMonth = monM
    }
    columns.push(col)
  }

  return { columns, monthLabels, rangeStartYmd, rangeEndYmd }
}

/**
 * @param {'done' | 'fail' | 'none'} state
 * @param {boolean} isFuture
 * @param {boolean} beforeRange
 */
export function cellBucket(state, isFuture, beforeRange) {
  if (isFuture || beforeRange) return 'inactive'
  if (state === 'done') return 'done'
  if (state === 'fail') return 'fail'
  return 'empty'
}

/** Consecutive `done` days ending at ymd (only past/today). */
export function doneStreakEndingAt(cells, habitId, ymd, now = new Date()) {
  if (getCellFromCells(cells, ymd, habitId) !== 'done') return 0
  let streak = 0
  let d = parseYmd(ymd)
  while (true) {
    const cur = formatYmd(d)
    if (isFutureYmd(cur, now)) break
    if (getCellFromCells(cells, cur, habitId) !== 'done') break
    streak++
    d.setDate(d.getDate() - 1)
  }
  return streak
}

/**
 * Intensity 1–4 for done cells from streak length (GitHub-like depth).
 */
export function doneIntensityForCell(cells, habitId, ymd, now) {
  const streak = doneStreakEndingAt(cells, habitId, ymd, now)
  if (streak <= 0) return 1
  return Math.min(4, streak)
}

export function computeHabitYearMetrics(cells, habitId, rangeStartYmd, rangeEndYmd, now = new Date()) {
  const start = parseYmd(rangeStartYmd)
  const end = parseYmd(rangeEndYmd)

  let totalDone = 0
  const monthDone = new Map()
  let longest = 0
  let run = 0
  let current = 0

  /** @type {string | null} */
  let peakDoneYmd = null
  let peakStreakAtDay = 0

  for (let t = start.getTime(); t <= end.getTime(); t += DAY_MS) {
    const ymd = formatYmd(new Date(t))
    const s = getCellFromCells(cells, ymd, habitId)
    if (s === 'done') {
      totalDone++
      const d = new Date(t)
      const mk = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      monthDone.set(mk, (monthDone.get(mk) || 0) + 1)
      run++
      if (run > longest) longest = run
      const streakEnd = doneStreakEndingAt(cells, habitId, ymd, now)
      if (streakEnd > peakStreakAtDay || (streakEnd === peakStreakAtDay && ymd > (peakDoneYmd || ''))) {
        peakStreakAtDay = streakEnd
        peakDoneYmd = ymd
      }
    } else {
      run = 0
    }
  }

  // current streak: walk back from today
  for (let i = 0; i < 800; i++) {
    const d = new Date(end)
    d.setDate(end.getDate() - i)
    const ymd = formatYmd(d)
    if (ymd < rangeStartYmd) break
    if (getCellFromCells(cells, ymd, habitId) === 'done') current++
    else break
  }

  let bestMonthKey = null
  let bestMonthCount = -1
  for (const [mk, c] of monthDone) {
    if (c > bestMonthCount) {
      bestMonthCount = c
      bestMonthKey = mk
    }
  }

  let mostActiveMonthLabel = '—'
  if (bestMonthKey && bestMonthCount > 0) {
    const [y, m] = bestMonthKey.split('-').map(Number)
    mostActiveMonthLabel = new Date(y, m - 1, 1).toLocaleDateString('en-IE', { month: 'long' })
  }

  let mostActiveDayLabel = '—'
  if (peakDoneYmd && totalDone > 0) {
    const [yy, mm, dd] = peakDoneYmd.split('-').map(Number)
    mostActiveDayLabel = new Date(yy, mm - 1, dd).toLocaleDateString('en-IE', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return {
    totalDone,
    mostActiveMonthLabel,
    mostActiveDayLabel,
    longestStreakDays: longest,
    currentStreakDays: current,
  }
}
