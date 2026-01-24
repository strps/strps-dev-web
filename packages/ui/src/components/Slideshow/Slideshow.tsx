'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion, Variants } from 'motion/react'
import { cn } from '@/components/lib/utils'

interface SlideshowHeroProps {
  slides: React.ReactNode[]
  interval?: number
  className?: string
}

const slideVariants: Variants = {
  enter: {
    opacity: 0,
  },
  center: {
    zIndex: 1,
    opacity: 1,
  },
  exit: {
    zIndex: 0,
    opacity: 0,
  },
}

const Slideshow: React.FC<SlideshowHeroProps> = ({ slides, interval = 5000, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Function to go to the next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
  }, [slides.length])

  // Function to go to the previous slide
  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)
  }, [slides.length])

  // Function to go to a specific slide
  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
    setAutoPlay(false)
    // Reset autoplay after a short delay to allow for manual navigation
    const timer = setTimeout(() => setAutoPlay(true), 300)
    return () => clearTimeout(timer)
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevSlide()
        setAutoPlay(false)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        nextSlide()
        setAutoPlay(false)
      } else if (e.key === 'Home') {
        e.preventDefault()
        goToSlide(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        goToSlide(slides.length - 1)
      } else if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Space') {
        e.preventDefault()
        setAutoPlay((prev) => !prev)
      }
    }

    // Add event listener when component mounts
    window.addEventListener('keydown', handleKeyDown)

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [prevSlide, nextSlide, goToSlide, slides.length])

  // Auto slide effect
  useEffect(() => {
    if (autoPlay) {
      intervalRef.current = setInterval(nextSlide, interval)
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [autoPlay, interval, nextSlide])

  // Pause autoplay on hover
  const handleMouseEnter = useCallback(() => setAutoPlay(false), [])
  const handleMouseLeave = useCallback(() => setAutoPlay(true), [])

  return (
    <div
      className={cn('relative h-[600px] w-full overflow-hidden bg-black', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-label="Image carousel"
      aria-roledescription="carousel"
      aria-live="polite"
      tabIndex={0}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 0.5, ease: 'easeInOut' },
          }}
          className="absolute inset-0 h-full w-full"
          aria-live="polite"
          aria-atomic="true"
          aria-label={`Slide ${currentIndex + 1} of ${slides.length}`}
        >
          {slides[currentIndex]}
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-0 right-0 z-10">
        <div className="mx-auto flex max-w-md cursor-default items-center justify-center gap-6 px-4">
          <motion.button
            onClick={() => {
              prevSlide()
              setAutoPlay(false)
            }}
            whileHover={{ scale: 1.1, backgroundColor: 'hsl(var(--muted))', x: -2 }}
            whileTap={{ scale: 0.95, x: -2 }}
            className="flex h-10 w-10 items-center justify-center rounded-full"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 stroke-muted-foreground cursor-pointer" />
          </motion.button>
          {/* 
          <div className="flex items-center gap-6 mx-2"> */}
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2.5 w-2.5 cursor-pointer rounded-full ${
                index === currentIndex ? 'bg-foreground' : 'bg-muted-foreground'
              }`}
              variants={{
                initial: { opacity: 0.7, scale: 1 },
                select: { opacity: 1, scale: 1.3 },
              }}
              initial="initial"
              animate={index === currentIndex ? 'select' : 'initial'}
              transition={{
                duration: 0.2,
                type: 'spring',
                stiffness: 300,
                damping: 15,
              }}
              whileHover={{
                scale: 1.5,
                opacity: 1,
              }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
          {/* </div> */}

          <motion.button
            onClick={() => {
              nextSlide()
              setAutoPlay(false)
            }}
            whileHover={{ scale: 1.1, backgroundColor: 'hsl(var(--muted))', x: 2 }}
            whileTap={{ scale: 0.95, x: 2 }}
            className="flex h-10 w-10 items-center justify-center rounded-full"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 stroke-muted-foreground cursor-pointer" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default Slideshow
