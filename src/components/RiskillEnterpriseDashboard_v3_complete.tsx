import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const RiskillEnterpriseDashboard: React.FC = () => {
  const menuItems = ['File', 'Edit', 'View', 'Tools', 'Window', 'Help']
  
  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  
  // KPI widgets order state for drag and drop
  const [kpiOrder, setKpiOrder] = useState(['revenue', 'churn', 'coordination', 'risk', 'performance'])
  
  // Handle drag end for KPI widgets
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (active.id !== over?.id) {
      setKpiOrder((items) => {
        const oldIndex = items.findIndex((item) => item === active.id)
        const newIndex = items.findIndex((item) => item === over?.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }
  
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
      subtitle: "Total"
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
    // Customer Churn Stack
    [
      { title: "CHURN RATE", value: "2.8%", change: "-0.4%", trend: "up", period: "Monthly", color: "orange" },
      { title: "AT RISK", value: "147", change: "-23", trend: "up", period: "Customers", color: "orange" },
      { title: "RETENTION", value: "97.2%", change: "+0.4%", trend: "up", period: "Rate", color: "orange" }
    ],
    // Coordination Stack
    [
      { title: "MEETINGS", value: "3", change: "+1", trend: "up", period: "Today", color: "blue", subtitle: "Next: 2:30 PM" },
      { title: "EMAILS", value: "47", change: "+12", trend: "up", period: "Unread", color: "blue", subtitle: "Priority: 8" },
      { title: "MESSAGES", value: "23", change: "+5", trend: "up", period: "Slack/Teams", color: "blue", subtitle: "@mentions: 4" }
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
  
  // Hover state for functional interactions
  const [hoveredWidget, setHoveredWidget] = useState<string | null>(null)
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 })
  const [hoverTimeout, setHoverTimeout] = useState<number | null>(null)

  // Handle KPI card stack navigation
  const handleKpiCardScroll = (cardIndex: number, event: React.WheelEvent) => {
    event.preventDefault()
    
    // Exit hover overlay when scrolling
    setHoveredWidget(null)
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
    
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
    
    // Exit hover overlay when scrolling
    setHoveredWidget(null)
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
    
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
      className="w-full h-screen relative flex flex-col overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Photographic Background Layer */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Overlay for proper contrast */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
      
      {/* Content Layer */}
      <div className="relative z-20 w-full h-full flex flex-col">
      {/* Traditional Application Menu Bar */}
      <div 
        className="h-8 flex items-center px-4 border-b border-white/20"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.03) 100%)',
          backdropFilter: 'blur(32px) saturate(1.2)',
          WebkitBackdropFilter: 'blur(32px) saturate(1.2)'
        }}
      >
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

      {/* Top Metrics Zone - 144px height with extra clearance */}
      <motion.div 
        className="h-36 bg-gradient-to-r from-slate-900/30 via-gray-800/20 to-slate-900/30 backdrop-blur-md border-b border-white/[0.02] flex items-center px-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
      >
        {/* Five Draggable KPI Cards */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={kpiOrder}
            strategy={horizontalListSortingStrategy}
          >
            <div className="flex-1 grid grid-cols-5 gap-3 px-1 h-full">
              {kpiOrder.map((widgetId, index) => {
                // Map widget ID to KPI data
                const kpi = widgetId === 'revenue' ? {
                  title: "Revenue",
                  value: "$2.4M",
                  change: "+12.5%",
                  trend: "up",
                  gradient: "from-emerald-500/20 via-emerald-600/10 to-slate-800/30",
                  period: "Q4 2024"
                } : {
                  title: widgetId === 'churn' ? 'Customer Churn' : 
                         widgetId === 'coordination' ? 'Communications' :
                         widgetId === 'risk' ? 'Security Risks' :
                         widgetId === 'performance' ? 'Performance' : widgetId.charAt(0).toUpperCase() + widgetId.slice(1),
                  isStack: true,
                  stackIndex: widgetId === 'churn' ? 0 : widgetId === 'coordination' ? 1 : widgetId === 'risk' ? 2 : 3
                }
                
                const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: widgetId })
                
                const combinedStyle = {
                  transform: CSS.Transform.toString(transform),
                  transition,
                  background: `
                    linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%),
                    linear-gradient(225deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(0, 0, 0, 0.15) 100%)
                  `,
                  backdropFilter: 'blur(32px) saturate(1.2)',
                  WebkitBackdropFilter: 'blur(32px) saturate(1.2)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.25)',
                  borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: `
                    0 16px 48px rgba(0, 0, 0, 0.35),
                    0 8px 24px rgba(0, 0, 0, 0.20),
                    inset 0 1px 0 rgba(255, 255, 255, 0.15),
                    inset 0 -1px 0 rgba(255, 255, 255, 0.05),
                    inset 1px 0 0 rgba(255, 255, 255, 0.10),
                    inset -1px 0 0 rgba(0, 0, 0, 0.12)
                  `
                }
                
                return (
            <motion.div
              key={widgetId}
              ref={setNodeRef}
              {...attributes}
              {...listeners}
              className="relative rounded-lg flex flex-col justify-center h-full cursor-grab active:cursor-grabbing transition-all duration-300 ease-out p-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5, ease: "easeOut" }}
              style={{
                ...combinedStyle,
                boxShadow: hoveredWidget === widgetId 
                  ? "0 16px 48px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 0 0 2px rgba(255, 255, 255, 0.1)"
                  : "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                perspective: '1000px',
                transform: hoveredWidget === widgetId ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)'
              }}
              onWheel={kpi.isStack ? (e) => handleKpiCardScroll(kpi.stackIndex, e) : undefined}
              onMouseEnter={(e) => {
                // Clear any existing timeout
                if (hoverTimeout) {
                  clearTimeout(hoverTimeout)
                }
                
                // Set hover with slight delay for smoothness
                const timeout = window.setTimeout(() => {
                  setHoveredWidget(widgetId)
                  setHoverPosition({ x: e.clientX, y: e.clientY })
                }, 150)
                
                setHoverTimeout(timeout)
              }}
              onMouseLeave={() => {
                // Clear timeout and exit hover
                if (hoverTimeout) {
                  clearTimeout(hoverTimeout)
                  setHoverTimeout(null)
                }
                setHoveredWidget(null)
              }}
              onMouseMove={(e) => {
                // Update position if already hovering
                if (hoveredWidget === widgetId) {
                  setHoverPosition({ x: e.clientX, y: e.clientY })
                }
              }}
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
                        className="relative h-full w-full flex flex-col justify-between p-4"
                        style={{
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
                        {/* Simplified Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-400/80"></div>
                            <div className="text-white/70 text-xs font-medium uppercase tracking-wide">
                              {revenueCards[currentRevenueCard].title}
                            </div>
                          </div>
                          <div className="text-white/40 text-xs">
                            {revenueCards[currentRevenueCard].period}
                          </div>
                        </div>
                        
                        {/* Clean Main Value Display */}
                        <div className="flex-1 flex items-center justify-between">
                          <div className="flex flex-col space-y-1">
                            <div className="text-white text-2xl font-bold leading-none">
                              {revenueCards[currentRevenueCard].value}
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="text-emerald-400 text-sm font-medium">
                                {revenueCards[currentRevenueCard].change}
                              </div>
                              <div className="text-white/50 text-sm">
                                {revenueCards[currentRevenueCard].subtitle}
                              </div>
                            </div>
                          </div>
                          
                          {/* Mini Revenue Chart */}
                          <div className="flex items-end space-x-0.5 h-8">
                            {[65, 78, 82, 88, 95, 100].map((height, index) => (
                              <div
                                key={index}
                                className="w-1 bg-gradient-to-t from-emerald-500/40 to-emerald-400/80 rounded-sm"
                                style={{ height: `${height * 0.3}px` }}
                              />
                            ))}
                          </div>
                        </div>
                        
                        {/* Footer with progress indicator */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex space-x-1">
                            {revenueCards.map((_, index) => (
                              <div
                                key={index}
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                  index === currentRevenueCard ? 'bg-emerald-400/80 scale-125' : 'bg-white/20'
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-white/30 text-[10px] font-medium">
                            {currentRevenueCard + 1} of {revenueCards.length}
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
                <div className="relative h-full w-full p-4">
                  {/* Header with colored indicator and title */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].color === 'orange' ? 'bg-orange-400/80' :
                        kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].color === 'blue' ? 'bg-blue-400/80' :
                        kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].color === 'purple' ? 'bg-purple-400/80' :
                        kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].color === 'amber' ? 'bg-amber-400/80' :
                        'bg-rose-400/80'
                      }`}></div>
                      <div className="text-white/60 text-[11px] font-semibold uppercase tracking-wider">
                        {kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].title}
                      </div>
                    </div>
                    <div className="text-white/30 text-[10px] font-medium">
                      {kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].period}
                    </div>
                  </div>
                  
                  {/* Main value display with visualization */}
                  <div className="flex-1 flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="text-white/95 text-lg font-bold leading-none mb-1">
                        {kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].value}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`text-sm font-semibold ${
                          kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].color === 'orange' ? 'text-orange-400' :
                          kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].color === 'blue' ? 'text-blue-400' :
                          kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].color === 'purple' ? 'text-purple-400' :
                          kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].color === 'amber' ? 'text-amber-400' :
                          'text-rose-400'
                        }`}>
                          {kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].change}
                        </div>
                        <div className="text-white/40 text-xs">
                          {kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].trend === 'up' ? '↗' : 
                           kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].trend === 'down' ? '↘' : '→'}
                        </div>
                      </div>
                    </div>
                    
                    {/* Dynamic Visualization based on widget type */}
                    {kpi.stackIndex === 0 ? (
                      /* Customer Churn - Donut Chart */
                      <div className="relative w-8 h-8">
                        <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                          <circle cx="16" cy="16" r="12" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4"/>
                          <circle cx="16" cy="16" r="12" fill="none" stroke="rgb(251 146 60)" strokeWidth="4"
                            strokeDasharray={`${97.2 * 0.75} 75`} strokeLinecap="round"/>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-[8px] text-orange-400 font-bold">
                          97%
                        </div>
                      </div>
                    ) : kpi.stackIndex === 1 ? (
                      /* Coordination - Communication Dashboard */
                      <div className="flex flex-col space-y-1 w-16">
                        {/* Calendar Mini View */}
                        <div className="bg-blue-500/20 rounded p-1 text-center">
                          <div className="text-[6px] text-blue-300 font-bold">FRI</div>
                          <div className="text-[8px] text-white font-bold">20</div>
                        </div>
                        {/* Communication Indicators */}
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-0.5">
                            {/* Email indicator */}
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                            {/* Slack indicator */}
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                            {/* Teams indicator */}
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                          </div>
                          {/* Meeting time indicator */}
                          <div className="text-[6px] text-blue-300 font-mono">2:30</div>
                        </div>
                        {/* Activity bar */}
                        <div className="w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-400 to-green-400 rounded-full" style={{ width: '68%' }}></div>
                        </div>
                      </div>
                    ) : kpi.stackIndex === 2 ? (
                      /* Risk - Progress Bar */
                      <div className="w-12 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-1000"
                          style={{ width: '72%' }}
                        />
                      </div>
                    ) : (
                      /* Performance - Sparkline */
                      <div className="flex items-end space-x-0.5 h-6">
                        {[8, 12, 10, 15, 18, 16].map((height, index) => (
                          <div
                            key={index}
                            className="w-0.5 bg-gradient-to-t from-rose-500/40 to-rose-400/80 rounded-sm"
                            style={{ height: `${height}px` }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Footer with progress indicator */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex space-x-1">
                      {kpiCardStacks[kpi.stackIndex].map((_, index) => (
                        <div
                          key={index}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            index === currentKpiCards[kpi.stackIndex] ? 
                            (kpiCardStacks[kpi.stackIndex][index].color === 'orange' ? 'bg-orange-400/80 scale-125' :
                             kpiCardStacks[kpi.stackIndex][index].color === 'blue' ? 'bg-blue-400/80 scale-125' :
                             kpiCardStacks[kpi.stackIndex][index].color === 'purple' ? 'bg-purple-400/80 scale-125' :
                             kpiCardStacks[kpi.stackIndex][index].color === 'amber' ? 'bg-amber-400/80 scale-125' :
                             'bg-rose-400/80 scale-125') : 'bg-white/20'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-white/30 text-[10px] font-medium">
                      {currentKpiCards[kpi.stackIndex] + 1} of {kpiCardStacks[kpi.stackIndex].length}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-white/30 text-xs text-center">
                  {kpi.title}
                </div>
              )}
            </motion.div>
                )
              })}
            </div>
          </SortableContext>
        </DndContext>
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
              className="flex-shrink-0 rounded-lg p-3 min-w-[140px]"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
                backdropFilter: 'blur(24px) saturate(1.1)',
                WebkitBackdropFilter: 'blur(24px) saturate(1.1)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
              }}
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
      
      {/* Functional Hover Overlay */}
      {hoveredWidget && (
        <motion.div
          className="fixed z-50 pointer-events-none"
          style={{
            left: Math.min(hoverPosition.x + 20, window.innerWidth - 340),
            top: Math.max(hoverPosition.y - 120, 20),
            maxWidth: '320px'
          }}
          initial={{ opacity: 0, scale: 0.85, y: 20, x: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20, x: -10 }}
          transition={{ 
            duration: 0.3, 
            ease: [0.25, 0.46, 0.45, 0.94],
            opacity: { duration: 0.2 },
            scale: { duration: 0.3, ease: "easeOut" }
          }}
        >
          <div 
            className="rounded-lg p-4 shadow-2xl border border-white/20"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
              backdropFilter: 'blur(40px) saturate(1.3)',
              WebkitBackdropFilter: 'blur(40px) saturate(1.3)'
            }}
          >
            {/* Dynamic Content Based on Widget */}
            {hoveredWidget === 'revenue' && (
              <div className="space-y-3">
                <div className="text-white/90 text-sm font-semibold mb-2">Revenue Breakdown</div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/70">Recurring Revenue:</span>
                    <span className="text-emerald-400 font-medium">$1.8M (75%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">New Business:</span>
                    <span className="text-blue-400 font-medium">$600K (25%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Growth Rate:</span>
                    <span className="text-purple-400 font-medium">+18.4% YoY</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-white/10">
                  <div className="text-white/60 text-xs">💡 Trending 12% above forecast</div>
                </div>
              </div>
            )}
            
            {hoveredWidget === 'churn' && (
              <div className="space-y-3">
                <div className="text-white/90 text-sm font-semibold mb-2">Customer Health</div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/70">At-Risk Customers:</span>
                    <span className="text-orange-400 font-medium">147 accounts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Retention Rate:</span>
                    <span className="text-emerald-400 font-medium">97.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Avg. Lifetime Value:</span>
                    <span className="text-blue-400 font-medium">$24.5K</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-white/10">
                  <div className="text-white/60 text-xs">⚡ 23 customers recovered this month</div>
                </div>
              </div>
            )}
            
            {hoveredWidget === 'coordination' && (
              <div className="space-y-3">
                <div className="text-white/90 text-sm font-semibold mb-2">Communication Hub</div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/70">Next Meeting:</span>
                    <span className="text-blue-400 font-medium">2:30 PM - Strategy</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Priority Emails:</span>
                    <span className="text-amber-400 font-medium">8 unread</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Team Messages:</span>
                    <span className="text-purple-400 font-medium">4 @mentions</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-white/10">
                  <div className="text-white/60 text-xs">📅 Board meeting prep due tomorrow</div>
                </div>
              </div>
            )}
            
            {hoveredWidget === 'risk' && (
              <div className="space-y-3">
                <div className="text-white/90 text-sm font-semibold mb-2">Security Status</div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/70">Active Threats:</span>
                    <span className="text-red-400 font-medium">3 medium-risk</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Mitigation:</span>
                    <span className="text-emerald-400 font-medium">98.5% coverage</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Last Scan:</span>
                    <span className="text-blue-400 font-medium">2 hours ago</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-white/10">
                  <div className="text-white/60 text-xs">🛡️ All critical systems protected</div>
                </div>
              </div>
            )}
            
            {hoveredWidget === 'performance' && (
              <div className="space-y-3">
                <div className="text-white/90 text-sm font-semibold mb-2">System Performance</div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/70">Uptime SLA:</span>
                    <span className="text-emerald-400 font-medium">99.9%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Response Time:</span>
                    <span className="text-blue-400 font-medium">127ms avg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Throughput:</span>
                    <span className="text-purple-400 font-medium">5.2K ops/sec</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-white/10">
                  <div className="text-white/60 text-xs">🚀 Performance trending +8% this week</div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
      
      </div>
    </motion.div>
  )
}

export default RiskillEnterpriseDashboard
