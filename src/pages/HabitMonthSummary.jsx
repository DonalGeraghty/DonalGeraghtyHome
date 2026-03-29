import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHabitData } from '../context/HabitDataContext'
import { monthWeeks, weekScore } from '../habits/habitStats'
import './HabitMonthSummary.css'

function HabitMonthSummary() {
  const { cells, habits, loading } = useHabitData()
  const now = new Date()
  const [cursor, setCursor] = useState(() => new Date(now.getFullYear(), now.getMonth(), 1))

  const year = cursor.getFullYear()
  const monthIndex = cursor.getMonth()
  const label = cursor.toLocaleDateString('en-IE', { month: 'long', year: 'numeric' })

  const weeks = useMemo(() => monthWeeks(year, monthIndex), [year, monthIndex])

  const rows = useMemo(() => {
    return weeks.map((w, i) => {
      const { pct, done, eligible } = weekScore(cells, w.ymds, habits, now)
      const start = w.ymds[0]
      const end = w.ymds[6]
      return { key: `${start}_${i}`, start, end, pct, done, eligible }
    })
  }, [weeks, cells, habits, now])

  const monthAvg = useMemo(() => {
    if (!rows.length) return 0
    const sum = rows.reduce((a, r) => a + r.pct, 0)
    return Math.round(sum / rows.length)
  }, [rows])

  return (
    <main className="habit-month-page">
      <div className="habit-month-inner">
        <header className="habit-month-header">
          <h1 className="habit-month-title">Month summary</h1>
          <Link to="/" className="habit-month-back">
            ← Week view
          </Link>
        </header>

        {loading && (
          <p className="habit-month-loading" role="status">
            Loading habits…
          </p>
        )}

        <div className="habit-month-nav">
          <button
            type="button"
            className="habit-month-nav-btn"
            onClick={() => setCursor(new Date(year, monthIndex - 1, 1))}
          >
            ← Prev month
          </button>
          <span className="habit-month-label">{label}</span>
          <button
            type="button"
            className="habit-month-nav-btn"
            onClick={() => setCursor(new Date(year, monthIndex + 1, 1))}
          >
            Next month →
          </button>
        </div>

        <p className="habit-month-avg">
          Month average (by week): <strong>{monthAvg}%</strong>
        </p>

        <table className="habit-month-table">
          <thead>
            <tr>
              <th scope="col">Week (Mon–Sun)</th>
              <th scope="col">Score</th>
              <th scope="col">Done</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key}>
                <td>
                  {r.start} → {r.end}
                </td>
                <td>{r.pct}%</td>
                <td>
                  {r.done}/{r.eligible}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="habit-month-note">
          Scores only count days on or before today in each week. Data is synced to your account on the Janus API.
        </p>
      </div>
    </main>
  )
}

export default HabitMonthSummary
