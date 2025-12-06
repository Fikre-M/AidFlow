import { useEffect } from 'react'

function Toast({ message, type = 'info', onClose, duration = 3000 }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const types = {
    success: {
      bg: 'bg-green-500',
      icon: '✓',
      border: 'border-green-600'
    },
    error: {
      bg: 'bg-red-500',
      icon: '✕',
      border: 'border-red-600'
    },
    warning: {
      bg: 'bg-yellow-500',
      icon: '⚠',
      border: 'border-yellow-600'
    },
    info: {
      bg: 'bg-blue-500',
      icon: 'ℹ',
      border: 'border-blue-600'
    }
  }

  const config = types[type] || types.info

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
      <div className={`${config.bg} text-white px-6 py-4 rounded-lg shadow-lg border-l-4 ${config.border} flex items-center space-x-3 min-w-[300px] max-w-md`}>
        <span className="text-2xl font-bold">{config.icon}</span>
        <p className="flex-1 text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <span className="text-xl">✕</span>
        </button>
      </div>
    </div>
  )
}

export default Toast
