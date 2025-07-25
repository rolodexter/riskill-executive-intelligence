import React from 'react'
import { motion } from 'framer-motion'
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

const IntelligenceModulesFooter: React.FC = () => {
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
      status: 'active',
      metrics: '18% efficiency gain'
    },
    {
      id: 'predictive',
      name: 'Predictive Analytics',
      icon: Brain,
      status: 'processing',
      metrics: '94.7% accuracy'
    },
    {
      id: 'data-lake',
      name: 'Enterprise Data Lake',
      icon: Database,
      status: 'active',
      metrics: '2.3TB processed'
    }
  ]

  // Module status colors are now applied directly in the JSX

  return (
    <motion.div 
      className="w-full h-30 bg-gradient-to-r from-slate-900/40 via-gray-800/30 to-slate-900/40 backdrop-blur-md border-t border-white/[0.02] p-4 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      style={{
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 100%)',
        backdropFilter: 'blur(24px) saturate(1.1)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.1)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.03)'
        /* Removed width: 100vw that was causing issues */
      }}
    >

      <div className="flex w-full justify-between gap-3">
        {modules.map((module, index) => (
          <motion.div
            key={module.id}
            className="flex-1 min-w-[120px] rounded-md p-3 bg-white/[0.03] border border-white/[0.08] shadow-lg"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              /* Removed problematic width calculation */
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 + index * 0.1, duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex justify-between items-center">
              <div className="text-white/70 text-[10px] uppercase font-medium tracking-wide">{module.id}</div>
              <div className={`w-1.5 h-1.5 rounded-full ${
                module.status === 'active' ? 'bg-emerald-400' :
                module.status === 'processing' ? 'bg-blue-400 animate-pulse' : 'bg-white/40'
              }`}></div>
            </div>
            <div className="mt-1 text-white/90 text-xs font-light">{module.name}</div>
          </motion.div>
        ))}
      </div>

      {/* System Status Bar */}
      <motion.div 
        className="mt-4 flex items-center justify-between text-[10px] text-white/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.4 }}
      >
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            <span>System Health: DEPLOYMENT TEST - UPDATED</span>
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
      </motion.div>
    </motion.div>
  )
}

export default IntelligenceModulesFooter
