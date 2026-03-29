/**
 * Date helpers for the habit grid (local calendar, Monday-start weeks).
 * Legacy localStorage keys (pre–API sync): habitV1_{encodeURIComponent(email)}_{YYYY-MM-DD}_{habitId}
 */
import { HABITS } from './habitConfig'

const HABIT_IDS = new Set(HABITS.map((h) => h.id))

export function storagePrefix(email) {
  const e = (email || '').trim().toLowerCase()
  return `habitV1_${encodeURIComponent(e)}_`
}

/**
 * @param {string} ymd
 * @returns {Date} local midnight
 */
export function parseYmd(ymd) {
  const [y, m, d] = ymd.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function formatYmd(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function isFutureYmd(dateStr, now = new Date()) {
  const t = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const d = parseYmd(dateStr).getTime()
  return d > t
}

export function isTodayYmd(dateStr, now = new Date()) {
  return formatYmd(now) === dateStr
}

/** Monday-start week containing `anchor` (local). */
export function startOfWeekMonday(anchor = new Date()) {
  const d = new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate())
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  return d
}

/** @returns {string[]} Mon..Sun as YYYY-MM-DD */
export function weekYmdsFromMonday(mondayDate) {
  const out = []
  for (let i = 0; i < 7; i++) {
    const x = new Date(mondayDate)
    x.setDate(mondayDate.getDate() + i)
    out.push(formatYmd(x))
  }
  return out
}

/** Export legacy flat keys → API cell map (YYYY-MM-DD_habitId). */
export function exportLegacyLocalCells(email) {
  const prefix = storagePrefix(email)
  const out = {}
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (!key || !key.startsWith(prefix)) continue
      const rest = key.slice(prefix.length)
      const m = /^(\d{4}-\d{2}-\d{2})_(.+)$/.exec(rest)
      if (!m) continue
      const [, dateStr, habitId] = m
      if (!HABIT_IDS.has(habitId)) continue
      const v = localStorage.getItem(key)
      if (v === 'done' || v === 'fail') out[`${dateStr}_${habitId}`] = v
    }
  } catch {
    /* ignore */
  }
  return out
}

export function clearLegacyLocalCells(email) {
  const prefix = storagePrefix(email)
  const toRemove = []
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith(prefix)) toRemove.push(key)
    }
    toRemove.forEach((k) => localStorage.removeItem(k))
  } catch {
    /* ignore */
  }
}
