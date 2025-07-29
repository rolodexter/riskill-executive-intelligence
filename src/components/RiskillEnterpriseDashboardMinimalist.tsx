import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Minimalist2Footer from './Minimalist2Footer'
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

const RiskillEnterpriseDashboardMinimalist: React.FC = () => {
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

  // KPI Auto-scroll state
  const [kpiAutoScrollPaused, setKpiAutoScrollPaused] = useState<{[key: string]: boolean}>({
    revenue: false,
    churn: false,
    coordination: false,
    risk: false,
    performance: false,
    anomalies: false
  })
  const [kpiAutoScrollIntervals, setKpiAutoScrollIntervals] = useState<{[key: string]: number}>({})

  // Anomalies widget state
  const [anomalies] = useState({
    high: [
      { id: 1, title: 'Revenue spike +47% in EMEA region', description: 'Unusual pattern detected', trend: 'up', severity: 'high', time: '2 min ago' },
      { id: 2, title: 'API response time 2.3x normal baseline', description: 'Performance degrading', trend: 'down', severity: 'high', time: '4 min ago' },
      { id: 3, title: 'Failed login attempts 15x increase', description: 'Security concern flagged', trend: 'up', severity: 'high', time: '6 min ago' }
    ],
    medium: [
      { id: 4, title: 'Database query performance declining 23%', description: 'Gradual degradation', trend: 'down', severity: 'medium', time: '8 min ago' },
      { id: 5, title: 'Memory utilization trending upward', description: '82% average usage', trend: 'up', severity: 'medium', time: '12 min ago' },
      { id: 6, title: 'Customer acquisition cost anomaly', description: 'CAC increased 18%', trend: 'up', severity: 'medium', time: '15 min ago' },
      { id: 7, title: 'Network bandwidth usage irregular', description: 'Unusual traffic patterns', trend: 'neutral', severity: 'medium', time: '18 min ago' },
      { id: 8, title: 'Backup completion time variance', description: 'Taking 34% longer', trend: 'down', severity: 'medium', time: '22 min ago' },
      { id: 9, title: 'Email delivery rate declining', description: 'Down to 94.2%', trend: 'down', severity: 'medium', time: '25 min ago' },
      { id: 10, title: 'User session duration anomaly', description: 'Sessions 28% shorter', trend: 'down', severity: 'medium', time: '28 min ago' }
    ],
    low: [
      { id: 11, title: 'Minor configuration drift detected', description: 'Non-critical variance', trend: 'neutral', severity: 'low', time: '32 min ago' },
      { id: 12, title: 'Log rotation timing variance', description: 'Slight delay in cleanup', trend: 'neutral', severity: 'low', time: '35 min ago' }
      // Additional low priority items would be here
    ]
  })
  
  const [expandedSections, setExpandedSections] = useState({ high: true, medium: false, low: false })
  const [lastScanTime, setLastScanTime] = useState('2 min ago')
  const [isScanning, setIsScanning] = useState(false)

  // Opportunities widget state
  const [currentOpportunity, setCurrentOpportunity] = useState(0)
  const [, setIsGeneratingOpportunity] = useState(false)
  const [opportunityTypewriterText, setOpportunityTypewriterText] = useState('')
  const [showOpportunityMetrics, setShowOpportunityMetrics] = useState(false)
  const [opportunityAnimationPhase, setOpportunityAnimationPhase] = useState<'thinking' | 'typing' | 'revealing' | 'complete'>('complete')
  const [, setOpportunityUpdateCounter] = useState(0)
  const [, setIsAiSynthesizing] = useState(false)

  // Initialize opportunity animations on component mount
  useEffect(() => {
    // Set initial state to show metrics for the first opportunity
    setOpportunityTypewriterText(opportunities[0].summary)
    setShowOpportunityMetrics(true)
  }, [])

  // Get current narrative (regular only - no demo sequence)
  const getCurrentNarrative = () => {
    return narrativeInsights[currentNarrative]
  }
  
  const opportunities = [
    {
      id: 1,
      title: 'Cross-Platform Revenue Optimization',
      summary: 'Enterprise customers using mobile + desktop generate 234% more revenue when onboarded during Q4',
      impact: '$3.2M additional ARR',
      confidence: 96
    },
    {
      id: 2,
      title: 'Inverse Churn Prediction Model',
      summary: 'Customers who reduce usage by 23% in month 4 but increase email opens by 12% become advocates',
      impact: '$1.8M referral pipeline',
      confidence: 94
    },
    {
      id: 3,
      title: 'Competitive Intelligence Synthesis',
      summary: 'Strategic content deployment 72 hours after competitor Friday releases increases trial signups 67%',
      impact: '$890K additional ARR',
      confidence: 91
    },
    {
      id: 4,
      title: 'Organizational Network Effect',
      summary: 'Remote teams using collaborative features during 2-4 PM generate 156% more cross-sell opportunities',
      impact: '$2.1M cross-sell potential',
      confidence: 88
    }
  ]

  // Strategy Narrative Center state
  const [currentNarrative, setCurrentNarrative] = useState(0)
  const [, setNarrativeUpdateCounter] = useState(0)
  const [isAdamThinking, setIsAdamThinking] = useState(false)
  


  const narrativeInsights = [
    {
      id: 1,
      priority: 'high',
      taskTitle: 'EMEA Growth vs Infrastructure Analysis',
      taskSubtitle: 'Revenue surge creating performance bottlenecks',
      message: "Joe, I've been watching your EMEA numbers this morning and something remarkable is happening. Your revenue is up 47% - but here's what's really interesting...",
      details: "I noticed your API response times are degrading right as this growth is hitting. Your customers are about to feel this.",
      context: "Based on what I'm seeing in Salesforce, ServiceNow, and your infrastructure logs, you have about 2 weeks before this becomes a customer experience problem.",
      recommendation: "Want me to draft the infrastructure scaling plan? I can have it ready in 10 minutes using your budget parameters.",
      actions: ['Draft scaling plan', 'Show me the data', 'Customer impact analysis'],
      confidence: 94,
      sources: ['Salesforce', 'ServiceNow', 'Infrastructure Logs', 'Revenue Analytics']
    },
    {
      id: 2,
      priority: 'medium',
      taskTitle: 'Q4 Performance & Enterprise Upsell Analysis',
      taskSubtitle: 'Churn stabilization reveals $2.3M opportunity',
      message: "Joe, three things caught my attention this morning that you need to know about your Q4 performance...",
      details: "Your customer churn pattern I flagged last week is stabilizing - your retention strategy is working. But there's more.",
      context: "I'm seeing an unusual revenue pattern in your enterprise accounts that suggests an upsell opportunity worth approximately $2.3M.",
      recommendation: "Should I prepare the enterprise upsell analysis? I can identify the specific accounts and optimal timing.",
      actions: ['Enterprise upsell analysis', 'Retention deep dive', 'Revenue pattern details'],
      confidence: 87,
      sources: ['HubSpot', 'Customer Success Platform', 'Revenue Analytics', 'Churn Models']
    },
    {
      id: 3,
      priority: 'insight',
      taskTitle: 'Security Intelligence & Customer Protection',
      taskSubtitle: 'Coordinated attacks on high-value accounts detected',
      message: "Joe, I've been analyzing the correlation between your recent security incidents and customer behavior...",
      details: "The failed login attempts we flagged aren't random - they're targeting your highest-value enterprise accounts.",
      context: "This suggests a coordinated effort, but here's the interesting part: your security response time has improved 340% since last quarter.",
      recommendation: "I recommend we brief your enterprise customers on the enhanced security measures. This could actually become a competitive advantage.",
      actions: ['Security briefing draft', 'Enterprise communication plan', 'Competitive analysis'],
      confidence: 91,
      sources: ['Security Logs', 'Customer Data', 'Threat Intelligence', 'Response Analytics']
    },
    {
      id: 4,
      priority: 'opportunity',
      taskTitle: 'Remote Work Productivity Assessment',
      taskSubtitle: 'Hybrid policies showing measurable ROI',
      message: "Joe, your team's productivity metrics are telling an interesting story about remote work effectiveness...",
      details: "I'm seeing a 23% increase in cross-functional collaboration since implementing the new communication tools.",
      context: "More importantly, this correlates directly with a 18% improvement in project delivery times and customer satisfaction scores.",
      recommendation: "This data could support your case for permanent hybrid work policies. Want me to prepare the executive summary?",
      actions: ['Productivity report', 'ROI analysis', 'Policy recommendations'],
      confidence: 89,
      sources: ['Teams Analytics', 'Project Management', 'HR Systems', 'Customer Feedback']
    }
  ]

  const [adamTasks, setAdamTasks] = useState([
    { id: 1, title: 'Q4 Revenue Forecast', progress: 87, priority: 'high', eta: '15 min' },
    { id: 2, title: 'Customer Health Score Update', progress: 45, priority: 'med', eta: '32 min' },
    { id: 3, title: 'Security Compliance Report', progress: 92, priority: 'high', eta: '8 min' }
  ])

  // Adam AI Agent real-time animations
  useEffect(() => {
    const interval = setInterval(() => {
      // Adam update counter removed
      
      // Simulate progress updates on tasks
      setAdamTasks(prevTasks => 
        prevTasks.map(task => ({
          ...task,
          progress: Math.min(task.progress + Math.random() * 2, 100),
          eta: task.progress >= 98 ? 'Complete' : `${Math.max(1, parseInt(task.eta) - 1)} min`
        }))
      )
      
      // Activity stream functionality removed for minimalist version
    }, 3000) // Update every 3 seconds
    
    return () => clearInterval(interval)
  }, [])

  // KPI Auto-scroll functionality
  useEffect(() => {
    const widgetIds = ['revenue', 'churn', 'coordination', 'risk', 'performance']
    const intervals: {[key: string]: number} = {}
    
    // Clear existing intervals first
    Object.values(kpiAutoScrollIntervals).forEach(interval => {
      if (interval) clearInterval(interval)
    })
    
    widgetIds.forEach((widgetId) => {
      if (!kpiAutoScrollPaused[widgetId]) {
        const randomInterval = 4000 + Math.random() * 6000 // 4-10 seconds
        
        intervals[widgetId] = window.setInterval(() => {
          setKpiAutoScrollPaused(currentPaused => {
            if (!currentPaused[widgetId]) {
              if (widgetId === 'revenue') {
                // Handle revenue card auto-scroll
                setCurrentRevenueCard(prev => {
                  const newIndex = (prev + 1) % revenueCards.length
                  setFlipDirection('forward')
                  return newIndex
                })
              } else {
                // Handle other KPI cards auto-scroll
                const stackIndex = widgetId === 'churn' ? 0 : 
                                 widgetId === 'coordination' ? 1 : 
                                 widgetId === 'risk' ? 2 : 3
                
                setCurrentKpiCards(prev => {
                  const newCards = [...prev]
                  newCards[stackIndex] = (newCards[stackIndex] + 1) % kpiCardStacks[stackIndex].length
                  return newCards
                })
              }
            }
            return currentPaused
          })
        }, randomInterval)
      }
    })
    
    setKpiAutoScrollIntervals(intervals)
    
    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval))
    }
  }, [revenueCards.length, kpiCardStacks])

  // Pause/Resume auto-scroll functions
  const pauseAutoScroll = (widgetId: string) => {
    setKpiAutoScrollPaused(prev => ({ ...prev, [widgetId]: true }))
  }
  
  const resumeAutoScroll = (widgetId: string) => {
    setTimeout(() => {
      setKpiAutoScrollPaused(prev => ({ ...prev, [widgetId]: false }))
    }, 3000) // Resume after 3 seconds of no interaction
  }

  // Typewriter effect for opportunities
  const startOpportunityGeneration = (opportunityIndex: number) => {
    setOpportunityAnimationPhase('thinking')
    setIsGeneratingOpportunity(true)
    setOpportunityTypewriterText('')
    setShowOpportunityMetrics(false)
    
    // Thinking phase (1.5 seconds)
    setTimeout(() => {
      setOpportunityAnimationPhase('typing')
      const fullText = opportunities[opportunityIndex].summary
      let currentIndex = 0
      
      // Typewriter effect
      const typeInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setOpportunityTypewriterText(fullText.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(typeInterval)
          setOpportunityAnimationPhase('revealing')
          
          // Reveal metrics after typing completes
          setTimeout(() => {
            setShowOpportunityMetrics(true)
            setTimeout(() => {
              setOpportunityAnimationPhase('complete')
              setIsGeneratingOpportunity(false)
            }, 800) // Wait for metrics animation
          }, 300)
        }
      }, 30) // 30ms per character for realistic typing speed
    }, 1500)
  }



  // Anomalies widget functions
  const toggleSection = (section: 'high' | 'medium' | 'low') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // Auto-refresh anomalies scan every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsScanning(true)
      
      // Simulate scan duration
      setTimeout(() => {
        setIsScanning(false)
        setLastScanTime('Just now')
        
        // Update scan time after a moment
        setTimeout(() => {
          setLastScanTime('1 min ago')
        }, 60000)
      }, 2000)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // Strategy Narrative Center functions
  const handleNarrativeAction = (action: string) => {
    setIsAdamThinking(true)
    
    // Simulate Adam processing the request
    setTimeout(() => {
      setIsAdamThinking(false)
      // In a real implementation, this would trigger specific analysis
      console.log(`Adam is processing: ${action}`)
    }, 2000)
  }

  // Auto-cycle through narrative insights every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setNarrativeUpdateCounter(prev => prev + 1)
      setCurrentNarrative(prev => (prev + 1) % narrativeInsights.length)
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  // Auto-cycle through opportunities every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setOpportunityUpdateCounter(prev => prev + 1)
      setIsAiSynthesizing(true)
      
      // Simulate AI synthesis process
      setTimeout(() => {
        setCurrentOpportunity(prev => (prev + 1) % opportunities.length)
        setIsAiSynthesizing(false)
      }, 1500)
    }, 20000)

    return () => clearInterval(interval)
  }, [])

  // Handle KPI card stack navigation
  const handleKpiCardScroll = (widgetIndex: number, event: React.WheelEvent) => {
    event.preventDefault()
    
    const cardIndex = widgetIndex
    const widgetId = cardIndex === 0 ? 'churn' : 
                    cardIndex === 1 ? 'coordination' : 
                    cardIndex === 2 ? 'risk' : 'performance'
    pauseAutoScroll(widgetId)
    
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
    
    const direction = event.deltaY > 0 ? 1 : -1
    const cardCount = kpiCardStacks[cardIndex].length
    const newIndex = direction > 0 
      ? (currentKpiCards[cardIndex] + 1) % cardCount
      : (currentKpiCards[cardIndex] - 1 + cardCount) % cardCount
    
    const newCurrentCards = [...currentKpiCards]
    newCurrentCards[cardIndex] = newIndex
    setCurrentKpiCards(newCurrentCards)
    
    setTimeout(() => {
      const resetTransitioning = [...kpiTransitioning]
      resetTransitioning[cardIndex] = false
      setKpiTransitioning(resetTransitioning)
    }, 600)
    
    resumeAutoScroll(widgetId)
  }
  
  // Handle mouse wheel scroll for card navigation
  const handleRevenueCardScroll = (event: React.WheelEvent) => {
    // Only intercept scroll on desktop (never interfere with mobile touch)
    if ('ontouchstart' in window) {
      return // Allow normal scrolling on mobile
    }
    
    event.preventDefault()
    
    // Exit hover overlay when scrolling
    setHoveredWidget(null)
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
    
    if (isTransitioning) return // Prevent rapid scrolling
    
    const delta = event.deltaY
    const direction = delta > 0 ? 1 : -1
    const newIndex = direction > 0 
      ? (currentRevenueCard + 1) % revenueCards.length
      : (currentRevenueCard - 1 + revenueCards.length) % revenueCards.length
    
    setFlipDirection(direction > 0 ? 'forward' : 'backward')
    setIsTransitioning(true)
    setCurrentRevenueCard(newIndex)
    
    setTimeout(() => setIsTransitioning(false), 600)
  }

  return (
    <motion.div 
      className="w-full h-screen relative flex flex-col overflow-auto"
      style={{
        WebkitOverflowScrolling: 'touch',
        touchAction: 'pan-y',
        overscrollBehavior: 'contain'
      }}
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
      <div className="relative z-20 w-full flex flex-col flex-1 min-h-0 overflow-hidden">
      {/* Traditional Application Menu Bar */}
      <div 
        className="h-8 flex items-center px-4 border-b border-white/20 sticky top-0 z-50"
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
              className="text-white/70 text-sm  cursor-pointer transition-colors duration-200"
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
        className="h-36 mb-8 bg-gradient-to-r from-slate-900/30 via-gray-800/20 to-slate-900/30 backdrop-blur-md border-b border-white/[0.02] flex items-center px-3 z-40 relative"
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
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 px-1 h-full">
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
                
                // Pause auto-scroll for this widget
                pauseAutoScroll(widgetId)
                
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
                
                // Resume auto-scroll for this widget after delay
                resumeAutoScroll(widgetId)
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
                            <div className="text-white text-lg sm:text-xl md:text-xl lg:text-lg xl:text-xl 2xl:text-xl font-normal leading-none">
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
                <div className="relative h-full w-full overflow-hidden">
                  <div className="relative h-full w-full">
                    <div className="relative h-full w-full" style={{ perspective: '1000px' }}>
                      <motion.div 
                        className="relative h-full w-full flex flex-col justify-between p-4"
                        style={{
                          transformStyle: 'preserve-3d',
                          backfaceVisibility: 'hidden'
                        }}
                        key={`${widgetId}-${currentKpiCards[kpi.stackIndex]}`}
                        initial={{ 
                          rotateX: 90,
                          opacity: 0,
                          scale: 0.9
                        }}
                        animate={{ 
                          rotateX: 0,
                          opacity: 1,
                          scale: 1
                        }}
                        exit={{ 
                          rotateX: -90,
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
                        {/* Header with colored indicator and title */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${
                              kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].color === 'orange' ? 'bg-orange-400/80' :
                              kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].color === 'blue' ? 'bg-blue-400/80' :
                              kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].color === 'purple' ? 'bg-purple-400/80' :
                              kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].color === 'amber' ? 'bg-amber-400/80' :
                              'bg-rose-400/80'
                            }`}></div>
                            <div className="text-white/70 text-[10px] xs:text-xs sm:text-xs font-medium uppercase tracking-wide">
                              {kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].title}
                            </div>
                          </div>
                          <div className="text-white/40 text-xs">
                            {kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].period}
                          </div>
                        </div>
                        
                        {/* Main value display with visualization */}
                        <div className="flex-1 flex items-center justify-between">
                          <div className="flex flex-col space-y-1">
                            <div className="text-white text-sm xs:text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-base font-normal leading-none">
                              {kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].value}
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className={`text-xs xs:text-sm sm:text-sm font-medium ${
                                kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].color === 'orange' ? 'text-orange-400' :
                                kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].color === 'blue' ? 'text-blue-400' :
                                kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].color === 'purple' ? 'text-purple-400' :
                                kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].color === 'amber' ? 'text-amber-400' :
                                'text-rose-400'
                              }`}>
                                {kpiCardStacks[kpi.stackIndex][currentKpiCards[kpi.stackIndex]].change}
                              </div>
                              <div className="text-white/50 text-sm">
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
                        <div className="absolute inset-0 flex items-center justify-center text-[8px] text-orange-400 font-normal">
                          97%
                        </div>
                      </div>
                    ) : kpi.stackIndex === 1 ? (
                      /* Coordination - Communication Dashboard */
                      <div className="flex flex-col space-y-1 w-16">
                        {/* Calendar Mini View */}
                        <div className="bg-blue-500/20 rounded p-1 text-center">
                          <div className="text-[6px] text-blue-300 font-normal">FRI</div>
                          <div className="text-[8px] text-white font-normal">20</div>
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
                      </motion.div>
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

      {/* Minimal spacing between KPI widgets and main content */}
      <div className="h-2" />

      {/* Main Content Grid - Responsive layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-2 sm:p-4 min-h-0 overflow-hidden">
        {/* Left Panel - Adam AI Agent Widget (responsive columns) */}
        <motion.div 
          className="lg:col-span-2 rounded-lg p-3 sm:p-4 h-full overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
            backdropFilter: 'blur(24px) saturate(1.1)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.1)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        >
          {/* Adam AI Agent Header */}
          <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-white/10">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
            </div>
            <div>
              <div className="text-white/90 text-sm font-normal">Adam Draper</div>
              <div className="text-white/50 text-xs">AI Business Analyst</div>
            </div>
            <div className="ml-auto">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            </div>
          </div>

          {/* Current Tasks Section */}
          <div className="mb-4">
            <div className="text-white/70 text-xs font-medium mb-2 uppercase tracking-wide">Current Tasks</div>
            <div className="space-y-2">
              {adamTasks.map((task) => (
                <motion.div
                  key={task.id}
                  className="bg-black/20 rounded-md p-2 border border-white/5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + task.id * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-white/80 text-xs font-medium truncate">{task.title}</div>
                    <div className={`text-xs px-2 py-1 rounded-full border ${
                      task.priority === 'high' ? 'text-red-300/70 bg-red-500/10 border-red-500/20' : 
                      task.priority === 'med' ? 'text-amber-300/70 bg-amber-500/10 border-amber-500/20' : 
                      'text-blue-300/70 bg-blue-500/10 border-blue-500/20'
                    }`}>
                      {task.priority}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 bg-white/10 rounded-full h-1.5 mr-2">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-purple-500 h-1.5 rounded-full transition-all duration-1000"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-white/50 text-xs">{task.eta}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Activity Stream Removed for Minimalist Version */}

          {/* Status Footer */}
          <div className="mt-4 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="text-white/50 text-xs">System Status</div>
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                <div className="text-emerald-400 text-xs font-medium">Online</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Center Panel - Strategy Narrative Center (responsive columns) */}
        <motion.div 
          className="lg:col-span-7 rounded-lg p-4 sm:p-6 h-full overflow-hidden cursor-pointer select-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
            backdropFilter: 'blur(24px) saturate(1.1)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.1)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
          onWheel={(e) => {
            // Only intercept scroll on desktop with Shift key (never interfere with mobile touch)
            if (e.shiftKey && !('ontouchstart' in window)) {
              e.preventDefault()
              const delta = e.deltaY
              const direction = delta > 0 ? 1 : -1
              const newIndex = direction > 0 
                ? (currentNarrative + 1) % narrativeInsights.length
                : (currentNarrative - 1 + narrativeInsights.length) % narrativeInsights.length
              setCurrentNarrative(newIndex)
            }
            // Always allow normal scrolling on mobile and when Shift is not pressed
          }}
        >
          {/* Conversational Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                <div className="text-blue-400 text-sm">🤖</div>
              </div>
              <div>
                <div className="text-white/90 text-sm xs:text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-base sm:text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl 2xl:text-xl md:text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl 2xl:text-xl font-normal">{getCurrentNarrative().taskTitle}</div>
                <div className="text-white/50 text-[10px] xs:text-xs sm:text-xs">{getCurrentNarrative().taskSubtitle}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {isAdamThinking && (
                <div className="flex items-center space-x-1">
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              )}
              <div className={`text-xs font-medium ${
                isAdamThinking ? 'text-blue-400' : 'text-emerald-400'
              }`}>
                {isAdamThinking ? 'Thinking...' : 'Active'}
              </div>
            </div>
          </div>

          {/* Main Conversational Content */}
          <div className="flex-1 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentNarrative}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="space-y-4"
              >
                {/* Adam's Message */}
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="text-white/90 text-xs sm:text-sm lg:text-base font-light leading-relaxed">
                        {getCurrentNarrative().message}
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-5 space-y-3">
                    <div className="text-white/70 text-[9px] xs:text-xs sm:text-xs font-light leading-relaxed">
                      {getCurrentNarrative().details}
                    </div>
                    
                    <div className="text-white/60 text-[9px] xs:text-xs sm:text-xs font-light leading-relaxed">
                      {getCurrentNarrative().context}
                    </div>
                    
                    <div className="text-white/80 text-[10px] xs:text-xs sm:text-xs font-normal leading-relaxed">
                      {getCurrentNarrative().recommendation}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="ml-5 flex flex-wrap gap-2">
                  {getCurrentNarrative().actions.map((action, index) => (
                    <motion.button
                      key={action}
                      onClick={() => handleNarrativeAction(action)}
                      className="px-4 py-2 rounded-md text-xs font-medium transition-all duration-200 "
                      style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.15) 100%)',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        color: 'rgba(147, 197, 253, 0.9)'
                      }}
                      whileHover={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(147, 51, 234, 0.25) 100%)',
                        borderColor: 'rgba(59, 130, 246, 0.5)'
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      {action}
                    </motion.button>
                  ))}
                </div>

                {/* Insight Metadata */}
                <div className="ml-5 pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="text-white/40 text-xs">Confidence:</div>
                        <div className="flex items-center space-x-1">
                          <div className={`text-xs font-normal ${
                            getCurrentNarrative().confidence >= 90 ? 'text-emerald-400' :
                            getCurrentNarrative().confidence >= 80 ? 'text-blue-400' : 'text-amber-400'
                          }`}>
                            {getCurrentNarrative().confidence}%
                          </div>
                          <div className={`text-xs ${
                            getCurrentNarrative().confidence >= 90 ? 'text-emerald-400' :
                            getCurrentNarrative().confidence >= 80 ? 'text-blue-400' : 'text-amber-400'
                          }`}>
                            (High)
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="text-white/40 text-xs">Sources:</div>
                        <div className="text-white/60 text-xs">
                          {getCurrentNarrative().sources.length} data sources
                        </div>
                      </div>
                    </div>
                    
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      getCurrentNarrative().priority === 'high' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      getCurrentNarrative().priority === 'medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      getCurrentNarrative().priority === 'insight' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                      getCurrentNarrative().priority === 'action' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                      'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {getCurrentNarrative().priority.toUpperCase()}
                    </div>
                  </div>
                  
                  {/* Data Sources */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {getCurrentNarrative().sources.map((source) => (
                      <div
                        key={source}
                        className="px-2 py-1 bg-white/5 rounded text-xs text-white/50 border border-white/10"
                      >
                        {source}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Footer */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="text-white/40 text-xs">
                Insight {currentNarrative + 1} of {narrativeInsights.length} • Updates every 15s
              </div>
              <div className="flex space-x-1">
                {narrativeInsights.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentNarrative(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentNarrative ? 'bg-blue-400 ' : 'bg-white/20 '
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side Container - Discovery Stack */}
        <div className="lg:col-span-3 flex flex-col gap-4 flex-1 min-h-0 overflow-hidden">
          {/* Anomalies Widget */}
          <motion.div 
            className="rounded-lg p-3 sm:p-4 flex-1 min-h-0 overflow-auto max-h-[calc(50vh-32px)]"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
              backdropFilter: 'blur(24px) saturate(1.1)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.1)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          >
          {/* Anomalies Section */}
          <div className="space-y-4">
            {/* Anomalies Widget Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-500/20 to-amber-600/20 flex items-center justify-center">
                <div className="text-red-400 text-sm">🔍</div>
              </div>
              <div>
                <div className="text-white/90 text-xs xs:text-sm sm:text-sm font-normal">Anomalies Detected</div>
                <div className="text-white/50 text-[10px] xs:text-xs sm:text-xs">Real-time pattern analysis</div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              {isScanning && (
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
              )}
              <div className={`text-xs ${isScanning ? 'text-blue-400' : 'text-white/50'}`}>
                {isScanning ? 'Scanning...' : 'Active'}
              </div>
            </div>
          </div>

            {/* Anomalies Content */}
            <div className="flex-1 space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20">
            {/* High Priority Section */}
            <div className="space-y-2">
              <motion.button
                onClick={() => toggleSection('high')}
                className="w-full flex items-center justify-between p-2 rounded-md transition-colors"
                
                
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-400/80"></div>
                  <div className="text-red-400 text-xs font-normal uppercase tracking-wide">
                    High Priority ({anomalies.high.length})
                  </div>
                </div>
                <div className={`text-white/40 text-xs transition-transform duration-200 ${
                  expandedSections.high ? 'rotate-90' : ''
                }`}>
                  ▶
                </div>
              </motion.button>
              
              <AnimatePresence>
                {expandedSections.high && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="space-y-1 ml-4 overflow-hidden"
                  >
                    {anomalies.high.map((anomaly) => (
                      <motion.div
                        key={anomaly.id}
                        className="bg-red-500/10 border border-red-500/20 rounded-md p-2 transition-colors cursor-pointer"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <div className="text-white/80 text-xs font-medium leading-tight">
                            {anomaly.title}
                          </div>
                          <div className="text-white/40 text-[10px] ml-2">
                            {anomaly.trend === 'up' ? '↗' : anomaly.trend === 'down' ? '↘' : '→'}
                          </div>
                        </div>
                        <div className="text-red-300/60 text-[10px] mb-1">
                          {anomaly.description}
                        </div>
                        <div className="text-white/30 text-[9px]">
                          {anomaly.time}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Medium Priority Section */}
            <div className="space-y-2">
              <motion.button
                onClick={() => toggleSection('medium')}
                className="w-full flex items-center justify-between p-2 rounded-md transition-colors"
                
                
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400/80"></div>
                  <div className="text-amber-400 text-xs font-normal uppercase tracking-wide">
                    Medium Priority ({anomalies.medium.length})
                  </div>
                </div>
                <div className={`text-white/40 text-xs transition-transform duration-200 ${
                  expandedSections.medium ? 'rotate-90' : ''
                }`}>
                  ▶
                </div>
              </motion.button>
              
              <AnimatePresence>
                {expandedSections.medium && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="space-y-1 ml-4 overflow-hidden max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10"
                  >
                    {anomalies.medium.slice(0, expandedSections.medium ? 4 : 0).map((anomaly) => (
                      <motion.div
                        key={anomaly.id}
                        className="bg-amber-500/10 border border-amber-500/20 rounded-md p-2 hover:bg-amber-500/15 transition-colors cursor-pointer"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <div className="text-white/80 text-xs font-medium leading-tight">
                            {anomaly.title}
                          </div>
                          <div className="text-white/40 text-[10px] ml-2">
                            {anomaly.trend === 'up' ? '↗' : anomaly.trend === 'down' ? '↘' : '→'}
                          </div>
                        </div>
                        <div className="text-amber-300/60 text-[10px] mb-1">
                          {anomaly.description}
                        </div>
                        <div className="text-white/30 text-[9px]">
                          {anomaly.time}
                        </div>
                      </motion.div>
                    ))}
                    {anomalies.medium.length > 4 && (
                      <div className="text-white/40 text-[10px] text-center py-1">
                        + {anomalies.medium.length - 4} more...
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Low Priority Section */}
            <div className="space-y-2">
              <motion.button
                onClick={() => toggleSection('low')}
                className="w-full flex items-center justify-between p-2 rounded-md transition-colors"
                
                
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400/80"></div>
                  <div className="text-blue-400 text-xs font-normal uppercase tracking-wide">
                    Low Priority (12)
                  </div>
                </div>
                <div className={`text-white/40 text-xs transition-transform duration-200 ${
                  expandedSections.low ? 'rotate-90' : ''
                }`}>
                  ▶
                </div>
              </motion.button>
              
              <AnimatePresence>
                {expandedSections.low && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="space-y-1 ml-4 overflow-hidden"
                  >
                    {anomalies.low.map((anomaly) => (
                      <motion.div
                        key={anomaly.id}
                        className="bg-blue-500/10 border border-blue-500/20 rounded-md p-2 hover:bg-blue-500/15 transition-colors cursor-pointer"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <div className="text-white/80 text-xs font-medium leading-tight">
                            {anomaly.title}
                          </div>
                          <div className="text-white/40 text-[10px] ml-2">
                            {anomaly.trend === 'up' ? '↗' : anomaly.trend === 'down' ? '↘' : '→'}
                          </div>
                        </div>
                        <div className="text-blue-300/60 text-[10px] mb-1">
                          {anomaly.description}
                        </div>
                        <div className="text-white/30 text-[9px]">
                          {anomaly.time}
                        </div>
                      </motion.div>
                    ))}
                    <div className="text-white/40 text-[10px] text-center py-1">
                      + 10 more...
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

            {/* Status Footer */}
            <div className="mt-4 pt-3 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="text-white/50 text-xs">Last Scan: {lastScanTime}</div>
                <div className="flex items-center space-x-1">
                  {isScanning ? (
                    <div className="w-3 h-3 border border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                  )}
                  <div className={`text-xs font-medium ${
                    isScanning ? 'text-blue-400' : 'text-emerald-400'
                  }`}>
                    {isScanning ? 'Scanning' : 'Active'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          </motion.div>

          {/* Opportunities Widget */}
          <motion.div 
            className="rounded-lg p-3 sm:p-4 flex-1 min-h-0 overflow-auto max-h-[calc(50vh-32px)]"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
            backdropFilter: 'blur(24px) saturate(1.1)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.1)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
        >
          {/* Opportunities Section */}
          <div className="space-y-4">
            {/* Opportunities Widget Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-600/20 flex items-center justify-center">
                  <div className="text-purple-400 text-sm">💡</div>
                </div>
                <div>
                  <div className="text-white/90 text-xs xs:text-sm sm:text-sm font-normal">Opportunities</div>
                  <div className="text-white/50 text-[10px] xs:text-xs sm:text-xs">AI-generated insights</div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                <div className="text-purple-400 text-[10px] xs:text-xs sm:text-xs">Active</div>
              </div>
            </div>

            {/* Current Opportunity with Mouse Scroll */}
            <div 
              className="space-y-5 cursor-pointer select-none"
              onWheel={(e) => {
                // Only intercept scroll on desktop with Shift key (never interfere with mobile touch)
                if (e.shiftKey && !('ontouchstart' in window)) {
                  e.preventDefault()
                  const delta = e.deltaY
                  const direction = delta > 0 ? 1 : -1
                  const newIndex = direction > 0 
                    ? (currentOpportunity + 1) % opportunities.length
                    : (currentOpportunity - 1 + opportunities.length) % opportunities.length
                  setCurrentOpportunity(newIndex)
                  startOpportunityGeneration(newIndex)
                }
                // Always allow normal scrolling on mobile and when Shift is not pressed
              }}
            >
              {/* Opportunity Title */}
              <div className="space-y-2">
                <motion.div 
                  className="text-white/90 text-sm xs:text-xs sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-base font-normal leading-tight"
                  key={`title-${currentOpportunity}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {opportunities[currentOpportunity].title}
                </motion.div>
                <motion.div 
                  className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                ></motion.div>
              </div>

              {/* AI Generation Status */}
              {opportunityAnimationPhase === 'thinking' && (
                <motion.div 
                  className="bg-gradient-to-br from-purple-500/15 to-pink-500/10 border border-purple-500/25 rounded-lg p-4 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <div className="text-white/70 text-sm italic">
                      AI is analyzing opportunity patterns...
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Summary Card with Typewriter Effect */}
              {(opportunityAnimationPhase === 'typing' || opportunityAnimationPhase === 'revealing' || opportunityAnimationPhase === 'complete') && (
                <motion.div 
                  className="bg-gradient-to-br from-purple-500/15 to-pink-500/10 border border-purple-500/25 rounded-lg p-4 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-white/70 text-xs xs:text-sm sm:text-sm leading-relaxed">
                    {opportunityAnimationPhase === 'typing' ? (
                      <span>
                        {opportunityTypewriterText}
                        <span className="inline-block w-2 h-4 bg-purple-400 ml-1 animate-pulse"></span>
                      </span>
                    ) : (
                      opportunities[currentOpportunity].summary
                    )}
                  </div>
                </motion.div>
              )}

              {/* Impact & Confidence Grid */}
              <AnimatePresence>
                {showOpportunityMetrics && (
                  <motion.div 
                    className="grid grid-cols-2 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  >
                    <motion.div 
                      className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      <motion.div 
                        className="text-emerald-400/70 text-xs font-medium mb-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        Potential Impact
                      </motion.div>
                      <motion.div 
                        className="text-emerald-400 text-sm font-normal"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                      >
                        {opportunities[currentOpportunity].impact}
                      </motion.div>
                    </motion.div>
                    <motion.div 
                      className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <motion.div 
                        className="text-purple-400/70 text-xs font-medium mb-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                      >
                        Confidence
                      </motion.div>
                      <motion.div 
                        className="text-purple-400 text-sm font-normal"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                      >
                        {opportunities[currentOpportunity].confidence}%
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation Footer */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="text-white/40 text-xs">
                  Opportunity {currentOpportunity + 1} of {opportunities.length} • Updates every 20s
                </div>
                <div className="flex space-x-1">
                  {opportunities.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentOpportunity(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentOpportunity ? 'bg-purple-400 ' : 'bg-white/20 '
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          </motion.div>
        </div>
      </div>

      {/* Intelligence Modules Footer will be rendered below */}
      
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
                <div className="text-white/90 text-sm font-normal mb-2">Revenue Breakdown</div>
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
                <div className="text-white/90 text-sm font-normal mb-2">Customer Health</div>
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
                <div className="text-white/90 text-sm font-normal mb-2">Communication Hub</div>
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
                <div className="text-white/90 text-sm font-normal mb-2">Security Status</div>
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
                <div className="text-white/90 text-sm font-normal mb-2">System Performance</div>
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
      
        {/* Intelligence Modules Footer - full width */}
        <div className="w-full mt-4">
          <Minimalist2Footer />
        </div>
      </div>
    </motion.div>
  )
}

export default RiskillEnterpriseDashboardMinimalist
