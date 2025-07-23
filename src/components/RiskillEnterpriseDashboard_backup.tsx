import React, { useState } from 'react'
import { motion } from 'framer-motion'

const RiskillEnterpriseDashboard: React.FC = () => {
  const menuItems = ['File', 'Edit', 'View', 'Tools', 'Window', 'Help']
  
  // Revenue card stack state
  const [currentRevenueCard, setCurrentRevenueCard] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [flipDirection, setFlipDirection] = useState<'forward' | 'backward'>('forward')

  // KPI card stacks state
  const [currentKpiCards, setCurrentKpiCards] = useState([0, 0, 0, 0])
  const [kpiTransitioning, setKpiTransitioning] = useState([false, false, false, false])
  
  // Revenue card stack data
  const revenueCards = [
    {
      title: "REVENUE",
      value: "$2.4M",
      change: "+12.5%",
      trend: "up" as const,
      period: "Q4 2024",
      subtitle: "Total Revenue"
    },
    {
      title: "RECURRING",
      value: "$1.8M",
      change: "+8.2%",
      trend: "up" as const,
      period: "Q4 2024",
      subtitle: "Recurring Revenue"
    },
    {
      title: "GROWTH",
      value: "18.4%",
      change: "+3.1%",
      trend: "up" as const,
      period: "YoY",
      subtitle: "Revenue Growth"
    },
    {
      title: "FORECAST",
      value: "$3.1M",
      change: "+29.2%",
      trend: "up" as const,
      period: "Q1 2025",
      subtitle: "Projected Revenue"
    }
  ]
  
  // KPI card stacks data
  const kpiCardStacks = [
    // Analytics Stack
    [
      { title: "ANALYTICS", value: "94.2%", change: "+5.8%", trend: "up", period: "Accuracy", color: "blue" },
      { title: "PROCESSING", value: "1.2M", change: "+12%", trend: "up", period: "Records/Day", color: "blue" },
      { title: "LATENCY", value: "<50ms", change: "-15%", trend: "up", period: "Response", color: "blue" }
    ],
    // Intelligence Stack
    [
      { title: "AI MODELS", value: "12", change: "+3", trend: "up", period: "Active", color: "purple" },
      { title: "PREDICTIONS", value: "89.7%", change: "+2.1%", trend: "up", period: "Accuracy", color: "purple" },
      { title: "INSIGHTS", value: "247", change: "+18", trend: "up", period: "Generated", color: "purple" }
    ],
    // Risk Stack
    [
      { title: "RISK SCORE", value: "7.2", change: "-0.8", trend: "up", period: "Current", color: "amber" },
      { title: "THREATS", value: "3", change: "-2", trend: "up", period: "Active", color: "amber" },
      { title: "MITIGATION", value: "98.5%", change: "+1.2%", trend: "up", period: "Coverage", color: "amber" }
    ],
    // Performance Stack
    [
      { title: "UPTIME", value: "99.9%", change: "+0.1%", trend: "up", period: "SLA", color: "rose" },
      { title: "THROUGHPUT", value: "5.2K", change: "+8%", trend: "up", period: "Ops/Sec", color: "rose" },
      { title: "EFFICIENCY", value: "87.3%", change: "+4.1%", trend: "up", period: "Resource", color: "rose" }
    ]
  ]
  
  // Handle KPI card stack navigation
  const handleKpiCardScroll = (cardIndex: number, event: React.WheelEvent) => {
    event.preventDefault()
    
    if (kpiTransitioning[cardIndex]) return
    
    const newTransitioning = [...kpiTransitioning]
    newTransitioning[cardIndex] = true
    setKpiTransitioning(newTransitioning)
    
    const delta = event.deltaY
    const newCurrentCards = [...currentKpiCards]
    
    if (delta > 0) {
      // Next card
      newCurrentCards[cardIndex] = (newCurrentCards[cardIndex] + 1) % kpiCardStacks[cardIndex].length
    } else {
      // Previous card
      newCurrentCards[cardIndex] = (newCurrentCards[cardIndex] - 1 + kpiCardStacks[cardIndex].length) % kpiCardStacks[cardIndex].length
    }
    
    setCurrentKpiCards(newCurrentCards)
    
    // Reset transition state
    setTimeout(() => {
      const resetTransitioning = [...kpiTransitioning]
      resetTransitioning[cardIndex] = false
      setKpiTransitioning(resetTransitioning)
    }, 600)
  }
  
  // Handle mouse wheel scroll for card navigation
  const handleRevenueCardScroll = (event: React.WheelEvent) => {
    event.preventDefault()
    
    if (isTransitioning) return // Prevent rapid scrolling
    
    const delta = event.deltaY
    setIsTransitioning(true)
    
    if (delta > 0) {
      // Scroll down - next card (flip forward)
      setFlipDirection('forward')
      setCurrentRevenueCard((prev) => (prev + 1) % revenueCards.length)
    } else {
      // Scroll up - previous card (flip backward)
      setFlipDirection('backward')
      setCurrentRevenueCard((prev) => (prev - 1 + revenueCards.length) % revenueCards.length)
    }
    
    // Reset transition state after animation
    setTimeout(() => setIsTransitioning(false), 600)
  }

  return (
    <motion.div 
      className="w-full h-screen bg-gradient-to-br from-black via-gray-950 to-slate-900 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Traditional Application Menu Bar */}
      <div className="h-8 bg-black/20 backdrop-blur-sm flex items-center px-4 border-b border-white/5">
        {/* Left: Menu Items */}
        <div className="flex items-center space-x-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={item}
              className="text-white/70 text-sm hover:text-white/90 cursor-pointer transition-colors duration-200"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
            >
              {item}
            </motion.div>
          ))}
        </div>

        {/* Right: Riskill Logo */}
        <div className="ml-auto">
          <motion.div
            className="w-6 h-6 rounded-full bg-gradient-to-br from-white/20 via-white/10 to-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* 8px spacing */}
      <div className="h-2" />

      {/* Top Metrics Zone - 80px height */}
      <motion.div 
        className="h-20 bg-gradient-to-r from-slate-900/30 via-gray-800/20 to-slate-900/30 backdrop-blur-md border-b border-white/[0.02] flex items-center px-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
      >
        {/* Five Responsive KPI Cards */}
        <div className="flex-1 grid grid-cols-5 gap-3 px-1 h-full">
          {[
            {
              title: "Revenue",
              value: "$2.4M",
              change: "+12.5%",
              trend: "up",
              gradient: "from-emerald-500/20 via-emerald-600/10 to-slate-800/30",
              period: "Q4 2024"
            },
            { title: "Analytics", isStack: true, stackIndex: 0 },
            { title: "Intelligence", isStack: true, stackIndex: 1 },
            { title: "Risk", isStack: true, stackIndex: 2 },
            { title: "Performance", isStack: true, stackIndex: 3 }
          ].map((kpi, index) => (
            <motion.div
              key={kpi.title}
              className="relative rounded-lg flex flex-col justify-center h-full cursor-pointer transition-all duration-300 ease-out p-3"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                perspective: '1000px'
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5, ease: "easeOut" }}
              whileHover={{
                scale: 1.05,
                y: -2,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderColor: "rgba(255, 255, 255, 0.2)",
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              whileTap={{
                scale: 0.98,
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                transition: { duration: 0.1 }
              }}
              onHoverStart={() => {}}
              onHoverEnd={() => {}}
              onWheel={kpi.isStack ? (e) => handleKpiCardScroll(kpi.stackIndex, e) : undefined}
            >
              {/* Revenue Card - Special carousel implementation */}
              {index === 0 ? (
                <div 
                  className="relative h-full w-full overflow-hidden"
                  onWheel={handleRevenueCardScroll}
                >
                  <div className="relative h-full w-full">
                    <div className="relative h-full w-full" style={{ perspective: '1000px' }}>
                      <motion.div 
                        className="relative h-full w-full flex flex-col justify-between py-2 px-2"
                        style={{
                          background: 'rgba(255, 255, 255, 0.02)',
                          backdropFilter: 'blur(20px)',
                          borderRadius: '8px',
                          transformStyle: 'preserve-3d',
                          backfaceVisibility: 'hidden'
                        }}
                        key={currentRevenueCard}
                        initial={{ 
                          rotateX: flipDirection === 'forward' ? 90 : -90,
                          opacity: 0,
                          scale: 0.9
                        }}
                        animate={{ 
                          rotateX: 0,
                          opacity: 1,
                          scale: 1
                        }}
                        exit={{ 
                          rotateX: flipDirection === 'forward' ? -90 : 90,
                          opacity: 0,
                          scale: 0.9
                        }}
                        transition={{ 
                          duration: 0.6, 
                          ease: "easeInOut",
                          type: "spring",
                          stiffness: 100,
                          damping: 20
                        }}
                      >
                        <div className="text-white/50 text-[10px] font-semibold uppercase tracking-wider mb-1">
                          {revenueCards[currentRevenueCard].title}
                        </div>
                        
                        <div className="flex-1 flex flex-col justify-center items-center">
                          <div className="text-white/95 text-xl font-bold mb-1">
                            {revenueCards[currentRevenueCard].value}
                          </div>
                          <div className="text-emerald-400 text-xs font-semibold">
                            {revenueCards[currentRevenueCard].change}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-1">
                          <div className="text-white/40 text-[9px] font-medium">
                            {revenueCards[currentRevenueCard].period}
                          </div>
                          <div className="text-white/30 text-[9px]">
                            {currentRevenueCard + 1}/{revenueCards.length}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    
                    <div className="absolute top-1 right-1 flex flex-col space-y-0.5">
                      {revenueCards.map((_, index) => (
                        <div
                          key={index}
                          className={`w-1 h-1 rounded-full transition-all duration-200 ${
                            index === currentRevenueCard ? 'bg-emerald-400/80' : 'bg-white/20'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : kpi.isStack ? (
                <div className="relative h-full w-full">
                  <div className="text-white/50 text-[10px] font-semibold uppercase tracking-wider mb-1">
                    {kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].title}
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-center items-center">
                    <div className="text-white/95 text-xl font-bold mb-1">
                      {kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].value}
                    </div>
                    <div className={`text-xs font-semibold ${
                      kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].color === 'blue' ? 'text-blue-400' :
                      kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].color === 'purple' ? 'text-purple-400' :
                      kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].color === 'amber' ? 'text-amber-400' :
                      'text-rose-400'
                    }`}>
                      {kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].change}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                    <div className="text-white/40 text-[9px] font-medium">
                      {kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].period}
                    </div>
                    <div className="text-white/30 text-[9px]">
                      {currentKpiCards[kpi.stackIndex] + 1}/{kpiCardStacks[kpi.stackIndex].length}
                    </div>
                  </div>
                  
                  <div className="absolute top-1 right-1 flex flex-col space-y-0.5 z-20">
                    {kpiCardStacks[kpi.stackIndex].map((_, index) => (
                      <div
                        key={index}
                        className={`w-1 h-1 rounded-full transition-all duration-200 ${
                          index === currentKpiCards[kpi.stackIndex] ? 
                          (kpiCardStacks[kpi.stackIndex][index].color === 'blue' ? 'bg-blue-400/80' :
                           kpiCardStacks[kpi.stackIndex][index].color === 'purple' ? 'bg-purple-400/80' :
                           kpiCardStacks[kpi.stackIndex][index].color === 'amber' ? 'bg-amber-400/80' :
                           'bg-rose-400/80') : 'bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-white/30 text-xs text-center">
                  {kpi.title}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Content Grid - 3fr-6fr-3fr layout */}
      <div className="flex-1 grid grid-cols-12 gap-4 p-4">
        {/* Left Panel - Analyst Panel (2 columns) */}
        <motion.div 
          className="col-span-2 bg-gradient-to-b from-slate-800/20 via-gray-900/10 to-slate-800/20 backdrop-blur-sm rounded-lg p-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        >
          <h3 className="text-white/70 text-sm font-semibold mb-4">Analyst Panel</h3>
          <div className="text-white/40 text-xs">Analytics content here...</div>
        </motion.div>

        {/* Center Panel - Strategy Narrative Center (8 columns) */}
        <motion.div 
          className="col-span-8 bg-gradient-to-b from-slate-800/20 via-gray-900/10 to-slate-800/20 backdrop-blur-sm rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
        >
          <h3 className="text-white/70 text-lg font-semibold mb-4">Strategy Narrative Center</h3>
          <div className="text-white/40 text-sm">Main content area...</div>
        </motion.div>

        {/* Right Panel - Discovery Stack (2 columns) */}
        <motion.div 
          className="col-span-2 bg-gradient-to-b from-slate-800/20 via-gray-900/10 to-slate-800/20 backdrop-blur-sm rounded-lg p-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        >
          <h3 className="text-white/70 text-sm font-semibold mb-4">Discovery Stack</h3>
          <div className="text-white/40 text-xs">Discovery content here...</div>
        </motion.div>
      </div>

      {/* Intelligence Modules Footer - 120px height */}
      <motion.div 
        className="h-30 bg-gradient-to-r from-slate-900/40 via-gray-800/30 to-slate-900/40 backdrop-blur-md border-t border-white/[0.02] p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex space-x-4 overflow-x-auto">
          {[
            { name: "Risk Engine", status: "active", color: "emerald" },
            { name: "Portfolio Analytics", status: "processing", color: "blue" },
            { name: "Market Intelligence", status: "standby", color: "purple" },
            { name: "Compliance Monitor", status: "active", color: "amber" },
            { name: "Threat Detection", status: "processing", color: "rose" },
            { name: "AI Assistant", status: "active", color: "cyan" }
          ].map((module, index) => (
            <motion.div
              key={module.name}
              className="flex-shrink-0 bg-gradient-to-b from-slate-700/30 via-gray-800/20 to-slate-700/30 backdrop-blur-sm rounded-lg p-3 min-w-[140px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 + index * 0.1, duration: 0.5, ease: "easeOut" }}
            >
              <div className="text-white/70 text-xs font-medium mb-1">{module.name}</div>
              <div className={`text-[10px] font-semibold ${
                module.status === 'active' ? 'text-emerald-400' :
                module.status === 'processing' ? 'text-blue-400' : 'text-white/40'
              }`}>
                {module.status.toUpperCase()}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default RiskillEnterpriseDashboard
