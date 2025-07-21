import React from 'react'
import { motion } from 'framer-motion'
import RiskillEnterpriseDashboard from './components/RiskillEnterpriseDashboard'

function App() {
  return (
    <motion.div 
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <RiskillEnterpriseDashboard />
    </motion.div>
  )
}

export default App
