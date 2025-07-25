import { motion } from 'framer-motion'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RiskillEnterpriseDashboard from './components/RiskillEnterpriseDashboard'
import RiskillEnterpriseDashboardMinimalist from './components/RiskillEnterpriseDashboardMinimalist'
import RiskillEnterpriseDashboardIDP from './components/RiskillEnterpriseDashboardIDP'

function App() {
  return (
    <Router>
      <motion.div 
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={<RiskillEnterpriseDashboard />} />
          <Route path="/minimalist" element={<RiskillEnterpriseDashboardMinimalist />} />
          <Route path="/idp" element={<RiskillEnterpriseDashboardIDP />} />
        </Routes>
      </motion.div>
    </Router>
  )
}

export default App
