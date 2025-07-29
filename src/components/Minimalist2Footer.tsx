import React from 'react'
import { motion } from 'framer-motion'
import {
  Database,
  Activity,
  Shield,
  BarChart3,
  AlertCircle,
  Brain
} from 'lucide-react'

/**
 * Custom footer component for minimalist2 route with widgets that match production
 */
const Minimalist2Footer: React.FC = () => {
  // Define modules to match what's seen in production
  const modules = [
    {
      id: 'risk-engine',
      name: 'Risk Engine',
      icon: Activity,
      status: 'active',
      metrics: '24/7 monitoring'
    },
    {
      id: 'portfolio-analytics',
      name: 'Portfolio Analytics',
      icon: BarChart3,
      status: 'processing',
      metrics: '12.4K events/min'
    },
    {
      id: 'market-intelligence',
      name: 'Market Intelligence',
      icon: Database,
      status: 'standby',
      metrics: '24/7 monitoring'
    },
    {
      id: 'compliance-monitor',
      name: 'Compliance Monitor',
      icon: Shield,
      status: 'active',
      metrics: '99.2% coverage'
    },
    {
      id: 'threat-detection',
      name: 'Threat Detection',
      icon: AlertCircle,
      status: 'processing',
      metrics: '4 alerts'
    },
    {
      id: 'ai-assistant',
      name: 'AI Assistant',
      icon: Brain,
      status: 'active',
      metrics: '94.7% accuracy'
    }
  ]

  return (
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
            <span>System Health: PRODUCTION WIDGET TEST</span>
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
  )
}

export default Minimalist2Footer
