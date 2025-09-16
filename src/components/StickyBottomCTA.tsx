'use client'

import { useEffect, useState } from 'react'
import EnrollButton from './enroll'
import { Clock, Zap } from 'lucide-react'

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
        <div className="fixed bottom-0 left-0 w-full z-[9999] bg-white border-t border-gray-200 shadow-lg">
            <div className="container mx-auto px-4 py-3">
                {/* Desktop Layout */}
                <div className="hidden md:flex items-center justify-between">
                    {/* Left - Clean Pricing */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-green-600">
                                {content.price}
                            </span>
                            <span className="text-lg text-gray-400 line-through">
                                {content.originalPrice}
                            </span>
                        </div>
                        <div className="h-6 w-px bg-gray-300"></div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>Ends {currentDate}</span>
                        </div>
                    </div>

                    {/* Center - Urgency */}
                    <div className="flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
                        <Zap className="h-4 w-4" />
                        <span>Limited Time Offer</span>
                    </div>

                    {/* Right - CTA */}
                    <div>
                        <EnrollButton
                            className=""
                            showSeatsChip={true}
                        />
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden">
                    {/* Mobile Top Row */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <div className="flex items-baseline gap-2">
                                <span className="text-xl font-bold text-green-600">
                                    {content.price}
                                </span>
                                <span className="text-base text-gray-400 line-through">
                                    {content.originalPrice}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                            <Zap className="h-3 w-3" />
                            <span>Limited Time</span>
                        </div>
                    </div>

                    {/* Mobile CTA */}
                    <div className="w-full">
                        <EnrollButton
                            className="w-full"
                            showSeatsChip={true}
                        />
                    </div>
                </div>
            </div>

            {/* Subtle top border accent */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500"></div>
        </div>
    )
}
