import { useState, useCallback, useEffect } from 'react'

export interface DemoScenario {
  id: string
  title: string
  description: string
  steps: DemoStep[]
}

export interface DemoStep {
  id: string
  type: 'ai_message' | 'user_message' | 'system_update' | 'metric_change' | 'alert_trigger' | 'file_attachment'
  content: string
  delay?: number
  typingSpeed?: 'human' | 'ai' // human: 60 WPM, ai: 180 WPM
  metadata?: {
    metrics?: { [key: string]: string }
    alerts?: Array<{ type: string; message: string; severity: string }>
    files?: Array<{ name: string; icon: string; preview: string }>
    copilotSize?: 'small' | 'medium' | 'large' | 'dramatic'
  }
}

export interface DemoState {
  currentScenario: string | null
  currentStep: number
  isPlaying: boolean
  isTyping: boolean
  completedSteps: string[]
}

// Adam's Cinematic Scene Library
export const ADAM_SCENARIOS: DemoScenario[] = [
  {
    id: 'onboarding-care',
    title: 'Onboarding Care',
    description: 'Adam shows intimate knowledge of Joe\'s workflow',
    steps: [
      {
        id: 'adam-greeting',
        type: 'ai_message',
        content: 'Hey Joe, how\'s your onboarding going? I notice you\'re getting notifications from ClickUp and Slack - jumping between systems can be tedious. Should we connect those?',
        typingSpeed: 'ai',
        metadata: {
          copilotSize: 'medium',
          files: [
            { name: 'clickup-integration.json', icon: '🔗', preview: 'ClickUp workspace connection' },
            { name: 'slack-channels.md', icon: '💬', preview: 'Active Slack channels analysis' }
          ]
        }
      },
      {
        id: 'joe-response',
        type: 'user_message',
        content: 'Sure, that\'s thoughtful. Go ahead.',
        typingSpeed: 'human'
      },
      {
        id: 'adam-integration',
        type: 'ai_message',
        content: 'Perfect! I\'ve connected your ClickUp tasks and Slack channels. I can now see you have 3 high-priority items due this week. Want me to create a focused work plan?',
        typingSpeed: 'ai',
        metadata: {
          copilotSize: 'large',
          metrics: {
            'Connected Systems': '2',
            'Priority Tasks': '3',
            'Integration Status': 'Active'
          }
        }
      }
    ]
  },
  {
    id: 'weekend-insight',
    title: 'Weekend Dedication',
    description: 'Adam demonstrates loyalty by working weekends',
    steps: [
      {
        id: 'weekend-analysis',
        type: 'ai_message',
        content: 'Morning Joe! I was running analysis over the weekend and found something interesting. Your Q3 revenue patterns correlate with competitor pricing changes 72 hours earlier. This could be a strategic advantage.',
        typingSpeed: 'ai',
        metadata: {
          copilotSize: 'dramatic',
          files: [
            { name: 'revenue-correlation.insight', icon: '📊', preview: 'Q3 revenue pattern analysis' },
            { name: 'competitor-pricing.json', icon: '💰', preview: 'Market pricing intelligence' },
            { name: 'strategic-opportunity.md', icon: '🎯', preview: 'Competitive advantage analysis' }
          ]
        }
      },
      {
        id: 'joe-surprise',
        type: 'user_message',
        content: 'You worked on this over the weekend? That\'s incredible insight.',
        typingSpeed: 'human'
      },
      {
        id: 'adam-dedication',
        type: 'ai_message',
        content: 'Of course! Market patterns don\'t wait for business hours. I\'ve prepared three strategic scenarios based on this correlation. Should we review them now or schedule for your 2 PM strategy block?',
        typingSpeed: 'ai',
        metadata: {
          copilotSize: 'large',
          alerts: [
            { type: 'opportunity', message: 'Strategic pricing advantage identified', severity: 'high' }
          ]
        }
      }
    ]
  },
  {
    id: 'crisis-prevention',
    title: 'Proactive Crisis Prevention',
    description: 'Adam prevents problems before they happen',
    steps: [
      {
        id: 'urgent-flag',
        type: 'ai_message',
        content: 'Joe, I need to flag something urgent. I\'ve detected anomalous patterns in your operational metrics that preceded the Q2 supply chain disruption. We have about 48 hours to adjust before potential impact.',
        typingSpeed: 'ai',
        metadata: {
          copilotSize: 'dramatic',
          alerts: [
            { type: 'warning', message: 'Operational anomaly detected', severity: 'high' },
            { type: 'prediction', message: 'Potential disruption in 48 hours', severity: 'critical' }
          ]
        }
      },
      {
        id: 'joe-concern',
        type: 'user_message',
        content: 'What kind of patterns? Show me the analysis.',
        typingSpeed: 'human'
      },
      {
        id: 'adam-analysis',
        type: 'ai_message',
        content: 'The same vendor delivery variance and inventory buffer depletion we saw in Q2. I\'ve already drafted contingency protocols and identified 3 alternative suppliers. Should I initiate the backup plan?',
        typingSpeed: 'ai',
        metadata: {
          copilotSize: 'large',
          files: [
            { name: 'anomaly-detection.json', icon: '⚠️', preview: 'Operational pattern analysis' },
            { name: 'contingency-plan.md', icon: '🛡️', preview: 'Crisis prevention protocols' },
            { name: 'supplier-alternatives.xlsx', icon: '🏭', preview: 'Backup supplier network' }
          ],
          metrics: {
            'Risk Level': 'High',
            'Time to Impact': '48 hours',
            'Mitigation Options': '3'
          }
        }
      }
    ]
  },
  {
    id: 'morning-synthesis',
    title: 'Morning Strategic Synthesis',
    description: 'Adam provides comprehensive morning briefing',
    steps: [
      {
        id: 'morning-briefing',
        type: 'ai_message',
        content: 'Morning Joe! I\'ve synthesized overnight market data, your calendar priorities, and team updates. Three key items need your attention: the partnership proposal review, Q4 budget allocation, and the new hire onboarding strategy.',
        typingSpeed: 'ai',
        metadata: {
          copilotSize: 'medium',
          files: [
            { name: 'market-overnight.json', icon: '🌙', preview: 'Overnight market analysis' },
            { name: 'calendar-priorities.md', icon: '📅', preview: 'Today\'s strategic priorities' },
            { name: 'team-updates.summary', icon: '👥', preview: 'Team status synthesis' }
          ]
        }
      },
      {
        id: 'joe-prioritize',
        type: 'user_message',
        content: 'Let\'s start with the partnership proposal. What\'s your recommendation?',
        typingSpeed: 'human'
      },
      {
        id: 'adam-recommendation',
        type: 'ai_message',
        content: 'Based on their financial stability, market position, and cultural alignment scores, I recommend proceeding with modified terms. I\'ve highlighted 3 negotiation points that could increase value by 23% while reducing integration risk.',
        typingSpeed: 'ai',
        metadata: {
          copilotSize: 'large',
          files: [
            { name: 'partnership-analysis.insight', icon: '🤝', preview: 'Partnership evaluation matrix' },
            { name: 'negotiation-strategy.md', icon: '💼', preview: 'Strategic negotiation points' },
            { name: 'risk-assessment.json', icon: '📊', preview: 'Integration risk analysis' }
          ],
          metrics: {
            'Value Increase': '+23%',
            'Risk Reduction': 'Moderate',
            'Recommendation': 'Proceed with modifications'
          }
        }
      }
    ]
  }
]

export const useDemoOrchestration = () => {
  const [demoState, setDemoState] = useState<DemoState>({
    currentScenario: null,
    currentStep: 0,
    isPlaying: false,
    isTyping: false,
    completedSteps: []
  })

  const startScenario = useCallback((scenarioId: string) => {
    setDemoState({
      currentScenario: scenarioId,
      currentStep: 0,
      isPlaying: true,
      isTyping: false,
      completedSteps: []
    })
  }, [])

  const advanceStep = useCallback(() => {
    if (!demoState.currentScenario || demoState.isTyping) return

    const scenario = ADAM_SCENARIOS.find(s => s.id === demoState.currentScenario)
    if (!scenario) return

    if (demoState.currentStep < scenario.steps.length - 1) {
      setDemoState(prev => ({
        ...prev,
        currentStep: prev.currentStep + 1,
        completedSteps: [...prev.completedSteps, scenario.steps[prev.currentStep].id]
      }))
    } else {
      // Scenario complete
      setDemoState(prev => ({
        ...prev,
        isPlaying: false,
        completedSteps: [...prev.completedSteps, scenario.steps[prev.currentStep].id]
      }))
    }
  }, [demoState.currentScenario, demoState.currentStep, demoState.isTyping])

  const previousStep = useCallback(() => {
    if (!demoState.currentScenario || demoState.isTyping) return

    if (demoState.currentStep > 0) {
      setDemoState(prev => ({
        ...prev,
        currentStep: prev.currentStep - 1,
        completedSteps: prev.completedSteps.slice(0, -1)
      }))
    }
  }, [demoState.currentScenario, demoState.currentStep, demoState.isTyping])

  const resetScenario = useCallback(() => {
    setDemoState(prev => ({
      ...prev,
      currentStep: 0,
      isPlaying: true,
      isTyping: false,
      completedSteps: []
    }))
  }, [])

  const setTyping = useCallback((isTyping: boolean) => {
    setDemoState(prev => ({ ...prev, isTyping }))
  }, [])

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault()
          advanceStep()
          break
        case 'ArrowLeft':
          event.preventDefault()
          previousStep()
          break
        case ' ':
          event.preventDefault()
          advanceStep()
          break
        case 'Escape':
          event.preventDefault()
          resetScenario()
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [advanceStep, previousStep, resetScenario])

  const getCurrentStep = useCallback(() => {
    if (!demoState.currentScenario) return null
    
    const scenario = ADAM_SCENARIOS.find(s => s.id === demoState.currentScenario)
    if (!scenario) return null

    return scenario.steps[demoState.currentStep] || null
  }, [demoState.currentScenario, demoState.currentStep])

  const getCurrentScenario = useCallback(() => {
    if (!demoState.currentScenario) return null
    return ADAM_SCENARIOS.find(s => s.id === demoState.currentScenario) || null
  }, [demoState.currentScenario])

  return {
    demoState,
    scenarios: ADAM_SCENARIOS,
    startScenario,
    advanceStep,
    previousStep,
    resetScenario,
    setTyping,
    getCurrentStep,
    getCurrentScenario
  }
}
