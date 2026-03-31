import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { API_ENDPOINTS, authFetch } from '../config/api'
import { cellKey, getCellFromCells } from '../habits/habitCells'
import {
  clearLegacyLocalCells,
  exportLegacyLocalCells,
} from '../habits/habitStorage'
import { useAuth } from './AuthContext'

const HabitDataContext = createContext(null)

async function parseJsonSafe(res) {
  try {
    return await res.json()
  } catch {
    return {}
  }
}

export function HabitDataProvider({ children }) {
  const { user } = useAuth()
  const email = user?.email || ''
  const [cells, setCells] = useState({})
  const [habits, setHabits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)
  const cellsRef = useRef({})
  useEffect(() => {
    cellsRef.current = cells
  }, [cells])

  const load = useCallback(
    async (opts = {}) => {
      const silent = Boolean(opts.silent)
      if (!email) {
        setCells({})
        setHabits([])
        if (!silent) setLoading(false)
        setError(null)
        return
      }
      if (!silent) {
        setLoading(true)
        setError(null)
      }
      try {
        const [resCells, resHabits] = await Promise.all([
          authFetch(API_ENDPOINTS.HABITS_GET, { method: 'GET' }),
          authFetch(API_ENDPOINTS.USER_HABITS_GET, { method: 'GET' })
        ])
        
        const data = await parseJsonSafe(resCells)
        const habitsData = await parseJsonSafe(resHabits)
        
        if (!resCells.ok) {
          throw new Error(data.error || `Could not load habits (${resCells.status})`)
        }
        
        let next = data.cells && typeof data.cells === 'object' ? { ...data.cells } : {}
        if (resHabits.ok && habitsData.habits && Array.isArray(habitsData.habits)) {
          setHabits(habitsData.habits)
        } else {
          setHabits([])
        }

        if (Object.keys(next).length === 0) {
          const legacy = exportLegacyLocalCells(email)
          if (Object.keys(legacy).length > 0) {
            const putRes = await authFetch(API_ENDPOINTS.HABITS_PUT, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ cells: legacy }),
            })
            const putData = await parseJsonSafe(putRes)
            if (putRes.ok && putData.cells && typeof putData.cells === 'object') {
              next = { ...putData.cells }
              clearLegacyLocalCells(email)
            }
          }
        }

        setCells(next)
        setError(null)
      } catch (e) {
        if (!silent) {
          setError(e.message || 'Failed to load habits')
          setCells({})
          setHabits([])
        }
      } finally {
        if (!silent) setLoading(false)
      }
    },
    [email]
  )

  useEffect(() => {
    load()
  }, [load])

  const patchCell = useCallback(
    async (dateStr, habitId, state) => {
      if (!email) return false
      const key = cellKey(dateStr, habitId)
      setCells((c) => {
        const copy = { ...c }
        if (state === 'none') delete copy[key]
        else copy[key] = state
        return copy
      })
      setSaving(true)
      setError(null)
      try {
        const res = await authFetch(API_ENDPOINTS.HABITS_PATCH_CELL, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ date: dateStr, habitId, state }),
        })
        const data = await parseJsonSafe(res)
        if (!res.ok) {
          await load({ silent: true })
          throw new Error(data.error || `Save failed (${res.status})`)
        }
        if (data.cells && typeof data.cells === 'object') {
          setCells({ ...data.cells })
        }
        return true
      } catch (e) {
        setError(e.message || 'Save failed')
        return false
      } finally {
        setSaving(false)
      }
    },
    [email, load]
  )

  const cycleCell = useCallback(async (dateStr, habitId) => {
    const cur = getCellFromCells(cellsRef.current, dateStr, habitId)
    const next = cur === 'done' ? 'none' : 'done'
    return patchCell(dateStr, habitId, next)
  }, [patchCell])

  const getCell = useCallback(
    (dateStr, habitId) => getCellFromCells(cells, dateStr, habitId),
    [cells]
  )

  const saveHabitsList = useCallback(async (newList) => {
    if (!email) return false
    try {
      setSaving(true)
      const res = await authFetch(API_ENDPOINTS.USER_HABITS_PUT, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ habits: newList }),
      })
      if (res.ok) {
        setHabits(newList)
        return true
      }
      return false
    } catch {
      return false
    } finally {
      setSaving(false)
    }
  }, [email])

  const addHabit = useCallback(async (habit) => {
    const list = [...habits, habit]
    return await saveHabitsList(list)
  }, [habits, saveHabitsList])
  
  const editHabit = useCallback(async (habit) => {
    const list = habits.map(h => h.id === habit.id ? habit : h)
    return await saveHabitsList(list)
  }, [habits, saveHabitsList])

  const deleteHabit = useCallback(async (id) => {
    const list = habits.filter(h => h.id !== id)
    return await saveHabitsList(list)
  }, [habits, saveHabitsList])

  const value = useMemo(
    () => ({
      cells,
      habits,
      loading,
      error,
      saving,
      reload: load,
      patchCell,
      cycleCell,
      getCell,
      addHabit,
      editHabit,
      deleteHabit,
    }),
    [cells, habits, loading, error, saving, load, patchCell, cycleCell, getCell, addHabit, editHabit, deleteHabit]
  )

  return <HabitDataContext.Provider value={value}>{children}</HabitDataContext.Provider>
}

export function useHabitData() {
  const ctx = useContext(HabitDataContext)
  if (!ctx) throw new Error('useHabitData must be used within HabitDataProvider')
  return ctx
}
