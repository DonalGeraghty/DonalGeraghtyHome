import React, { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useHabitData } from '../context/HabitDataContext'
import { CATEGORY_LABELS, HABITS } from '../habits/habitConfig'
import {
  isFutureYmd,
  isTodayYmd,
  startOfWeekMonday,
  weekYmdsFromMonday,
} from '../habits/habitStorage'
import {
  computeBestStreakDays,
  computeCurrentStreakDays,
  financeHabitWeekRatio,
  mostMissedHabitInWeek,
  weekScore,
} from '../habits/habitStats'
import './HabitTracker.css'

function dayLabel(ymd) {
  const [y, m, d] = ymd.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString('en-IE', { weekday: 'short' })
}

function shortDate(ymd) {
  const [y, m, d] = ymd.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString('en-IE', { day: 'numeric', month: 'short' })
}

function HabitTracker() {
  const { user } = useAuth()
  const email = user?.email || ''
  const { cells, loading, error, saving, reload, cycleCell, getCell } = useHabitData()
  const [weekOffset, setWeekOffset] = useState(0)

  const now = new Date()
  const anchorDate = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    d.setDate(d.getDate() + weekOffset * 7)
    return d
  }, [weekOffset])

  const monday = useMemo(() => startOfWeekMonday(anchorDate), [anchorDate])
  const weekYmds = useMemo(() => weekYmdsFromMonday(monday), [monday])

  const handleCell = useCallback(
    (dateStr, habitId) => {
      if (!email || loading || isFutureYmd(dateStr)) return
      void cycleCell(dateStr, habitId)
    },
    [email, loading, cycleCell]
  )

  const { eligible, done, pct } = useMemo(
    () => weekScore(cells, weekYmds, now),
    [cells, weekYmds, now]
  )
  const bestStreak = useMemo(() => computeBestStreakDays(cells, now), [cells, now])
  const currentStreak = useMemo(() => computeCurrentStreakDays(cells, now), [cells, now])
  const { habit: missedTop, score: missedScore } = useMemo(
    () => mostMissedHabitInWeek(cells, weekYmds, now),
    [cells, weekYmds, now]
  )
  const financeRatio = useMemo(
    () => financeHabitWeekRatio(cells, weekYmds, now),
    [cells, weekYmds, now]
  )

  const motivation = useMemo(() => {
    const low = 150
    const high = 200
    const est = Math.round(low + (high - low) * financeRatio)
    return { est, financeRatio }
  }, [financeRatio])

  const weekTitle = useMemo(() => {
    const start = weekYmds[0]
    const end = weekYmds[6]
    const [y1, m1, d1] = start.split('-').map(Number)
    const [y2, m2, d2] = end.split('-').map(Number)
    const a = new Date(y1, m1 - 1, d1).toLocaleDateString('en-IE', {
      day: 'numeric',
      month: 'short',
    })
    const b = new Date(y2, m2 - 1, d2).toLocaleDateString('en-IE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    return `${a} – ${b}`
  }, [weekYmds])

  if (loading) {
    return (
      <main className="habit-page">
        <p className="habit-loading" role="status">
          Loading habits…
        </p>
      </main>
    )
  }

  return (
    <main className="habit-page">
      <div className="habit-inner">
        <header className="habit-header">
          <h1 className="habit-title">Habit tracker</h1>
          <p className="habit-sub">
            Dublin · daily log · synced to your account via Janus (Firestore)
          </p>
        </header>

        {error && (
          <div className="habit-error" role="alert">
            <span>{error}</span>
            <button type="button" className="habit-error-retry" onClick={() => reload()}>
              Retry
            </button>
          </div>
        )}

        {saving && <p className="habit-saving">Saving…</p>}

        <section className="habit-motivation" aria-label="Motivation">
          <p>
            Keeping the finance habits (Spar, weekly shop, Amazon, budget) on track can free roughly{' '}
            <strong>€150–200/month</strong> on groceries alone. This week your finance habits are at about{' '}
            <strong>{Math.round(motivation.financeRatio * 100)}%</strong> completion — roughly{' '}
            <strong>€{motivation.est}</strong>/month equivalent if you sustain that pace (illustrative).
          </p>
        </section>

        <div className="habit-week-nav">
          <button
            type="button"
            className="habit-nav-btn"
            onClick={() => setWeekOffset((o) => o - 1)}
            aria-label="Previous week"
          >
            ← Prev
          </button>
          <span className="habit-week-label">{weekTitle}</span>
          <button
            type="button"
            className="habit-nav-btn"
            onClick={() => setWeekOffset((o) => o + 1)}
            aria-label="Next week"
          >
            Next →
          </button>
          {weekOffset !== 0 && (
            <button type="button" className="habit-nav-btn habit-nav-today" onClick={() => setWeekOffset(0)}>
              This week
            </button>
          )}
        </div>

        <div className="habit-table-wrap">
          <table className="habit-grid" role="grid" aria-label="Weekly habits">
            <thead>
              <tr>
                <th scope="col" className="habit-col-habit">
                  Habit
                </th>
                {weekYmds.map((ymd) => {
                  const future = isFutureYmd(ymd)
                  const today = isTodayYmd(ymd, now)
                  return (
                    <th
                      key={ymd}
                      scope="col"
                      className={`habit-col-day ${future ? 'is-future' : ''} ${today ? 'is-today' : ''}`}
                    >
                      <span className="habit-day-name">{dayLabel(ymd)}</span>
                      <span className="habit-day-date">{shortDate(ymd)}</span>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {HABITS.map((h) => (
                <tr key={h.id}>
                  <th scope="row" className="habit-row-label">
                    <span className="habit-name">{h.label}</span>
                    <span className={`habit-cat habit-cat--${h.category}`}>
                      {CATEGORY_LABELS[h.category]}
                    </span>
                    <span className="habit-desc">{h.description}</span>
                  </th>
                  {weekYmds.map((ymd) => {
                    const future = isFutureYmd(ymd)
                    const state = getCell(ymd, h.id)
                    return (
                      <td key={ymd} className={future ? 'is-future' : ''}>
                        <button
                          type="button"
                          className={`habit-cell habit-cell--${state} ${isTodayYmd(ymd, now) ? 'is-today-cell' : ''}`}
                          disabled={future || !email}
                          onClick={() => handleCell(ymd, h.id)}
                          aria-label={`${h.label} on ${ymd}: ${state}`}
                          title={future ? 'Future day' : 'Tap: empty → done → missed → empty'}
                        >
                          <span className="habit-cell-inner" aria-hidden />
                        </button>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="habit-summary" aria-label="Week summary">
          <div className="habit-summary-grid">
            <div className="habit-stat">
              <span className="habit-stat-label">Week score</span>
              <strong className="habit-stat-value">{pct}%</strong>
            </div>
            <div className="habit-stat">
              <span className="habit-stat-label">Habits done</span>
              <strong className="habit-stat-value">
                {done}/{eligible}
              </strong>
            </div>
            <div className="habit-stat">
              <span className="habit-stat-label">Current streak</span>
              <strong className="habit-stat-value">{currentStreak}d</strong>
            </div>
            <div className="habit-stat">
              <span className="habit-stat-label">Best streak</span>
              <strong className="habit-stat-value">{bestStreak}d</strong>
            </div>
          </div>
          {missedTop && eligible > 0 && missedScore > 0 && (
            <p className="habit-missed-hint">
              Most to watch this week: <strong>{missedTop.label}</strong>
            </p>
          )}
        </section>

        <p className="habit-footnote">
          Stored under your user record in Firestore (field <code>habits_v1</code>). Signed in as {email}.{' '}
          <Link to="/month" className="habit-link">
            Month summary
          </Link>
        </p>
      </div>
    </main>
  )
}

export default HabitTracker
