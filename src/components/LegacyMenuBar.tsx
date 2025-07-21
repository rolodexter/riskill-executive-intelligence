import React from 'react'
import { motion } from 'framer-motion'

const LegacyMenuBar: React.FC = () => {
  const menuItems = ['FILE', 'EDIT', 'VIEW', 'SETTINGS', 'HELP']

  return (
    <motion.div 
      className="bg-gradient-to-b from-[#0A0A0A] to-[#0F0F0F] flex items-center px-4 h-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center space-x-6">
        {menuItems.map((item, index) => (
          <motion.button
            key={item}
            className="text-white/40 hover:text-white/70 text-xs font-medium tracking-wide transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            {item}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

export default LegacyMenuBar
