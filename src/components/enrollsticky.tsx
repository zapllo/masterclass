'use client'

import { useState, useEffect } from 'react'

interface EnrollButtonProps {
  href?: string
  price?: string
  originalPrice?: string
  buttonText?: string
  className?: string
  showSeatsChip?: boolean
}

interface ContentData {
  price: string
  originalPrice: string
  enrollLink: string
}

export default function EnrollButtonWow({
  href,
  price,
  originalPrice,
  buttonText = "Secure Spot",
  className = "",
  showSeatsChip = false
}: EnrollButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [seatsLeft, setSeatsLeft] = useState(30)
  const [content, setContent] = useState<ContentData>({
    price: '₹97',
    originalPrice: '₹999',
    enrollLink: 'https://pages.razorpay.com/hts-fbspecial'
  })

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content')
        if (response.ok) {
          const data = await response.json()
          setContent({
            price: data.price || '₹97',
            originalPrice: data.originalPrice || '₹999',
            enrollLink: data.enrollLink || 'https://pages.razorpay.com/hts-fbspecial'
          })
        }
      } catch (error) {
        console.error('Error fetching content:', error)
      }
    }

    fetchContent()
  }, [])

  useEffect(() => {
    const pageLoadTime = sessionStorage.getItem('pageLoadTime')
    const startTime = pageLoadTime ? parseInt(pageLoadTime) : Date.now()

    if (!pageLoadTime) {
      sessionStorage.setItem('pageLoadTime', startTime.toString())
    }

    const updateSeats = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const cycleTime = 30 * 60 * 1000
      const cyclePosition = elapsed % cycleTime
      const fifteenMinutes = 15 * 60 * 1000

      if (cyclePosition < fifteenMinutes) {
        const minutesElapsed = Math.floor(cyclePosition / (60 * 1000))
        const seatsDeducted = Math.floor(minutesElapsed / 0.75)
        setSeatsLeft(Math.max(10, 30 - seatsDeducted))
      } else {
        setSeatsLeft(10)
      }
    }

    updateSeats()
    const interval = setInterval(updateSeats, 45000)

    return () => clearInterval(interval)
  }, [])

  const finalHref = href || content.enrollLink
  const finalPrice = price || content.price
  const finalOriginalPrice = originalPrice || content.originalPrice

  return (
    <div className="relative">
      {showSeatsChip && (
        <div className="absolute -top-3 -right-2 backdrop-blur-md bg-red-500/90 border border-red-400/30 text-white text-xs px-3 py-1 rounded-full font-bold z-20 animate-pulse">
          {seatsLeft} left
        </div>
      )}

      <a
        href={finalHref}
        className={`
          relative inline-flex items-center justify-center
          backdrop-blur-xl bg-gradient-to-r from-purple-500/80 via-blue-500/80 to-cyan-500/80
          hover:from-purple-600/90 hover:via-blue-600/90 hover:to-cyan-600/90
          border border-white/20 hover:border-white/30
          text-white font-bold py-3 px-6 rounded-xl
          transition-all duration-300 transform hover:scale-105
          shadow-xl hover:shadow-2xl
          overflow-hidden group
          ${className}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="relative z-10 text-sm md:text-base font-bold">
          {buttonText}
        </span>

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

        {/* Glassmorphism inner glow */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </a>
    </div>
  )
}
