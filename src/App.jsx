import { useState } from 'react'
import LandingPage from './LandingPage'
import InTurnResumeTailor from './inturn-resume-tailor'

export default function App() {
  const [view, setView] = useState('landing')

  if (view === 'tool') return <InTurnResumeTailor />
  return <LandingPage onTryTool={() => setView('tool')} />
}