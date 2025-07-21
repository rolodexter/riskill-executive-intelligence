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
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Brain, Settings, BarChart3, GripVertical } from 'lucide-react'

interface AnalystCard {
  id: string
  title: string
  subtitle: string
  icon: React.ComponentType<any>
  status: 'active' | 'standby' | 'processing'
  priority: number
}

const SortableCard: React.FC<{ card: AnalystCard }> = ({ card }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const statusColors = {
    active: 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border-emerald-400/30 text-emerald-300',
    standby: 'bg-gradient-to-r from-slate-500/10 to-gray-500/5 border-slate-400/20 text-slate-300',
    processing: 'bg-gradient-to-r from-blue-500/20 to-cyan-500/10 border-blue-400/30 text-blue-300'
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`relative bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent backdrop-blur-sm rounded-xl p-5 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md ${
        isDragging ? 'opacity-50 scale-105' : ''
      }`}
      whileHover={{ scale: 1.02, y: -3 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-xl" />
      
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-white/[0.08] to-white/[0.04] backdrop-blur-sm rounded-xl shadow-sm">
            <card.icon className="w-6 h-6 text-white/80" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white/95 mb-1">
              {card.title}
            </h3>
            <p className="text-sm text-white/60">
              {card.subtitle}
            </p>
          </div>
        </div>
        <div
          {...listeners}
          className="p-2 hover:bg-white/[0.08] rounded-lg cursor-grab active:cursor-grabbing transition-all duration-200"
        >
          <GripVertical className="w-5 h-5 text-white/40 hover:text-white/60" />
        </div>
      </div>
      
      <div className="flex items-center justify-between relative z-10">
        <div className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm shadow-sm ${statusColors[card.status]}`}>
          {card.status.toUpperCase()}
        </div>
        <div className="text-xs text-white/40">
          Priority: {card.priority}
        </div>
      </div>
    </motion.div>
  )
}

const LeftAnalystPanel: React.FC = () => {
  const [cards, setCards] = useState<AnalystCard[]>([
    {
      id: 'riskill-ai',
      title: '🧠 RISKILL AI AGENT',
      subtitle: 'Strategic Intelligence Analyst',
      icon: Brain,
      status: 'active',
      priority: 1
    },
    {
      id: 'system-recommendations',
      title: '⚙️ SYSTEM RECOMMENDATIONS',
      subtitle: 'Optimization & Compliance',
      icon: Settings,
      status: 'processing',
      priority: 2
    },
    {
      id: 'glik',
      title: '📊 GLIK',
      subtitle: 'Performance Analytics',
      icon: BarChart3,
      status: 'standby',
      priority: 3
    }
  ])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (active.id !== over?.id) {
      setCards((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over?.id)

        const newItems = arrayMove(items, oldIndex, newIndex)
        // Update priorities based on new order
        return newItems.map((item, index) => ({
          ...item,
          priority: index + 1
        }))
      })
    }
  }

  return (
    <motion.div 
      className="bg-charcoal-prime p-6 h-full overflow-y-auto"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <h2 className="text-lg font-semibold text-platinum-text mb-2">
          AI Analyst Team
        </h2>
        <p className="text-sm text-silver-muted">
          Drag to prioritize intelligence sources
        </p>
      </motion.div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={cards} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
              >
                <SortableCard card={card} />
              </motion.div>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <motion.div 
        className="mt-8 p-4 bg-steel-frame/30 rounded-lg border border-steel-frame"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.4 }}
      >
        <h3 className="text-sm font-medium text-platinum-text mb-2">
          Team Configuration
        </h3>
        <div className="space-y-2 text-xs text-silver-muted">
          <div className="flex justify-between">
            <span>Active Agents:</span>
            <span className="text-green-400">{cards.filter(c => c.status === 'active').length}</span>
          </div>
          <div className="flex justify-between">
            <span>Processing:</span>
            <span className="text-indigo-pulse">{cards.filter(c => c.status === 'processing').length}</span>
          </div>
          <div className="flex justify-between">
            <span>On Standby:</span>
            <span className="text-silver-muted">{cards.filter(c => c.status === 'standby').length}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default LeftAnalystPanel
