import { HABITS } from './habitConfig'

const HABIT_IDS = new Set(HABITS.map((h) => h.id))

export function cellKey(dateStr, habitId) {
  return `${dateStr}_${habitId}`
}

/** @returns {'done' | 'fail' | 'none'} */
export function getCellFromCells(cells, dateStr, habitId) {
  if (!cells || !HABIT_IDS.has(habitId)) return 'none'
  const v = cells[cellKey(dateStr, habitId)]
  if (v === 'done' || v === 'fail') return v
  return 'none'
}

/** Build Map dateStr -> { habitId: state } for streak helpers. */
export function listDateHabitMapFromCells(cells) {
  const map = new Map()
  if (!cells || typeof cells !== 'object') return map
  for (const [k, v] of Object.entries(cells)) {
    const m = /^(\d{4}-\d{2}-\d{2})_(.+)$/.exec(k)
    if (!m) continue
    const [, dateStr, habitId] = m
    if (!HABIT_IDS.has(habitId)) continue
    if (v !== 'done' && v !== 'fail') continue
    if (!map.has(dateStr)) map.set(dateStr, {})
    map.get(dateStr)[habitId] = v
  }
  return map
}

export function isPerfectDay(dateStr, stateMap) {
  const day = stateMap.get(dateStr) || {}
  return HABITS.every((h) => day[h.id] === 'done')
}
