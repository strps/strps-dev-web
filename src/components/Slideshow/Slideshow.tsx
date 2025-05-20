'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface SlideshowHeroProps {
  slides: React.ReactNode[]
  interval?: number
}

const slideVariants = {
  enter: (direction: number) => {
    return {
      opacity: 0,
    }
  },
  center: {
    zIndex: 1,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      opacity: 0,
    }
  },
}

const Slideshow: React.FC<SlideshowHeroProps> = ({ slides, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
  }

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)
  }

  // Optional: Automatic sliding
  useEffect(() => {
    const intervalId = setInterval(nextSlide, interval)
    return () => clearInterval(intervalId) // Cleanup on unmount
  }, [slides.length, interval])

  return (
    <div className="slideshow-container relative h-[600px]">
      <AnimatePresence initial={false} custom={currentIndex}>
        <motion.div
          key={currentIndex}
          custom={currentIndex}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 1,
            ease: 'easeInOut',
          }}
          className=""
        >
          {slides[currentIndex]}
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-0 w-full flex gap-2 justify-center items-center z-10">
        {/* Optional: Navigation buttons */}
        <button onClick={prevSlide} className="">
          <ChevronLeft />
        </button>
        {slides.map((slide, index) => {
          return (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="w-2 h-2 rounded-full bg-foreground"
              variants={{
                initial: {
                  zIndex: 10,
                  opacity: 0.5,
                },

                select: {
                  zIndex: 10,
                  opacity: 1,
                  scale: 1.2,
                },
              }}
              initial="initial"
              animate={index === currentIndex ? 'select' : 'initial'}
              transition={{
                duration: 1,
                ease: 'easeInOut',
              }}
            />
          )
        })}
        <button onClick={nextSlide} className="">
          <ChevronRight />
        </button>

        {/* Optional: Indicators */}
        <div className="indicators relative">
          {slides.map((_, index) => (
            <button
              key={index}
              className={index === currentIndex ? 'active' : ''}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Slideshow
