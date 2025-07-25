import React from 'react'
import RiskillEnterpriseDashboardMinimalist from './RiskillEnterpriseDashboardMinimalist'

/**
 * Minimalist2 dashboard component - A copy of the minimalist dashboard for parallel editing
 * This allows for isolated deployment testing and parallel development
 */
const RiskillEnterpriseDashboardMinimalist2: React.FC = () => {
  // This wrapper component allows for eventual divergence between the two versions
  // while initially keeping them in sync
  return (
    <div className="minimalist2-wrapper">
      {/* Adding a small banner to distinguish this as the minimalist2 version */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-purple-800/50 backdrop-blur-sm text-white text-xs text-center py-1">
        Minimalist2 Version - Deployment Test
      </div>
      <RiskillEnterpriseDashboardMinimalist />
    </div>
  )
}

export default RiskillEnterpriseDashboardMinimalist2
