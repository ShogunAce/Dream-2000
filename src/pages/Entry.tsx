import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import Landing from './Landing'

const VISITED = 'dream2000_visited'

function hasVisited(): boolean {
  try {
    return localStorage.getItem(VISITED) === '1'
  } catch {
    return false
  }
}

/** "/" shows the landing page on a first visit, then goes straight to the dashboard. */
export default function Entry() {
  // decided once, so the landing page stays on screen during the visit that sets the flag
  const [returning] = useState(hasVisited)
  if (!returning) {
    try {
      localStorage.setItem(VISITED, '1')
    } catch {
      // storage blocked: the landing page just shows every time
    }
  }
  return returning ? <Navigate to="/dashboard" replace /> : <Landing />
}
