'use client'

import { useEffect, useState } from 'react'
import EnrollButton from './enroll'
import { CalendarX } from 'lucide-react'
import { Unbounded } from 'next/font/google'

interface ContentData {
    price: string
    originalPrice: string
    enrollLink: string
}
const shadowsIntoLight = Unbounded({
    weight: '600',
    subsets: ['latin']
})




export default function FinalCTASection() {
    const [content, setContent] = useState<ContentData>({
        price: '₹97',
        originalPrice: '₹1,997',
        enrollLink: 'https://pages.razorpay.com/hts-fbspecial'
    })

    const [timeLeft, setTimeLeft] = useState({
        days: 2,
        hours: 0,
        minutes: 0
    })

    const [seatsLeft, setSeatsLeft] = useState(27)

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch('/api/content')
                if (response.ok) {
                    const data = await response.json()
                    setContent({
                        price: data.price || '₹97',
                        originalPrice: data.originalPrice || '₹1,997',
                        enrollLink: data.enrollLink || 'https://pages.razorpay.com/hts-fbspecial'
                    })
                }
            } catch (error) {
                console.error('Error fetching content:', error)
            }
        }

        fetchContent()

        // Update countdown every minute
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1 }
                } else if (prev.hours > 0) {
                    return { ...prev, hours: prev.hours - 1, minutes: 59 }
                } else if (prev.days > 0) {
                    return { days: prev.days - 1, hours: 23, minutes: 59 }
                }
                return prev
            })
        }, 60000)

        // Update seats every few minutes
        const seatsTimer = setInterval(() => {
            setSeatsLeft(prev => Math.max(10, prev - Math.floor(Math.random() * 2)))
        }, 180000)

        return () => {
            clearInterval(timer)
            clearInterval(seatsTimer)
        }
    }, [])

    const features = [
        "90-minute live masterclass",
        "₹2,000 Automation Toolkit",
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
                        value="₹2,000"
                        icon="🎁"
                        accent="green"
                    />
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
                        <span>Seats Of This Event As Of {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }).replace(/(\d+)/, '$1th')} Is Low</span>
                    </div>
                </div>
                {/* Social Proof */}
                <div className="text-center">
                    <div className="backdrop-blur-2xl bg-white/30 border-2 border-white/50 rounded-2xl p-6 shadow-xl ring-1 ring-black/5">
                        <p className="text-lg text-gray-700 font-medium">
                            Join <span className="text-blue-600 font-bold">20000+ entrepreneurs</span> who've already transformed their businesses
                        </p>
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

    return (
        <div className={`backdrop-blur-xl bg-white/40 border-2 ${accentColors[accent]} rounded-2xl p-6 shadow-xl ring-1 ring-black/5 text-center`}>
            <div className="text-4xl mb-2">{icon}</div>
            <div className="text-gray-600 text-sm font-medium mb-1">{title}</div>
            <div className="text-2xl md:text-3xl font-bold text-gray-800">{value}</div>
        </div>
    )
}

function FeatureItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3 p-3 backdrop-blur-sm bg-white/30 border border-white/40 rounded-xl">
            <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 font-medium">{text}</p>
        </div>
    )
}
