import React from 'react'
import { motion } from 'framer-motion'
import RiskillEnterpriseDashboardMinimalist from './RiskillEnterpriseDashboardMinimalist'
import { 
  Database, 
  Network, 
  Shield, 
  BarChart3, 
  Cpu, 
  Globe, 
  Zap, 
  Brain 
} from 'lucide-react'

/**
 * Minimalist2 dashboard component - A copy of the minimalist dashboard for parallel editing
 * This allows for isolated deployment testing and parallel development
 */
const RiskillEnterpriseDashboardMinimalist2: React.FC = () => {
  // Intelligence modules data for the custom footer
  const modules = [
    {
      id: 'supply-chain',
      name: 'Supply Chain Intelligence',
      icon: Network,
      status: 'active',
      metrics: '847 nodes'
    },
    {
      id: 'compliance',
      name: 'Compliance Monitor',
      icon: Shield,
      status: 'active',
      metrics: '99.2% coverage'
    },
    {
      id: 'analytics',
      name: 'Performance Analytics',
      icon: BarChart3,
      status: 'processing',
      metrics: '12.4K events/min'
    },
    {
      id: 'automation',
      name: 'Industrial Automation',
      icon: Cpu,
      status: 'active',
      metrics: '156 processes'
    },
    {
      id: 'market',
      name: 'Market Intelligence',
      icon: Globe,
      status: 'standby',
      metrics: '24/7 monitoring'
    },
    {
      id: 'optimization',
      name: 'Process Optimization',
      icon: Zap,
      status: 'processing',
      metrics: '35% efficiency'
    },
    {
      id: 'predictive',
      name: 'Predictive Analytics',
      icon: Brain,
      status: 'active',
      metrics: '94% accuracy'
    },
    {
      id: 'data-lake',
      name: 'Enterprise Data Lake',
      icon: Database,
      status: 'active',
      metrics: '2.3TB processed'
    }
  ];

  // Custom Intelligence Modules Footer component embedded directly
  const CustomIntelligenceModulesFooter = () => (
    <motion.div 
      className="w-full bg-black/40 backdrop-blur-xl border-t border-white/5 p-4 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
    >
      <div className="flex flex-wrap justify-between gap-2">
        {modules.map((module, index) => (
          <div
            key={module.id}
            className="flex-1 min-w-[120px] rounded-md p-3 bg-black/50 border border-white/10"
          >
            <div className="flex justify-between items-center">
              <div className="text-white/70 text-[10px] uppercase font-medium tracking-wide">{module.id}</div>
              <div className={`w-1.5 h-1.5 rounded-full ${
                module.status === 'active' ? 'bg-emerald-400' :
                module.status === 'processing' ? 'bg-blue-400 animate-pulse' : 'bg-white/40'
              }`}></div>
            </div>
            <div className="mt-1 text-white/90 text-xs font-light">{module.name}</div>
          </div>
        ))}
      </div>

      {/* System Status Bar */}
      <div className="mt-4 flex items-center justify-between text-[10px] text-white/50">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            <span>System Health: DEPLOYMENT TEST - UPDATED MINIMALIST2</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
            <span>Processing: {modules.filter(m => m.status === 'processing').length} modules</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span>Last Update: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <span>Uptime: 99.97%</span>
        </div>
      </div>
    </motion.div>
  );

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
        <CustomIntelligenceModulesFooter />
      </div>
    </div>
  )
}

export default RiskillEnterpriseDashboardMinimalist2
