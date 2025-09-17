'use client'

import { useState, useEffect } from 'react'

interface HeaderAlertProps {
  className?: string
}

export default function HeaderAlert({ className = "" }: HeaderAlertProps) {
  const [seatsLeft, setSeatsLeft] = useState(30)

  useEffect(() => {
    // Get the page load time or use current time (same logic as EnrollButton)
    const pageLoadTime = sessionStorage.getItem('pageLoadTime')
    const startTime = pageLoadTime ? parseInt(pageLoadTime) : Date.now()

    if (!pageLoadTime) {
      sessionStorage.setItem('pageLoadTime', startTime.toString())
    }

    const updateSeats = () => {
      const now = Date.now()
      const elapsed = now - startTime

      // 30 minute cycle (1800000 ms)
      const cycleTime = 30 * 60 * 1000
      const cyclePosition = elapsed % cycleTime

      // Deduct seats every 15 minutes within the 30-minute cycle
      const fifteenMinutes = 15 * 60 * 1000

      if (cyclePosition < fifteenMinutes) {
        // First 15 minutes: 30 seats going down to 10
        const minutesElapsed = Math.floor(cyclePosition / (60 * 1000))
        // Deduct 1 seat every 0.75 minutes (45 seconds) to go from 30 to 10 in 15 minutes
        const seatsDeducted = Math.floor(minutesElapsed / 0.75)
        setSeatsLeft(Math.max(10, 30 - seatsDeducted))
      } else {
        // Next 15 minutes: stay at 10 seats, then reset to 30
        setSeatsLeft(10)
      }
    }

    updateSeats()
    const interval = setInterval(updateSeats, 45000) // Update every 45 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`text-center mb-4 mt-6 ${className}`}>
      <div className="inline-flex items-center backdrop-blur-2xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-orange-300/60 rounded-full px-6 py-3 shadow-2xl ring-1 ring-orange-200/30 hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="text-lg animate-bounce">🔥</span>
          </div>
          <span className="text-orange-700 font-bold text-sm md:text-base lg:text-sm tracking-wide uppercase">
            Limited Seats Available
          </span>
          <div className="hidden md:flex items-center gap-2 ml-2 px-3 py-1 bg-red-500/80 text-white text-xs font-bold rounded-full">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            ONLY {seatsLeft} SPOTS
          </div>
        </div>
      </div>
    </div>
  )
}
