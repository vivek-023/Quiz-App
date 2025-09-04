import { Route, Routes, Link, Navigate } from 'react-router-dom'
import QuizPage from './pages/QuizPage'
import ResultsPage from './pages/ResultsPage'
import './App.css'

function App() {
  return (
    <div>
      <nav className="topnav">
        <Link to="/quiz" className="brand">Quiz App</Link>
        <div className="spacer" />
        <Link to="/results" className="link">Results</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/quiz" replace />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="*" element={<Navigate to="/quiz" replace />} />
      </Routes>
    </div>
  )
}

export default App
