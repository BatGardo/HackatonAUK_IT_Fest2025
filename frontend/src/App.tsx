import { Routes, Route } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/HomePage'
import { DashboardPage } from './pages/DashboardPage'
import { CVBuilderPage } from './pages/CVBuilderPage'
import { ProfilePage } from './pages/ProfilePage'
import { InterviewPage } from './pages/InterviewPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/cv-builder" element={<CVBuilderPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/interview" element={<InterviewPage />} />
        {/* Add more routes here as needed */}
    </Routes>
  )
}

export default App
