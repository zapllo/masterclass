'use client'

import { useEffect, useRef, useState } from 'react'
import EnrollButton from './enroll'
import { Unbounded } from 'next/font/google'
import { CalendarX } from 'lucide-react'

interface ContentData {
    price: string
    originalPrice: string
    enrollLink: string
}


const shadowsIntoLight = Unbounded({
    weight: '600',
    subsets: ['latin']
})

// Add this hook for intersection observer
function useInView(threshold = 0.1) {
    const [inView, setInView] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true)
                }
            },
            { threshold }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()
    }, [threshold])

    return { ref, inView }
}

// Counter animation hook
function useCounter(end: number, duration = 2000, start = 0) {
    const [count, setCount] = useState(start)
    const [isAnimating, setIsAnimating] = useState(false)

    const startAnimation = () => {
        if (isAnimating) return

        setIsAnimating(true)
        const startTime = Date.now()
        const startValue = start

        const animate = () => {
            const now = Date.now()
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            const currentValue = Math.floor(startValue + (end - startValue) * easeOutQuart)

            setCount(currentValue)

            if (progress < 1) {
                requestAnimationFrame(animate)
            } else {
                setIsAnimating(false)
            }
        }

        requestAnimationFrame(animate)
    }

    return { count, startAnimation, isAnimating }
}

export default function TsunamiSection() {
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

    const industries = [
        { name: "Manufacturing", icon: "🏭" },
        { name: "Retail", icon: "🛍️" },
        { name: "Healthcare", icon: "🏥" },
        { name: "Real Estate", icon: "🏢" },
        { name: "Consulting", icon: "💼" },
        { name: "IT & Software", icon: "💻" },
        { name: "Education", icon: "🎓" },
        { name: "E-commerce", icon: "🛒" },
        { name: "Finance", icon: "💰" },
        { name: "Logistics", icon: "🚛" },
        { name: "Hospitality", icon: "🏨" },
        { name: "Services", icon: "🔧" },
        { name: "Construction", icon: "🏗️" },
        { name: "Automotive", icon: "🚗" },
        { name: "Franchise", icon: "🔗" }
    ]

    return (
        <section className="py-4 relative overflow-hidden mx-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
            {/* Enhanced glassmorphism background elements */}
            <div className="absolute inset-0 opacity-60">
                <div className="absolute top-1/5 left-1/6 w-96 h-96 bg-gradient-to-r from-blue-400/60 to-purple-500/60 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-1/5 right-1/6 w-80 h-80 bg-gradient-to-r from-purple-500/50 to-pink-500/50 rounded-full blur-2xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-cyan-500/50 to-blue-500/50 rounded-full blur-2xl animate-pulse delay-2000"></div>
                <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-gradient-to-r from-emerald-400/40 to-teal-500/40 rounded-full blur-2xl animate-pulse delay-3000"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 max-w-7xl">
                {/* Main Header */}
                <div className="text-center mb-4">
                    <div className=" rounded-3xl p-8  ">
                        <h1 className={`text-3xl md:text-5xl lg:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-orange-500 bg-clip-text text-transparent leading-tight tracking-tight ${shadowsIntoLight.className}`}>
                            <span className="">Proven Results</span> Across{' '}
                            <br className='hidden md:block' />Every Major Industry
                        </h1>
                        <p className="text-xl mt-4 text-gray-600 font-medium">
                            From manufacturing floors to digital offices, our framework works everywhere
                        </p>
                    </div>
                </div>

                {/* Industries Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
                    {industries.map((industry, index) => (
                        <IndustryCard key={index} {...industry} />
                    ))}
                </div>

                {/* Stats Section */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <AnimatedStatCard
                        targetNumber={20000}
                        suffix="+"
                        label="Industries Transformed"
                        description="Proven success across diverse business sectors"
                    />
                    <AnimatedStatCard
                        targetNumber={80000}
                        suffix="+"
                        label="Teams Automated"
                        description="From startups to enterprise-level operations"
                    />
                    <AnimatedStatCard
                        targetNumber={65}
                        suffix="%"
                        prefix="Upto "
                        label="Reduction in Costs"
                        description="Reduction in operational costs within the first 6 months"
                    />
                </div>

                {/* Testimonial Section */}
                <div className="backdrop-blur-2xl bg-white/30 border-2 border-white/50 rounded-3xl p-8 shadow-2xl ring-1 ring-black/5 mb-16">
                    <div className="text-center">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                            "This System Works in <span className="text-blue-600">Any Business</span>"
                        </h3>
                        <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                            Whether you're running a manufacturing plant with 50+ workers or a digital agency with remote teams,
                            the principles of accountability and systematic delegation remain the same.
                            <span className="font-semibold text-blue-600"> The framework adapts to your industry's unique challenges.</span>
                        </p>
                    </div>
                </div>

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
                <div className="">
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

/* ============== Updated Custom Components ============== */

function AnimatedStatCard({
    targetNumber,
    suffix = '',
    prefix = '',
    label,
    description
}: {
    targetNumber: number;
    suffix?: string;
    prefix?: string;
    label: string;
    description: string;
}) {
    const { ref, inView } = useInView(0.3)
    const { count, startAnimation } = useCounter(targetNumber, 2500)
    const [hasAnimated, setHasAnimated] = useState(false)

    useEffect(() => {
        if (inView && !hasAnimated) {
            startAnimation()
            setHasAnimated(true)
        }
    }, [inView, hasAnimated, startAnimation])

    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'k'
        }
        return num.toString()
    }

    return (
        <div
            ref={ref}
            className="backdrop-blur-xl bg-white/40 border-2 border-white/60 rounded-2xl p-6 shadow-xl hover:bg-white/50 transition-all duration-300 ring-1 ring-black/5 text-center group"
        >
            <div className="space-y-3">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    {prefix}
                    {targetNumber >= 1000 ? formatNumber(count) : count}
                    {suffix}
                </div>
                <h3 className="text-gray-800 font-bold text-lg">{label}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            </div>

            {/* Animated progress ring for visual feedback */}
            <div className="absolute top-2 right-2 w-3 h-3">
                <div className={`w-full h-full rounded-full transition-all duration-2500 ${hasAnimated
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse'
                    : 'bg-gray-300'
                    }`}></div>
            </div>
        </div>
    )
}

// Keep existing IndustryCard component unchanged
function IndustryCard({ name, icon }: { name: string; icon: string }) {
    return (
        <div className="backdrop-blur-xl bg-white/40 border-2 border-white/60 rounded-2xl p-4 shadow-xl hover:bg-white/50 hover:border-white/70 hover:scale-105 transition-all duration-300 ring-1 ring-black/5">
            <div className="text-center space-y-3">
                <div className="text-3xl mb-2">{icon}</div>
                <h3 className="text-gray-800 font-semibold text-sm leading-tight">{name}</h3>
            </div>
        </div>
    )
}
