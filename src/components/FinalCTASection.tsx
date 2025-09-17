'use client'

import { useEffect, useState } from 'react'
import EnrollButton from './enroll'
import { CalendarX } from 'lucide-react'
import { Unbounded } from 'next/font/google'

interface ContentData {
    price: string
    originalPrice: string
    enrollLink: string
    eventDeadline: string
    bonuses: Array<{
        id: string
        title: string
        description: string
        value: string
        image: string
        icon: string
    }>
    bonusTotalValue: string
}

const shadowsIntoLight = Unbounded({
    weight: '600',
    subsets: ['latin']
})

export default function FinalCTASection() {
    // Synchronized seat counter logic (same as EnrollButton and BonusSection)
    const [seatsLeft, setSeatsLeft] = useState(30)

    // Countdown logic
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    const [content, setContent] = useState<ContentData>({
        price: '₹97',
        originalPrice: '₹1,997',
        enrollLink: 'https://pages.razorpay.com/hts-fbspecial',
        eventDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        bonuses: [],
        bonusTotalValue: '₹1,08,000'
    })

    // Seat counter effect (identical to EnrollButton and BonusSection)
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

    // Countdown effect (same as BonusSection)
    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime()
            const targetTime = new Date(content.eventDeadline).getTime()
            const difference = targetTime - now

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                })
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
            }
        }

        // Only run if we have a valid eventDeadline
        if (content.eventDeadline) {
            calculateTimeLeft()
            const timer = setInterval(calculateTimeLeft, 1000)
            return () => clearInterval(timer)
        }
    }, [content.eventDeadline])

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch('/api/content')
                if (response.ok) {
                    const data = await response.json()
                    setContent({
                        price: data.price || '₹97',
                        originalPrice: data.originalPrice || '₹1,997',
                        enrollLink: data.enrollLink || 'https://pages.razorpay.com/hts-fbspecial',
                        eventDeadline: data.eventDeadline || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                        bonuses: data.bonuses || [],
                        bonusTotalValue: data.bonusTotalValue || '₹1,08,000'
                    })
                }
            } catch (error) {
                console.error('Error fetching content:', error)
            }
        }

        fetchContent()
    }, [])

    // Calculate display total value (same logic as BonusSection)
    const calculatedTotalValue = content.bonuses.length > 0
        ? content.bonuses.reduce((sum, bonus) => {
            const value = parseInt(bonus.value.replace(/[₹,]/g, '')) || 0
            return sum + value
        }, 0)
        : 0

    // Use custom total value if set, otherwise use calculated value
    const displayBonusValue = content.bonusTotalValue !== '₹1,08,000'
        ? content.bonusTotalValue
        : calculatedTotalValue > 0
            ? `₹${calculatedTotalValue.toLocaleString()}`
            : content.bonusTotalValue

    const features = [
        "90-minute live masterclass",
        `${displayBonusValue} Automation Toolkit`,
        "Live Q&A with Shubhodeep Banerjee",
        "Exclusive community access"
    ]

    return (
        <section className="py-10 relative overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
            {/* Enhanced glassmorphism background elements */}
            <div className="absolute inset-0 opacity-60">
                <div className="absolute top-1/5 left-1/6 w-96 h-96 bg-gradient-to-r from-blue-400/60 to-purple-500/60 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-1/5 right-1/6 w-80 h-80 bg-gradient-to-r from-purple-500/50 to-pink-500/50 rounded-full blur-2xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-cyan-500/50 to-blue-500/50 rounded-full blur-2xl animate-pulse delay-2000"></div>
                <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-gradient-to-r from-emerald-400/40 to-teal-500/40 rounded-full blur-2xl animate-pulse delay-3000"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 max-w-6xl">
                {/* Main Header */}
                <div className="text-center mb-16">
                    <div className="backdrop-blur-2xl bg-white/35 border-2 border-white/60 rounded-3xl p-8 shadow-2xl ring-1 ring-black/5">
                         <h1 className={`text-4xl md:text-5xl lg:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-orange-500 bg-clip-text text-transparent leading-tight tracking-tight ${shadowsIntoLight.className}`}>
                            Don't Miss This <span className="text-red-600">Game-Changing</span>
                            <br />Opportunity
                        </h1>
                        <p className="text-xl text-gray-600 mt-4 font-medium max-w-4xl mx-auto">
                            Join successful entrepreneurs who are already using these automation secrets to build
                            <span className="text-blue-600 font-bold"> 7-figure businesses </span>
                            while working less than 30 hours per week
                        </p>
                    </div>
                </div>

                {/* Urgency Indicators */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <UrgencyCard
                        title="Webinar Starts In"
                        value={`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m`}
                        icon="⏰"
                        accent="red"
                    />
                    <UrgencyCard
                        title="Only Seats Left"
                        value={seatsLeft.toString()}
                        icon="🔥"
                        accent="orange"
                    />
                    <UrgencyCard
                        title="Bonus Included"
                        value={displayBonusValue}
                        icon="🎁"
                        accent="green"
                    />
                </div>

                {/* Features List */}
                <div className="mb-12">
                    <div className="backdrop-blur-2xl bg-white/30 border-2 border-white/50 rounded-2xl p-8 shadow-xl ring-1 ring-black/5 max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
                            🎯 What You'll Get Today
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {features.map((feature, index) => (
                                <FeatureItem key={index} text={feature} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main CTA Section */}
                {/* Pricing & CTA Section */}
                <div className="flex justify-center mt-4 p-3">
                    <EnrollButton
                        price="₹97"
                        originalPrice="₹999"
                        buttonText="GET MY SPOT FOR ₹97"
                        className=""
                    />
                </div>

                {/* Progress bar */}
                <div className="mb-10">
                    <div className="mx-auto grid gap-[2px] sm:gap-[3px] max-w-[300px] sm:max-w-none"
                        style={{ gridTemplateColumns: 'repeat(22,minmax(8px,18px))', width: 'fit-content' }}>
                        {Array.from({ length: 22 }).map((_, i) => (
                            <div
                                key={i}
                                className={
                                    'h-[18px] sm:h-[24px] md:h-[28px] relative ' +
                                    (i < 20 ? 'bg-[#A8A8A8]' : 'bg-[#9959FF] animate-pulse')
                                }
                            >
                                {i >= 20 && (
                                    <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] sm:text-[14px] font-bold">
                                        ✔
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-3 flex items-center justify-center gap-2 text-[13px] font-bold text-[#454545]">
                        <CalendarX className="h-3 sm:h-4 w-3 sm:w-4" />
                        <span>Only {seatsLeft} Seats Left - Event starts in {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m</span>
                    </div>
                </div>

                {/* Social Proof */}
                <div className="text-center">
                    <div className="backdrop-blur-2xl bg-white/30 border-2 border-white/50 rounded-2xl p-6 shadow-xl ring-1 ring-black/5">
                        <p className="text-lg text-gray-700 font-medium">
                            Join <span className="text-blue-600 font-bold">20000+ entrepreneurs</span> who've already transformed their businesses
                        </p>
                        <div className="mt-4 text-sm text-gray-600">
                            💎 Total Bonus Value: <span className="font-bold text-green-600">{displayBonusValue} FREE</span> when you join today!
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom CSS for enhanced glassmorphism */}
            <style jsx global>{`
                .backdrop-blur-2xl {
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                }
            `}</style>
        </section>
    )
}

/* ============== Custom Components ============== */

function UrgencyCard({ title, value, icon, accent }: {
    title: string;
    value: string;
    icon: string;
    accent: 'red' | 'orange' | 'green'
}) {
    const accentColors = {
        red: 'border-red-300/70 bg-red-50/60',
        orange: 'border-orange-300/70 bg-orange-50/60',
        green: 'border-green-300/70 bg-green-50/60'
    }

    const textColors = {
        red: 'text-red-600',
        orange: 'text-orange-600',
        green: 'text-green-600'
    }

    return (
        <div className={`backdrop-blur-xl bg-white/40 border-2 ${accentColors[accent]} rounded-2xl p-6 shadow-xl ring-1 ring-black/5 text-center transform hover:scale-[1.02] transition-all duration-200`}>
            <div className="text-4xl mb-2">{icon}</div>
            <div className="text-gray-600 text-sm font-medium mb-1">{title}</div>
            <div className={`text-lg md:text-xl font-bold ${textColors[accent]} break-words`}>
                {value}
            </div>
        </div>
    )
}

function FeatureItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3 p-3 backdrop-blur-sm bg-white/30 border border-white/40 rounded-xl hover:bg-white/40 transition-all duration-200">
            <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 font-medium">{text}</p>
        </div>
    )
}
