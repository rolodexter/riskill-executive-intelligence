// React is imported automatically in JSX transformations
import { motion } from 'framer-motion'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RiskillEnterpriseDashboard from './components/RiskillEnterpriseDashboard'
import RiskillEnterpriseDashboardMinimalist from './components/RiskillEnterpriseDashboardMinimalist'
import RiskillEnterpriseDashboardMinimalist2 from './components/RiskillEnterpriseDashboardMinimalist2'
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
          <Route path="/minimalist2" element={<RiskillEnterpriseDashboardMinimalist2 />} />
          <Route path="/idp" element={<RiskillEnterpriseDashboardIDP />} />
        </Routes>
      </motion.div>
    </Router>
  )
}

export default App
