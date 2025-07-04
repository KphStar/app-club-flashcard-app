import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import { PrimeReactProvider } from 'primereact/api'
import HomePage from './pages/HomePage/HomePage'
import StudyPage from './pages/StudyPage/StudyPage'
import PreviewPage from './pages/PreviewPage/PreviewPage'
import FinishedPage from './pages/FinishPage/FinishPage'
import NavBar from './components/navbar/NavBar'
import './App.css'

import { useLoadCardSets } from './hooks/loadCardSets'
import OverviewPage from './pages/OverviewPage/OverviewPage'

export default function App() {
  useLoadCardSets();
  return (
    
      <PrimeReactProvider>
        <Router>
          <header>
            <NavBar />
          </header>
          <Routes>
            {/* Home or Welcome page */}
            <Route path="/" element={<HomePage />} />

            {/* Preview a set of flashcards before starting the study session */}
            <Route path="/preview/:setId" element={<PreviewPage />} />

            {/* Study mode, where you display one card at a time */}
            <Route path="/study/:setId" element={<StudyPage />} />

            {/* Overview page, after the user finishes studying all the cards */}
            <Route path="/overview" element={<OverviewPage />} />

            {/* Finished page, after the user finishes studying all the cards */}
            <Route path="/finished" element={<FinishedPage />} />
          </Routes>
        </Router>
      </PrimeReactProvider>

  )
}
