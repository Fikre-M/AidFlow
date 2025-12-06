import Toast from './Toast'

function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          style={{
            animation: 'slideInRight 0.3s ease-out',
            animationDelay: `${index * 0.1}s`,
            animationFillMode: 'backwards'
          }}
        >
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => onRemove(toast.id)}
            duration={0} // Duration handled by useToast
          />
        </div>
      ))}
    </div>
  )
}

export default ToastContainer
