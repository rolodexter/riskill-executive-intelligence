// Mock File System for Visual Simulation
// Pure visual simulation - no real backend functionality

export interface MockFile {
  name: string
  icon: string
  preview: string
  type: 'insight' | 'analysis' | 'report' | 'data' | 'strategy'
  size: string
  lastModified: string
}

export const MOCK_FILES: { [key: string]: MockFile } = {
  'revenue-correlation.insight': {
    name: 'revenue-correlation.insight',
    icon: '📊',
    preview: 'Q3 revenue pattern analysis showing 72-hour correlation with competitor pricing',
    type: 'insight',
    size: '2.4 KB',
    lastModified: '2 hours ago'
  },
  'competitor-pricing.json': {
    name: 'competitor-pricing.json',
    icon: '💰',
    preview: 'Market pricing intelligence data with trend analysis',
    type: 'data',
    size: '15.7 KB',
    lastModified: '3 hours ago'
  },
  'strategic-opportunity.md': {
    name: 'strategic-opportunity.md',
    icon: '🎯',
    preview: 'Competitive advantage analysis and strategic recommendations',
    type: 'strategy',
    size: '8.2 KB',
    lastModified: '1 hour ago'
  },
  'clickup-integration.json': {
    name: 'clickup-integration.json',
    icon: '🔗',
    preview: 'ClickUp workspace connection and task synchronization data',
    type: 'data',
    size: '4.1 KB',
    lastModified: '30 minutes ago'
  },
  'slack-channels.md': {
    name: 'slack-channels.md',
    icon: '💬',
    preview: 'Active Slack channels analysis and communication patterns',
    type: 'analysis',
    size: '6.8 KB',
    lastModified: '45 minutes ago'
  },
  'anomaly-detection.json': {
    name: 'anomaly-detection.json',
    icon: '⚠️',
    preview: 'Operational pattern analysis with anomaly detection algorithms',
    type: 'analysis',
    size: '12.3 KB',
    lastModified: '1 hour ago'
  },
  'contingency-plan.md': {
    name: 'contingency-plan.md',
    icon: '🛡️',
    preview: 'Crisis prevention protocols and emergency response procedures',
    type: 'strategy',
    size: '9.5 KB',
    lastModified: '2 hours ago'
  },
  'supplier-alternatives.xlsx': {
    name: 'supplier-alternatives.xlsx',
    icon: '🏭',
    preview: 'Backup supplier network with risk assessments and contact details',
    type: 'data',
    size: '18.9 KB',
    lastModified: '3 hours ago'
  },
  'market-overnight.json': {
    name: 'market-overnight.json',
    icon: '🌙',
    preview: 'Overnight market analysis with global trend indicators',
    type: 'analysis',
    size: '7.6 KB',
    lastModified: '6 hours ago'
  },
  'calendar-priorities.md': {
    name: 'calendar-priorities.md',
    icon: '📅',
    preview: 'Today\'s strategic priorities with time allocation recommendations',
    type: 'strategy',
    size: '3.2 KB',
    lastModified: '1 hour ago'
  },
  'team-updates.summary': {
    name: 'team-updates.summary',
    icon: '👥',
    preview: 'Team status synthesis with project progress and blockers',
    type: 'report',
    size: '5.4 KB',
    lastModified: '2 hours ago'
  },
  'partnership-analysis.insight': {
    name: 'partnership-analysis.insight',
    icon: '🤝',
    preview: 'Partnership evaluation matrix with financial and cultural alignment scores',
    type: 'insight',
    size: '11.2 KB',
    lastModified: '4 hours ago'
  },
  'negotiation-strategy.md': {
    name: 'negotiation-strategy.md',
    icon: '💼',
    preview: 'Strategic negotiation points with value optimization recommendations',
    type: 'strategy',
    size: '6.7 KB',
    lastModified: '3 hours ago'
  },
  'risk-assessment.json': {
    name: 'risk-assessment.json',
    icon: '📊',
    preview: 'Integration risk analysis with mitigation strategies',
    type: 'analysis',
    size: '9.8 KB',
    lastModified: '2 hours ago'
  }
}

export const getFileTypeColor = (type: MockFile['type']): string => {
  switch (type) {
    case 'insight':
      return 'text-violet-glow'
    case 'analysis':
      return 'text-indigo-pulse'
    case 'report':
      return 'text-green-400'
    case 'data':
      return 'text-blue-400'
    case 'strategy':
      return 'text-yellow-400'
    default:
      return 'text-silver-muted'
  }
}

export const getFileTypeBackground = (type: MockFile['type']): string => {
  switch (type) {
    case 'insight':
      return 'bg-violet-glow/10 border-violet-glow/20'
    case 'analysis':
      return 'bg-indigo-pulse/10 border-indigo-pulse/20'
    case 'report':
      return 'bg-green-400/10 border-green-400/20'
    case 'data':
      return 'bg-blue-400/10 border-blue-400/20'
    case 'strategy':
      return 'bg-yellow-400/10 border-yellow-400/20'
    default:
      return 'bg-steel-frame/10 border-steel-frame/20'
  }
}

// Simulate file operations for demo purposes
export const simulateFileDownload = (fileName: string): void => {
  console.log(`[DEMO] Simulating download of ${fileName}`)
  // In a real app, this would trigger actual file download
}

export const simulateFileOpen = (fileName: string): void => {
  console.log(`[DEMO] Simulating opening ${fileName}`)
  // In a real app, this would open the file in appropriate viewer
}

export const simulateFileShare = (fileName: string): void => {
  console.log(`[DEMO] Simulating sharing ${fileName}`)
  // In a real app, this would open sharing dialog
}
