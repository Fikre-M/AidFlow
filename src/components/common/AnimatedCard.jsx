function AnimatedCard({ children, title, className = '', delay = 0 }) {
  return (
    <div 
      className={`card ${className}`}
      style={{
        animation: 'scaleIn 0.3s ease-out',
        animationDelay: `${delay}s`,
        animationFillMode: 'backwards'
      }}
    >
      {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>}
      {children}
    </div>
  )
}

export default AnimatedCard
