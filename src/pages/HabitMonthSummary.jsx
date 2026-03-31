import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import HabitContributionChart from '../components/HabitContributionChart'
import { useHabitData } from '../context/HabitDataContext'
import './HabitMonthSummary.css'

function HabitMonthSummary() {
  const { cells, habits, loading } = useHabitData()
  const [now] = useState(() => new Date())

  return (
    <main className="habit-month-page">
      <div className="habit-month-inner">
        <header className="habit-month-header">
          <h1 className="habit-month-title">Activity</h1>
          <Link to="/" className="habit-month-back">
            ← Week view
          </Link>
        </header>

        {loading && (
          <p className="habit-month-loading" role="status">
            Loading habits…
          </p>
        )}

        <p className="habit-month-lead">
          Last <strong>365 days</strong> per habit — same layout as a contribution graph (darker squares are fewer
          completions; greens scale with streak length). Orange is a logged miss.
        </p>

        {!loading && habits.length === 0 && (
          <p className="habit-month-empty">
            No habits yet. Add some from the week view, then your graphs will show up here.
          </p>
        )}

        {!loading &&
          habits.map((h) => (
            <HabitContributionChart key={h.id} habit={h} cells={cells} now={now} />
          ))}

        <p className="habit-month-note">
          Synced to your account via the Janus API. Past days with no cell are shown as empty (not the same as a miss).
        </p>
      </div>
    </main>
  )
}

export default HabitMonthSummary
