import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'

function AuthDebugger() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const [isVisible, setIsVisible] = useState(false)
  
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
        className="fixed top-4 left-4 w-10 h-10 bg-blue-600/80 hover:bg-blue-600/90 text-white rounded-full flex items-center justify-center z-50 backdrop-blur-sm border border-blue-400 transition-colors"
        title="Auth Status"
      >
        👤
      </motion.button>

      {/* Auth Status Panel */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-16 left-4 bg-blue-900/90 text-white text-xs rounded-lg font-mono z-50 backdrop-blur-sm border border-blue-600 shadow-lg p-3 min-w-[200px]"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-300 font-bold">🔐 Auth Status</span>
              <button
                onClick={() => setIsVisible(false)}
                className="w-5 h-5 hover:bg-blue-700 rounded flex items-center justify-center transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-blue-200">Loading:</span>
                <span className={isLoading ? 'text-yellow-300' : 'text-green-300'}>
                  {isLoading ? 'Yes' : 'No'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-blue-200">Authenticated:</span>
                <span className={isAuthenticated ? 'text-green-300' : 'text-red-300'}>
                  {isAuthenticated ? 'Yes' : 'No'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-blue-200">User:</span>
                <span className="text-white truncate max-w-[100px]">
                  {user?.name || 'None'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-blue-200">Email:</span>
                <span className="text-white truncate max-w-[100px]">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AuthDebugger