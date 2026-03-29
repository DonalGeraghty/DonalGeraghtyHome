import { HABITS } from './habitConfig'
import {
  getCellFromCells,
  isPerfectDay,
  listDateHabitMapFromCells,
} from './habitCells'
import { formatYmd, isFutureYmd, parseYmd, startOfWeekMonday, weekYmdsFromMonday } from './habitStorage'

/**
 * Weekly grid stats: only past + today cells count (not future).
 * @param {Record<string, string>} cells
 * @param {string[]} weekYmds Mon..Sun
 */
export function weekScore(cells, weekYmds, now = new Date()) {
  let eligible = 0
  let done = 0
  for (const ymd of weekYmds) {
    if (isFutureYmd(ymd, now)) continue
    for (const h of HABITS) {
      eligible++
      if (getCellFromCells(cells, ymd, h.id) === 'done') done++
    }
  }
  const pct = eligible === 0 ? 100 : Math.round((done / eligible) * 100)
  return { eligible, done, pct }
}

/** Most "missed" in week: weighted fail > none on past days. */
export function mostMissedHabitInWeek(cells, weekYmds, now = new Date()) {
  const counts = Object.fromEntries(HABITS.map((h) => [h.id, 0]))
  for (const ymd of weekYmds) {
    if (isFutureYmd(ymd, now)) continue
    for (const h of HABITS) {
      const s = getCellFromCells(cells, ymd, h.id)
      if (s === 'fail') counts[h.id] += 2
      else if (s === 'none') counts[h.id] += 1
    }
  }
  let bestId = HABITS[0].id
  let best = -1
  for (const h of HABITS) {
    if (counts[h.id] > best) {
      best = counts[h.id]
      bestId = h.id
    }
  }
  const habit = HABITS.find((x) => x.id === bestId)
  return { habit, score: best }
}

/**
 * Longest run of consecutive calendar days where all habits done (from 2026-01-01 through `upTo`).
 */
export function computeBestStreakDays(cells, upTo = new Date()) {
  const stateMap = listDateHabitMapFromCells(cells)
  const end = new Date(upTo.getFullYear(), upTo.getMonth(), upTo.getDate())
  const start = new Date(2026, 0, 1)
  let best = 0
  let run = 0
  for (let t = start.getTime(); t <= end.getTime(); t += 86400000) {
    const d = new Date(t)
    const ymd = formatYmd(d)
    if (isPerfectDay(ymd, stateMap)) {
      run++
      if (run > best) best = run
    } else {
      run = 0
    }
  }
  return best
}

export function computeCurrentStreakDays(cells, now = new Date()) {
  const stateMap = listDateHabitMapFromCells(cells)
  let run = 0
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  for (let i = 0; i < 400; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const ymd = formatYmd(d)
    if (isPerfectDay(ymd, stateMap)) run++
    else break
  }
  return run
}

/** Finance habits weekly done ratio (0–1) for motivation copy. */
export function financeHabitWeekRatio(cells, weekYmds, now = new Date()) {
  const financeIds = HABITS.filter((h) => h.category === 'finance').map((h) => h.id)
  let eligible = 0
  let done = 0
  for (const ymd of weekYmds) {
    if (isFutureYmd(ymd, now)) continue
    for (const id of financeIds) {
      eligible++
      if (getCellFromCells(cells, ymd, id) === 'done') done++
    }
  }
  return eligible === 0 ? 1 : done / eligible
}

/** Weeks (Monday start) that overlap the given calendar month. */
export function monthWeeks(year, monthIndex) {
  const first = new Date(year, monthIndex, 1)
  const last = new Date(year, monthIndex + 1, 0)
  const weeks = []
  let mon = startOfWeekMonday(first)
  while (mon <= last) {
    const ymds = weekYmdsFromMonday(mon)
    const touches = ymds.some((y) => {
      const d = parseYmd(y)
      return d >= first && d <= last
    })
    if (touches) weeks.push({ monday: new Date(mon), ymds })
    const next = new Date(mon)
    next.setDate(next.getDate() + 7)
    mon = next
  }
  return weeks
}
