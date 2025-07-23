import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Target, TrendingUp, Shield, Zap, Clock } from 'lucide-react'

const RightDiscoveryStack: React.FC = () => {
  const anomalies = [
    {
      id: 1,
      title: 'Supply Chain Deviation',
      description: 'Unusual pattern detected in supplier delivery times',
      severity: 'high',
      time: '2m ago',
      icon: AlertTriangle
    },
    {
      id: 2,
      title: 'Compliance Alert',
      description: 'New regulatory requirement affects 3 operational units',
      severity: 'medium',
      time: '15m ago',
      icon: Shield
    },
    {
      id: 3,
      title: 'Performance Anomaly',
      description: 'Efficiency metrics showing unexpected variance',
      severity: 'low',
      time: '1h ago',
      icon: TrendingUp
    }
  ]

  const opportunities = [
    {
      id: 1,
      title: 'Cost Optimization',
      description: 'Potential 18% reduction in logistics costs identified',
      impact: 'high',
      value: '$2.4M',
      time: '5m ago',
      icon: Target
    },
    {
      id: 2,
      title: 'Process Enhancement',
      description: 'Automation opportunity in quality control pipeline',
      impact: 'medium',
      value: '$890K',
      time: '22m ago',
      icon: Zap
    },
    {
      id: 3,
      title: 'Strategic Partnership',
      description: 'New vendor relationship could improve delivery times',
      impact: 'medium',
      value: '$1.2M',
      time: '1h ago',
      icon: Clock
    }
  ]

  const severityColors = {
    high: 'bg-gradient-to-br from-red-500/10 to-red-600/5 text-red-200',
    medium: 'bg-gradient-to-br from-yellow-500/10 to-orange-500/5 text-yellow-200',
    low: 'bg-gradient-to-br from-blue-500/10 to-blue-600/5 text-blue-200'
  }

  const impactColors = {
    high: 'bg-gradient-to-br from-emerald-500/10 to-teal-500/5 text-emerald-200',
    medium: 'bg-gradient-to-br from-blue-500/10 to-indigo-500/5 text-blue-200',
    low: 'bg-gradient-to-br from-purple-500/10 to-violet-500/5 text-purple-200'
  }

  return (
    <motion.div 
      className="bg-charcoal-prime h-full flex flex-col"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      {/* Anomaly Zone */}
      <motion.div 
        className="flex-1 p-4 border-b border-steel-frame"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-red-500/20 to-red-600/10 backdrop-blur-sm rounded-xl shadow-sm">
            <AlertTriangle className="w-5 h-5 text-red-300" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white/95">
              ⚠️ ANOMALY ZONE
            </h3>
            <p className="text-sm text-white/60">
              Real-time risk detection
            </p>
          </div>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {anomalies.map((anomaly, index) => (
            <motion.div
              key={anomaly.id}
              className={`relative backdrop-blur-sm p-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ${severityColors[anomaly.severity as keyof typeof severityColors]}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 + index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.02, x: -3, y: -2 }}
            >
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-[0.02] bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-xl" />
              
              <div className="flex items-start space-x-4 relative z-10">
                <anomaly.icon className="w-5 h-5 mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-white/95 mb-2">
                    {anomaly.title}
                  </h4>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {anomaly.description}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full border ${severityColors[anomaly.severity as keyof typeof severityColors]}`}>
                      {anomaly.severity.toUpperCase()}
                    </span>
                    <span className="text-xs text-silver-muted">
                      {anomaly.time}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Opportunity Zone */}
      <motion.div 
        className="flex-1 p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.4 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-teal-500/10 backdrop-blur-sm rounded-xl shadow-sm">
            <Target className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white/95">
              🎯 OPPORTUNITY ZONE
            </h3>
            <p className="text-sm text-white/60">
              Strategic value identification
            </p>
          </div>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {opportunities.map((opportunity, index) => (
            <motion.div
              key={opportunity.id}
              className={`relative backdrop-blur-sm p-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ${impactColors[opportunity.impact as keyof typeof impactColors]}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.02, x: -3, y: -2 }}
            >
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-[0.02] bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-xl" />
              
              <div className="flex items-start space-x-4 relative z-10">
                <opportunity.icon className="w-5 h-5 mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-white/95">
                      {opportunity.title}
                    </h4>
                    <span className="text-sm font-bold text-emerald-300">
                      {opportunity.value}
                    </span>
                  </div>
                  <p className="text-xs text-silver-muted leading-relaxed mb-2">
                    {opportunity.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full border ${impactColors[opportunity.impact as keyof typeof impactColors]}`}>
                      {opportunity.impact.toUpperCase()} IMPACT
                    </span>
                    <span className="text-xs text-silver-muted">
                      {opportunity.time}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Summary Stats */}
      <motion.div 
        className="p-4 border-t border-steel-frame bg-slate-depth/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.4 }}
      >
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-red-400">
              {anomalies.length}
            </div>
            <div className="text-xs text-silver-muted">
              Active Alerts
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold text-green-400">
              $4.5M
            </div>
            <div className="text-xs text-silver-muted">
              Potential Value
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default RightDiscoveryStack
