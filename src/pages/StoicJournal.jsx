import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { API_ENDPOINTS, authFetch } from '../config/api'
import './HubPage.css'

const STOIC_FIELDS = {
  morningFocus: '',
  likelyChallenge: '',
  virtueToPractice: '',
  eveningWin: '',
  eveningImprove: '',
  nextAction: '',
}

function ymd(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

async function parseJsonSafe(res) {
  try {
    return await res.json()
  } catch {
    return {}
  }
}

function StoicJournal() {
  const { user } = useAuth()
  const email = user?.email || ''
  const [dateKey, setDateKey] = useState(() => ymd())
  const [form, setForm] = useState(STOIC_FIELDS)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!email) {
      setForm(STOIC_FIELDS)
      setError('')
      return
    }
    const load = async () => {
      try {
        const res = await authFetch(API_ENDPOINTS.USER_STOIC, { method: 'GET' })
        const data = await parseJsonSafe(res)
        if (!res.ok) throw new Error(data.error || `Could not load stoic journal (${res.status})`)
        const entry = data.entry && typeof data.entry === 'object' ? data.entry : {}
        if (entry.date === dateKey && entry.form && typeof entry.form === 'object') {
          setForm({
            morningFocus: typeof entry.form.morningFocus === 'string' ? entry.form.morningFocus : '',
            likelyChallenge: typeof entry.form.likelyChallenge === 'string' ? entry.form.likelyChallenge : '',
            virtueToPractice: typeof entry.form.virtueToPractice === 'string' ? entry.form.virtueToPractice : '',
            eveningWin: typeof entry.form.eveningWin === 'string' ? entry.form.eveningWin : '',
            eveningImprove: typeof entry.form.eveningImprove === 'string' ? entry.form.eveningImprove : '',
            nextAction: typeof entry.form.nextAction === 'string' ? entry.form.nextAction : '',
          })
        } else {
          setForm(STOIC_FIELDS)
        }
        setError('')
      } catch (e) {
        setError(e.message || 'Failed to load stoic journal')
        setForm(STOIC_FIELDS)
      }
    }
    void load()
  }, [email, dateKey])

  useEffect(() => {
    if (!email) return
    void (async () => {
      try {
        const res = await authFetch(API_ENDPOINTS.USER_STOIC, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ date: dateKey, form }),
        })
        const data = await parseJsonSafe(res)
        if (!res.ok) throw new Error(data.error || `Could not save stoic journal (${res.status})`)
        setError('')
      } catch (e) {
        setError(e.message || 'Failed to save stoic journal')
      }
    })()
  }, [email, form, dateKey])

  useEffect(() => {
    const timer = setInterval(() => {
      const nowKey = ymd()
      setDateKey((prev) => (prev === nowKey ? prev : nowKey))
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const prettyDate = useMemo(() => {
    const [y, m, d] = dateKey.split('-').map(Number)
    return new Date(y, m - 1, d).toLocaleDateString('en-IE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }, [dateKey])

  const onChange = (field) => (e) => {
    const value = e.target.value
    setForm((f) => ({ ...f, [field]: value }))
  }

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
          This journal is scoped to <strong>today only</strong> ({prettyDate}). At midnight it resets for the next day
          and the previous day entry is deleted. You can pair this with your <Link to="/month">activity</Link> page to
          spot consistency trends.
        </p>
        {error ? <p className="hub-body">{error}</p> : null}

        <section className="hub-card" aria-label="Morning plan">
          <h2>Morning plan</h2>
          <div className="hub-form-grid">
            <label className="hub-field">
              <span>Top priority for today</span>
              <textarea
                className="hub-input"
                value={form.morningFocus}
                onChange={onChange('morningFocus')}
                rows={2}
                placeholder="What must get done today?"
              />
            </label>
            <label className="hub-field">
              <span>Likely challenge</span>
              <textarea
                className="hub-input"
                value={form.likelyChallenge}
                onChange={onChange('likelyChallenge')}
                rows={2}
                placeholder="What might test your discipline?"
              />
            </label>
            <label className="hub-field">
              <span>Virtue to practice</span>
              <input
                className="hub-input"
                value={form.virtueToPractice}
                onChange={onChange('virtueToPractice')}
                placeholder="Wisdom, courage, justice, temperance..."
              />
            </label>
          </div>
        </section>

        <section className="hub-card" aria-label="Evening review">
          <h2>Evening review</h2>
          <div className="hub-form-grid">
            <label className="hub-field">
              <span>What went well?</span>
              <textarea
                className="hub-input"
                value={form.eveningWin}
                onChange={onChange('eveningWin')}
                rows={2}
                placeholder="What actions aligned with your values?"
              />
            </label>
            <label className="hub-field">
              <span>What to improve?</span>
              <textarea
                className="hub-input"
                value={form.eveningImprove}
                onChange={onChange('eveningImprove')}
                rows={2}
                placeholder="Where did you drift?"
              />
            </label>
            <label className="hub-field">
              <span>One action for tomorrow</span>
              <input
                className="hub-input"
                value={form.nextAction}
                onChange={onChange('nextAction')}
                placeholder="Small next step..."
              />
            </label>
          </div>
        </section>
      </div>
    </main>
  )
}

export default StoicJournal
