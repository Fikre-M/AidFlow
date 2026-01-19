import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { useDraggable } from '../../hooks/useDraggable'

function AuthDebugger() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const [isVisible, setIsVisible] = useState(false)
  const { position, isDragging, elementRef, dragHandleProps } = useDraggable({ x: 16, y: 16 })
  
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => setIsVisible(!isVisible)}
        className="fixed top-4 left-4 w-10 h-10 bg-blue-600/80 hover:bg-blue-600/90 text-white rounded-full flex items-center justify-center z-50 backdrop-blur-sm border border-blue-400 transition-colors shadow-lg"
        title="Auth Status"
      >
        👤
      </motion.button>

      {/* Auth Status Panel */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={elementRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              position: 'fixed',
              left: position.x,
              top: position.y,
              zIndex: 50
            }}
            className={`bg-blue-900/90 text-white text-xs rounded-lg font-mono backdrop-blur-sm border border-blue-600 shadow-lg min-w-[200px] select-none ${
              isDragging ? 'shadow-2xl scale-105' : ''
            } transition-all duration-200`}
          >
            {/* Draggable Header */}
            <div 
              {...dragHandleProps}
              className={`flex items-center justify-between mb-2 p-2 border-b border-blue-600 bg-blue-800/50 rounded-t-lg ${dragHandleProps.className} hover:bg-blue-700/50 transition-colors`}
              title="Drag to move this panel"
            >
              <div className="flex items-center space-x-2">
                <span className="text-blue-400 text-xs">⋮⋮</span>
                <span className="text-blue-300 font-bold">🔐 Auth Status</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsVisible(false)
                }}
                className="w-5 h-5 hover:bg-blue-700 rounded flex items-center justify-center transition-colors text-blue-300 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="p-3 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-blue-200">Loading:</span>
                <span className={isLoading ? 'text-yellow-300' : 'text-green-300'}>
                  {isLoading ? 'Yes' : 'No'}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-blue-200">Authenticated:</span>
                <span className={isAuthenticated ? 'text-green-300' : 'text-red-300'}>
                  {isAuthenticated ? 'Yes' : 'No'}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-blue-200">User:</span>
                <span className="text-white truncate max-w-[100px]" title={user?.name || 'None'}>
                  {user?.name || 'None'}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-blue-200">Email:</span>
                <span className="text-white truncate max-w-[100px]" title={user?.email || 'None'}>
                  {user?.email || 'None'}
                </span>
              </div>
              
              <div className="pt-2 border-t border-blue-600">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    isAuthenticated ? 'bg-green-400' : 'bg-red-400'
                  }`} />
                  <span className="text-xs text-blue-200">
                    {isAuthenticated ? 'Session Active' : 'Not Logged In'}
                  </span>
                </div>
              </div>

              {/* Drag Hint */}
              <div className="pt-1 border-t border-blue-700">
                <span className="text-xs text-blue-400">💡 Drag this header to move</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AuthDebugger