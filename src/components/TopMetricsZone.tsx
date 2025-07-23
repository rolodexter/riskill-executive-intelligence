import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface MetricCard {
  id: string
  title: string
  value: string
  change: string
  trend: 'up' | 'down' | 'stable'
  subtitle: string
  data: number[]
  color: string
}

interface CardStack {
  id: string
  primary: MetricCard
  stack: MetricCard[]
}

const TopMetricsZone: React.FC = () => {
  const [animatedValues, setAnimatedValues] = useState<{[key: string]: string}>({})
  const [currentTime, setCurrentTime] = useState(new Date())

  // Subtle data updates (less frequent, smaller changes)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
      // Very subtle value changes, less frequent
      const newValues: {[key: string]: string} = {}
      cardStacks.forEach(stack => {
        const baseValue = parseFloat(stack.primary.value.replace('%', ''))
        const variation = (Math.random() - 0.5) * 0.05 // Much smaller variation
        newValues[stack.id] = `${(baseValue + variation).toFixed(1)}%`
      })
      setAnimatedValues(newValues)
    }, 8000) // Much less frequent updates

    return () => clearInterval(interval)
  }, [])

  // High-resolution stacked card data
  const cardStacks: CardStack[] = [
    {
      id: 'operational',
      primary: {
        id: 'op-1',
        title: 'Operational Excellence',
        value: '94.2%',
        change: '+2.4%',
        trend: 'up',
        subtitle: 'Real-time efficiency metrics',
        data: [92, 93, 94, 95, 94],
        color: 'from-blue-500/10 to-cyan-500/5'
      },
      stack: [
        {
          id: 'op-2',
          title: 'Process Optimization',
          value: '89.7%',
          change: '+1.2%',
          trend: 'up',
          subtitle: 'Workflow automation',
          data: [88, 89, 90, 89, 90],
          color: 'from-blue-400/8 to-cyan-400/4'
        },
        {
          id: 'op-3',
          title: 'Resource Allocation',
          value: '91.3%',
          change: '+0.8%',
          trend: 'up',
          subtitle: 'Capacity utilization',
          data: [90, 91, 92, 91, 91],
          color: 'from-blue-300/6 to-cyan-300/3'
        }
      ]
    },
    {
      id: 'intelligence',
      primary: {
        id: 'int-1',
        title: 'Intelligence Coverage',
        value: '96.8%',
        change: '+3.1%',
        trend: 'up',
        subtitle: 'Data completeness & accuracy',
        data: [94, 95, 96, 97, 97],
        color: 'from-violet-500/10 to-purple-500/5'
      },
      stack: [
        {
          id: 'int-2',
          title: 'Pattern Recognition',
          value: '87.4%',
          change: '+1.9%',
          trend: 'up',
          subtitle: 'AI model performance',
          data: [85, 86, 87, 88, 87],
          color: 'from-violet-400/8 to-purple-400/4'
        },
        {
          id: 'int-3',
          title: 'Predictive Accuracy',
          value: '92.1%',
          change: '+2.3%',
          trend: 'up',
          subtitle: 'Forecast reliability',
          data: [90, 91, 92, 93, 92],
          color: 'from-violet-300/6 to-purple-300/3'
        },
        {
          id: 'int-4',
          title: 'Data Integration',
          value: '88.9%',
          change: '+1.1%',
          trend: 'up',
          subtitle: 'Source connectivity',
          data: [87, 88, 89, 89, 89],
          color: 'from-violet-200/4 to-purple-200/2'
        }
      ]
    },
    {
      id: 'strategic',
      primary: {
        id: 'str-1',
        title: 'Strategic Alignment',
        value: '91.5%',
        change: '+1.7%',
        trend: 'up',
        subtitle: 'Cross-functional coherence',
        data: [89, 90, 91, 92, 91],
        color: 'from-emerald-500/10 to-teal-500/5'
      },
      stack: [
        {
          id: 'str-2',
          title: 'Goal Achievement',
          value: '85.3%',
          change: '+2.1%',
          trend: 'up',
          subtitle: 'Objective completion',
          data: [83, 84, 85, 86, 85],
          color: 'from-emerald-400/8 to-teal-400/4'
        },
        {
          id: 'str-3',
          title: 'Risk Mitigation',
          value: '93.7%',
          change: '+0.9%',
          trend: 'up',
          subtitle: 'Threat management',
          data: [92, 93, 94, 94, 94],
          color: 'from-emerald-300/6 to-teal-300/3'
        }
      ]
    },
    {
      id: 'automation',
      primary: {
        id: 'auto-1',
        title: 'Process Automation',
        value: '78.9%',
        change: '+4.2%',
        trend: 'up',
        subtitle: 'Workflow digitization',
        data: [75, 76, 77, 78, 79],
        color: 'from-amber-500/10 to-orange-500/5'
      },
      stack: [
        {
          id: 'auto-2',
          title: 'AI Integration',
          value: '82.6%',
          change: '+3.8%',
          trend: 'up',
          subtitle: 'Intelligent automation',
          data: [79, 80, 81, 82, 83],
          color: 'from-amber-400/8 to-orange-400/4'
        },
        {
          id: 'auto-3',
          title: 'Human-AI Collaboration',
          value: '89.2%',
          change: '+2.7%',
          trend: 'up',
          subtitle: 'Augmented workflows',
          data: [86, 87, 88, 89, 89],
          color: 'from-amber-300/6 to-orange-300/3'
        },
        {
          id: 'auto-4',
          title: 'Decision Support',
          value: '91.8%',
          change: '+1.5%',
          trend: 'up',
          subtitle: 'Intelligent recommendations',
          data: [90, 91, 92, 92, 92],
          color: 'from-amber-200/4 to-orange-200/2'
        },
        {
          id: 'auto-5',
          title: 'Quality Assurance',
          value: '87.4%',
          change: '+2.9%',
          trend: 'up',
          subtitle: 'Automated validation',
          data: [84, 85, 86, 87, 87],
          color: 'from-amber-100/2 to-orange-100/1'
        }
      ]
    }
  ]

  const renderMiniChart = (data: number[], color: string) => {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1
    
    return (
      <div className="flex items-end space-x-0.5 h-6 w-12">
        {data.map((value, index) => {
          const height = ((value - min) / range) * 20 + 4
          return (
            <div
              key={index}
              className={`bg-gradient-to-t ${color} rounded-sm w-1.5`}
              style={{ height: `${height}px` }}
            />
          )
        })}
      </div>
    )
  }

  const StackedCard: React.FC<{ cardStack: CardStack; index: number }> = ({ cardStack, index }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const { primary, stack } = cardStack
    const currentValue = animatedValues[cardStack.id] || primary.value

    return (
      <div
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Stack Shadow Cards */}
        {stack.map((card, stackIndex) => (
          <div
            key={card.id}
            className={`absolute inset-0 bg-gradient-to-br ${card.color} backdrop-blur-sm rounded-xl border border-white/[0.03] shadow-2xl transition-all duration-300`}
            style={{ 
              zIndex: stack.length - stackIndex,
              transform: isExpanded 
                ? `translate(${(stackIndex + 1) * -4}px, ${(stackIndex + 1) * -8}px) scale(${1 - (stackIndex + 1) * 0.01})`
                : `translate(${(stackIndex + 1) * 1}px, ${(stackIndex + 1) * 2}px) scale(${1 - (stackIndex + 1) * 0.02})`,
              opacity: isExpanded ? 0.8 : 0.3 + (stack.length - stackIndex) * 0.1
            }}
          >
            <div className="p-3 h-full flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-lg font-semibold text-white/90 leading-tight mb-2">
                    {card.value}
                  </div>
                  <div className="text-sm text-white/50 font-medium">
                    {card.title}
                  </div>
                </div>
                {renderMiniChart(card.data, card.color)}
              </div>
              <div className="text-xs text-white/40 mt-2">
                {card.subtitle}
              </div>
            </div>
          </div>
        ))}

        {/* Primary Card */}
        <div
          className={`relative bg-gradient-to-br ${primary.color} backdrop-blur-sm rounded-xl shadow-lg transition-all duration-300`}
          style={{ 
            zIndex: stack.length + 1,
            boxShadow: isExpanded 
              ? '0 20px 40px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.04)'
              : '0 8px 20px -3px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.02)'
          }}
        >
          <div className="p-4 h-full flex flex-col justify-between relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.02] bg-gradient-to-br from-white/5 via-transparent to-transparent" />
            
            <div className="flex items-start justify-between relative z-10">
              <div className="flex-1">
                <div className="text-2xl font-semibold text-white/95 leading-tight mb-2">
                  {currentValue}
                </div>
                <div className="text-sm text-white/60 font-medium mb-2">
                  {primary.title}
                </div>
                <div 
                  className={`text-sm font-semibold ${
                    primary.trend === 'up' ? 'text-emerald-400' : 
                    primary.trend === 'down' ? 'text-red-400' : 'text-white/50'
                  }`}
                >
                  {primary.change}
                </div>
              </div>
              <div className="flex-shrink-0">
                {renderMiniChart(primary.data, primary.color)}
              </div>
            </div>
            
            <div className="relative z-10">
              <div className="text-sm text-white/40 mb-2">
                {primary.subtitle}
              </div>
              <div className="text-xs text-white/30 font-mono">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>
            
            {/* Stack indicator */}
            <div className="absolute top-4 right-4 text-sm text-white/30 font-medium">
              +{stack.length}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      className="bg-gradient-to-b from-transparent via-black/20 to-transparent px-4 py-4 h-24 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center justify-between h-full w-full">
        {/* Responsive Stacked KPI Cards */}
        <div className="flex items-center justify-between w-full space-x-4 lg:space-x-6 xl:space-x-8">
          {cardStacks.map((cardStack, index) => (
            <div key={cardStack.id} className="flex-1 min-w-0">
              <StackedCard cardStack={cardStack} index={index} />
            </div>
          ))}
        </div>
        
        {/* Refined status indicator */}
        <motion.div 
          className="flex items-center space-x-2 ml-6 flex-shrink-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.div 
            className="w-1.5 h-1.5 bg-emerald-400/80 rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs text-white/40 font-medium">Live</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default TopMetricsZone
