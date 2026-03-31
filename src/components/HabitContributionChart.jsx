import React, { useMemo, useState } from 'react'
import { CATEGORY_LABELS } from '../habits/habitConfig'
import {
  CONTRIBUTION_DEFAULT_DAY_COUNT,
  buildContributionGrid,
  cellBucket,
  computeHabitYearMetrics,
  doneIntensityForCell,
  doneStreakEndingAt,
} from '../habits/habitHeatmap'
import { getCellFromCells } from '../habits/habitCells'
import { isFutureYmd, parseYmd } from '../habits/habitStorage'
import './HabitContributionChart.css'

function formatTipDate(ymd) {
  const [y, m, d] = ymd.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-IE', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatChartRangeLabel(startYmd, endYmd) {
  const a = parseYmd(startYmd)
  const b = parseYmd(endYmd)
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return ''
  if (a.getTime() === b.getTime()) {
    return a.toLocaleDateString('en-IE', { day: 'numeric', month: 'long', year: 'numeric' })
  }
  if (a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()) {
    return `${a.getDate()}–${b.getDate()} ${a.toLocaleDateString('en-IE', { month: 'long', year: 'numeric' })}`
  }
  return `${a.toLocaleDateString('en-IE', { day: 'numeric', month: 'short', year: 'numeric' })} – ${b.toLocaleDateString('en-IE', { day: 'numeric', month: 'short', year: 'numeric' })}`
}

function HabitContributionChart({ habit, cells, now = new Date() }) {
  const [tipLine, setTipLine] = useState(null)

  const grid = useMemo(
    () => buildContributionGrid(now, CONTRIBUTION_DEFAULT_DAY_COUNT),
    [now]
  )

  const rangeLabel = useMemo(
    () => formatChartRangeLabel(grid.rangeStartYmd, grid.rangeEndYmd),
    [grid.rangeEndYmd, grid.rangeStartYmd]
  )

  const metrics = useMemo(
    () =>
      computeHabitYearMetrics(cells, habit.id, grid.rangeStartYmd, grid.rangeEndYmd, now),
    [cells, habit.id, grid.rangeStartYmd, grid.rangeEndYmd, now]
  )

  const rangeStartTs = parseYmd(grid.rangeStartYmd).getTime()

  const monthLabelByCol = useMemo(() => {
    const map = new Map()
    for (const m of grid.monthLabels) map.set(m.colIndex, m.label)
    return map
  }, [grid.monthLabels])

  return (
    <article
      className="contrib-card contrib-card--month"
      onMouseLeave={() => setTipLine(null)}
      aria-label={`Contribution graph for ${habit.label}`}
    >
      <header className="contrib-card-header">
        <div>
          <p className="contrib-card-kicker">{habit.label}</p>
          <p className="contrib-card-metric">{metrics.totalDone}</p>
          <p className="contrib-card-kicker contrib-card-range" style={{ marginTop: '0.35rem' }}>
            {rangeLabel}
          </p>
          <p className="contrib-card-kicker" style={{ marginTop: '0.25rem' }}>
            Completions in the last {CONTRIBUTION_DEFAULT_DAY_COUNT} days
          </p>
        </div>
        <span className={`contrib-cat ch-cat--${habit.category || 'mindset'}`}>
          {CATEGORY_LABELS[habit.category] || 'Habit'}
        </span>
      </header>

      <div className="contrib-scroll">
        <div className="contrib-chart-table">
          <div className="contrib-dow" aria-hidden>
            <span className="contrib-dow-m">M</span>
            <span className="contrib-dow-w">W</span>
            <span className="contrib-dow-f">F</span>
          </div>

          <div className="contrib-matrix">
            <div className="contrib-months" aria-hidden>
              {grid.columns.map((week, wi) => (
                <div key={`mh-${wi}`} className="contrib-month-col">
                  <span className="contrib-month-label">{monthLabelByCol.get(wi) || ''}</span>
                </div>
              ))}
            </div>

            <div className="contrib-months" style={{ paddingTop: 0, marginBottom: 0 }}>
              {grid.columns.map((week, wi) => (
                <div key={`wk-${wi}`} className="contrib-week-col">
                  {week.map(({ ymd, row }) => {
                    const t = parseYmd(ymd).getTime()
                    const beforeRange = t < rangeStartTs
                    const future = isFutureYmd(ymd, now)
                    const state = getCellFromCells(cells, ymd, habit.id)
                    const bucket = cellBucket(state, future, beforeRange)

                    let cls = 'contrib-cell'
                    let label = ''
                    if (bucket === 'inactive') {
                      cls += ' contrib-cell--inactive'
                      label = future ? 'Future day' : 'Outside current range'
                    } else if (bucket === 'fail') {
                      cls += ' contrib-cell--fail'
                      label = 'Marked missed'
                    } else if (bucket === 'done') {
                      const level = doneIntensityForCell(cells, habit.id, ymd, now)
                      cls += ` contrib-cell--done-${level}`
                      const streak = doneStreakEndingAt(cells, habit.id, ymd, now)
                      label = `Completed · ${streak}-day streak (incl. this day)`
                    } else {
                      cls += ' contrib-cell--empty'
                      label = 'No log'
                    }

                    const title = `${formatTipDate(ymd)} — ${label}`

                    return (
                      <button
                        key={`${wi}-${ymd}`}
                        type="button"
                        className={cls}
                        aria-label={title}
                        title={title}
                        onMouseEnter={() => setTipLine(title)}
                        onFocus={() => setTipLine(title)}
                        onBlur={() => setTipLine(null)}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {tipLine && (
        <p className="contrib-card-kicker" style={{ marginTop: '0.5rem', minHeight: '2.5em' }}>
          {tipLine}
        </p>
      )}

      <div className="contrib-legend-row">
        <span className="contrib-legend-miss">
          <span className="contrib-legend-miss-swatch" aria-hidden />
          Missed
        </span>
        <span className="contrib-legend-scale">
          <span>Less</span>
          <span className="contrib-legend-boxes" aria-hidden>
            <span className="contrib-legend-box" style={{ background: 'var(--contrib-empty)' }} />
            <span className="contrib-legend-box" style={{ background: 'var(--contrib-g1)' }} />
            <span className="contrib-legend-box" style={{ background: 'var(--contrib-g2)' }} />
            <span className="contrib-legend-box" style={{ background: 'var(--contrib-g3)' }} />
            <span className="contrib-legend-box" style={{ background: 'var(--contrib-g4)' }} />
          </span>
          <span>More</span>
        </span>
      </div>

      <footer className="contrib-stats">
        <div>
          <p className="contrib-stat-label">Most active month</p>
          <p className="contrib-stat-value">{metrics.mostActiveMonthLabel}</p>
        </div>
        <div>
          <p className="contrib-stat-label">Best streak day</p>
          <p className="contrib-stat-value">{metrics.mostActiveDayLabel}</p>
        </div>
        <div>
          <p className="contrib-stat-label">Longest streak</p>
          <p className="contrib-stat-value">{metrics.longestStreakDays}d</p>
        </div>
        <div>
          <p className="contrib-stat-label">Current streak</p>
          <p className="contrib-stat-value">{metrics.currentStreakDays}d</p>
        </div>
      </footer>
    </article>
  )
}

export default HabitContributionChart
