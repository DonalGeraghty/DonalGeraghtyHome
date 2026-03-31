import React from 'react'
import { Link } from 'react-router-dom'
import './HubPage.css'

function Food() {
  return (
    <main className="hub-page">
      <div className="hub-inner">
        <header className="hub-header">
          <h1 className="hub-title">Food &amp; diet</h1>
          <p className="hub-sub">
            Meals, macros, and habits around eating — use this tab for nutrition-focused tracking.
          </p>
        </header>

        <p className="hub-body">
          Food logging and diet goals will be built out here. Until then, you can track related daily habits on the{' '}
          <Link to="/">week view</Link> (for example water or meal-prep habits).
        </p>

        <section className="hub-card" aria-label="Coming soon">
          <h2>Coming soon</h2>
          <p>
            Planned: quick meal notes, optional calorie or macro targets, and per-day history — stored per account like
            your other data.
          </p>
        </section>
      </div>
    </main>
  )
}

export default Food
