import { useState, useRef, useEffect } from 'react'

export function useDraggable(initialPosition = { x: 16, y: 16 }) {
  const [position, setPosition] = useState(initialPosition)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const elementRef = useRef(null)

  const handleMouseDown = (e) => {
    if (e.target.closest('.drag-handle')) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      })
      e.preventDefault()
    }
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return

    const newX = e.clientX - dragStart.x
    const newY = e.clientY - dragStart.y

    // Keep within viewport bounds
    const maxX = window.innerWidth - (elementRef.current?.offsetWidth || 200)
    const maxY = window.innerHeight - (elementRef.current?.offsetHeight || 100)

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'grabbing'
      document.body.style.userSelect = 'none'

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.body.style.cursor = ''
        document.body.style.userSelect = ''
      }
    }
  }, [isDragging, dragStart])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const maxX = window.innerWidth - (elementRef.current?.offsetWidth || 200)
      const maxY = window.innerHeight - (elementRef.current?.offsetHeight || 100)

      setPosition(prev => ({
        x: Math.max(0, Math.min(prev.x, maxX)),
        y: Math.max(0, Math.min(prev.y, maxY))
      }))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    position,
    isDragging,
    elementRef,
    handleMouseDown,
    dragHandleProps: {
      className: 'drag-handle cursor-grab active:cursor-grabbing',
      onMouseDown: handleMouseDown
    }
  }
}