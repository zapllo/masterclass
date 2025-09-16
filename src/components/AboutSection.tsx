'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
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

export default function AboutSection() {
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

    const achievements = [
        "Helped 12,000+ MSMEs automate operations",
        "TEDx + Josh Talks Speaker",
        "Founder of Zapllo",
        "Shared stage with Sanjeev Bikhchandani (Naukri.com)",
        "10+ years working closely with MSMEs like yours"
    ]

    const stats = [
        { number: "12,000+", label: "MSMEs Helped" },
        { number: "10+", label: "Years Experience" },
        { number: "TEDx", label: "Speaker" },
        { number: "#1", label: "Automation Expert" }
    ]

    return (
        <section className="py-10 relative mx-6 overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
            {/* Enhanced glassmorphism background elements */}
            <div className="absolute inset-0 opacity-60">
                <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-r from-blue-400/60 to-purple-500/60 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-r from-purple-500/50 to-pink-500/50 rounded-full blur-2xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-gradient-to-r from-cyan-500/50 to-blue-500/50 rounded-full blur-2xl animate-pulse delay-2000"></div>
                <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-emerald-400/40 to-teal-500/40 rounded-full blur-2xl animate-pulse delay-3000"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 max-w-7xl">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="backdrop-blur-2xl bg-white/35 border-2 border-white/60 rounded-3xl p-8 shadow-2xl ring-1 ring-black/5">
                        <div className="inline-block backdrop-blur-md bg-blue-600/90 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
                            Know Your Coach
                        </div>
                         <h1 className={`text-4xl md:text-5xl lg:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-orange-500 bg-clip-text text-transparent leading-tight tracking-tight ${shadowsIntoLight.className}`}>
                            <span className="text-blue-600">Shubhodeep Banerjee</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 font-medium mb-6">
                            India's Leading Business Automation Coach
                        </p>
                        <div className="backdrop-blur-md bg-white/50 border border-white/60 rounded-2xl p-6 max-w-3xl mx-auto">
                            <p className="text-lg text-gray-700 italic font-medium">
                                "I believe MSMEs deserve systems like big companies — without big company costs."
                            </p>
                            <p className="text-gray-600 font-semibold mt-2">- Shubhodeep Banerjee</p>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
                    {/* Left - Coach Image */}
                    <div className="text-center lg:text-left">
                        <div className="backdrop-blur-2xl bg-white/30 border-2 border-white/50 rounded-3xl p-8 shadow-2xl ring-1 ring-black/5">
                            <div className="relative">
                                {/* Glow effect behind image */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-2xl"></div>
                                <div className="relative max-w-md mx-auto">
                                    <Image
                                        src="/deep.png"
                                        alt="Shubhodeep Banerjee - Business Automation Coach"
                                        width={1024}
                                        height={1024}
                                        className="w-full h-auto ml-8 rounded-2xl "
                                    />
                                </div>
                            </div>

                            {/* Hosted by badge */}
                            <div className="mt-  text-center">
                                <div className="backdrop-blur-md bg-green-200 text-black px-6 py-3 rounded-xl inline-block">
                                    <p className="text-base font-medium">Hosted by:</p>
                                    <p className="font-bold text-lg">Shubhodeep Banerjee</p>
                                    <p className="text-base opacity-90">India’s #1 AI Growth Coach for MSMEs</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right - Stats and Achievements */}
                    <div className="space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {stats.map((stat, index) => (
                                <StatCard key={index} {...stat} />
                            ))}
                        </div>

                        {/* Achievements List */}
                        <div className="backdrop-blur-2xl bg-white/40 border-2 border-white/60 rounded-3xl p-8 shadow-2xl ring-1 ring-black/5">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                Track Record of Excellence
                            </h3>
                            <div className="space-y-4">
                                {achievements.map((achievement, index) => (
                                    <AchievementItem key={index} text={achievement} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

               {/* Pricing Glassmorphism Card */}
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

function StatCard({ number, label }: { number: string; label: string }) {
    return (
        <div className="backdrop-blur-xl bg-white/40 border-2 border-white/60 rounded-2xl p-4 shadow-xl hover:bg-white/50 transition-all duration-300 ring-1 ring-black/5 text-center">
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                {number}
            </div>
            <div className="text-gray-700 text-sm font-semibold">{label}</div>
        </div>
    )
}

function AchievementItem({ text }: { text: string }) {
    return (
        <div className="flex items-start gap-4 p-3 backdrop-blur-md bg-white/30 border border-white/40 rounded-xl hover:bg-white/40 transition-all duration-300">
            <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-white text-sm font-bold">✓</span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed font-medium">{text}</p>
        </div>
    )
}
