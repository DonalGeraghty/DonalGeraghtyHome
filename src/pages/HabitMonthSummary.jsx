import { Navigate } from 'react-router-dom'

/** Legacy route: week and activity now share the home page. */
function HabitMonthSummary() {
  return <Navigate to="/" replace />
}

export default HabitMonthSummary
