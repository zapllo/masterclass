'use client'

import { useEffect, useState } from 'react'
import EnrollButtonWow from './enrollsticky'

interface ContentData {
  price: string
  originalPrice: string
  enrollLink: string
  eventDeadline: string
}

export default function StickyBottomCTA() {
    const [currentDate, setCurrentDate] = useState('')
    const [content, setContent] = useState<ContentData>({
        price: '₹97',
        originalPrice: '₹999',
        enrollLink: 'https://pages.razorpay.com/hts-fbspecial',
        eventDeadline: ''
    })

    useEffect(() => {
        const now = new Date()
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
        setCurrentDate(now.toLocaleDateString('en-US', options))

        const fetchContent = async () => {
            try {
                const response = await fetch('/api/content')
                if (response.ok) {
                    const data = await response.json()
                    setContent({
                        price: data.price || '₹97',
                        originalPrice: data.originalPrice || '₹999',
                        enrollLink: data.enrollLink || 'https://pages.razorpay.com/hts-fbspecial',
                        eventDeadline: data.eventDeadline || ''
                    })
                }
            } catch (error) {
                console.error('Error fetching content:', error)
            }
        }

        fetchContent()
    }, [])

    return (
        <div className="fixed bottom-0 left-0 w-full z-[9999] backdrop-blur-2xl bg-slate-900/90 border-t border-white/10 shadow-2xl">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-10 left-1/4 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -top-10 right-1/4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative container mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Left - Pricing with glassmorphism */}
                    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-4">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                {content.price}
                            </span>
                            <span className="text-lg md:text-xl text-slate-400 line-through">
                                {content.originalPrice}
                            </span>
                        </div>
                        <div className="text-xs md:text-sm text-slate-300 font-medium mt-1">
                            Deadline: {currentDate}
                        </div>
                    </div>

                    {/* Center - Urgency Message (Desktop) */}
                    <div className="hidden md:flex items-center gap-3 backdrop-blur-md bg-orange-500/10 border border-orange-500/20 rounded-full px-6 py-3">
                        <span className="text-2xl animate-bounce">⚡</span>
                        <span className="text-sm font-bold text-orange-400">Final Hours</span>
                    </div>

                    {/* Right - CTA */}
                    <div className="flex flex-col items-end gap-2">
                        <EnrollButtonWow
                            buttonText="SECURE SPOT"
                            className="text-sm md:text-base py-3 px-6"
                            showSeatsChip={true}
                        />
                        <div className="text-xs text-slate-400 backdrop-blur-sm bg-white/5 px-3 py-1 rounded-full border border-white/10">
                            + Bonus Materials
                        </div>
                    </div>
                </div>

                {/* Mobile Urgency Message */}
                <div className="md:hidden mt-3 text-center">
                    <div className="inline-flex items-center gap-2 backdrop-blur-md bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2">
                        <span className="text-lg animate-bounce">⚡</span>
                        <span className="text-xs font-bold text-orange-400">Final Hours - Limited Seats</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
