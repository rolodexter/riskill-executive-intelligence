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

  const statusColors = {
    active: 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border-emerald-400/30 text-emerald-300',
    processing: 'bg-gradient-to-r from-blue-500/20 to-cyan-500/10 border-blue-400/30 text-blue-300',
    standby: 'bg-gradient-to-r from-slate-500/15 to-gray-500/8 border-slate-400/25 text-slate-300'
  }

  return (
    <motion.div 
      className="bg-slate-depth border-t border-steel-frame p-4 h-30"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
    >
      <motion.div 
        className="mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.4 }}
      >
        <h3 className="text-base font-semibold text-white/95 mb-2">
          Intelligence Modules Zone
        </h3>
        <p className="text-sm text-white/60">
          Enterprise AI capabilities and real-time processing status
        </p>
      </motion.div>

      <div className="grid grid-cols-4 gap-3 lg:grid-cols-8">
        {modules.map((module, index) => (
          <motion.div
            key={module.id}
            className="relative bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent backdrop-blur-sm border border-white/[0.01] hover:border-white/[0.02] rounded-xl p-4 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 + index * 0.05, duration: 0.4 }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.02] bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-xl" />
            
            <div className="flex flex-col items-center text-center space-y-3 relative z-10">
              <div className="p-3 bg-gradient-to-br from-white/[0.08] to-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.01] shadow-sm">
                <module.icon className="w-5 h-5 text-white/80" />
              </div>
              
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-white/95 leading-tight mb-2">
                  {module.name}
                </h4>
                <p className="text-xs text-silver-muted">
                  {module.metrics}
                </p>
              </div>
              
              <div className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[module.status as keyof typeof statusColors]}`}>
                {module.status === 'processing' ? (
                  <div className="flex items-center space-x-1">
                    <div className="w-1 h-1 bg-current rounded-full animate-pulse"></div>
                    <span>PROC</span>
                  </div>
                ) : (
                  module.status.toUpperCase()
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* System Status Bar */}
      <motion.div 
        className="mt-4 flex items-center justify-between text-xs text-silver-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.4 }}
      >
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>System Health: Optimal</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
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
