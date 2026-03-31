import React from 'react'
import { Link } from 'react-router-dom'
import './HubPage.css'

function Calories() {
  return (
    <main className="hub-page">
      <div className="hub-inner">
        <header className="hub-header">
          <h1 className="hub-title">Calorie tracking</h1>
          <p className="hub-sub">
            Track intake, set targets, and keep nutrition progress visible in one place.
          </p>
        </header>

        <p className="hub-body">
          This tab is ready for your calorie workflow. For now, you can still use your <Link to="/todos">todo list</Link>{' '}
          and <Link to="/">habit grid</Link> for daily nutrition goals while we build out full logging.
        </p>

        <section className="hub-card" aria-label="Planned features">
          <h2>Planned here</h2>
          <p>
            Daily calorie goal, consumed total, remaining calories, and quick meal entries with notes.
          </p>
        </section>
      </div>
    </main>
  )
}

export default Calories
