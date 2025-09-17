'use client'

import { useState, useEffect } from 'react'

export function useSeatsCounter() {
  const [seatsLeft, setSeatsLeft] = useState(30)

  useEffect(() => {
    // Get the page load time or use current time
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

  return seatsLeft
}
