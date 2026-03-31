import React from 'react'
import { Link } from 'react-router-dom'
import './HubPage.css'

function Fitness() {
  return (
    <main className="hub-page">
      <div className="hub-inner">
        <header className="hub-header">
          <h1 className="hub-title">Fitness</h1>
          <p className="hub-sub">
            Training, cardio, and movement — keep this space for workout logs and goals.
          </p>
        </header>

        <p className="hub-body">
          Detailed fitness tracking will live here. Your existing health-related habits still show on the{' '}
          <Link to="/">week grid</Link> and <Link to="/month">activity</Link> views when you mark them there.
        </p>

        <section className="hub-card" aria-label="Coming soon">
          <h2>Coming soon</h2>
          <p>
            Planned: sessions (type, duration, notes), simple weekly summary, and optional sync via the Janus API —
            mirroring how habits and todos work today.
          </p>
        </section>
      </div>
    </main>
  )
}

export default Fitness
