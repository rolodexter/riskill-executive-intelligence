import React from 'react'
import RiskillEnterpriseDashboardMinimalist from './RiskillEnterpriseDashboardMinimalist'
import Minimalist2Footer from './Minimalist2Footer'

/**
 * Minimalist2 dashboard component - A copy of the minimalist dashboard for parallel editing
 * This allows for isolated deployment testing and parallel development
 */
const RiskillEnterpriseDashboardMinimalist2: React.FC = () => {
  // No need to define modules here as they are defined in Minimalist2Footer

  // This wrapper component allows for eventual divergence between the two versions
  return (
    <div className="minimalist2-wrapper">
      {/* Adding a small banner to distinguish this as the minimalist2 version */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-purple-800/50 backdrop-blur-sm text-white text-xs text-center py-1">
        Minimalist2 Version - Deployment Test
      </div>
      
      {/* Main dashboard without the footer */}
      <div className="dashboard-content">
        <RiskillEnterpriseDashboardMinimalist />
      </div>
      
      {/* Custom footer implementation for minimalist2 */}
      <div className="fixed bottom-0 left-0 right-0">
        <Minimalist2Footer />
      </div>
    </div>
  )
}

export default RiskillEnterpriseDashboardMinimalist2
