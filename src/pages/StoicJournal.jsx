import React from 'react'
import { Link } from 'react-router-dom'
import './HubPage.css'

function StoicJournal() {
  return (
    <main className="hub-page">
      <div className="hub-inner">
        <header className="hub-header">
          <h1 className="hub-title">Stoic day plan & review</h1>
          <p className="hub-sub">
            Morning intention setting and evening reflection inspired by Stoic practice.
          </p>
        </header>

        <p className="hub-body">
          Use this tab as your Stoic workflow hub: plan the day at the start, then review it at the end. You can pair
          this with your <Link to="/month">activity</Link> page to spot consistency trends.
        </p>

        <section className="hub-card" aria-label="Planned workflow">
          <h2>Planned workflow</h2>
          <p>
            Morning: priorities, obstacles, virtues to practice. Evening: what went well, what to improve, and one next
            action for tomorrow.
          </p>
        </section>
      </div>
    </main>
  )
}

export default StoicJournal
