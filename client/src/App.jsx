import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import NewsPage from './pages/NewsPage'
import NewsDetailPage from './pages/NewsDetailPage'
import PresidentMessagePage from './pages/PresidentMessagePage'
import TeamMemberProfile from './components/AboutPage/TeamMemberProfile/TeamMemberProfile'
import './App.css'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} index />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team-member/:id" element={<TeamMemberProfile />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/president-message" element={<PresidentMessagePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App