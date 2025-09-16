'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
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


export default function BonusSection() {
    const [content, setContent] = useState<ContentData>({
        price: '₹97',
        originalPrice: '₹1,997',
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
                        originalPrice: data.originalPrice || '₹1,997',
                        enrollLink: data.enrollLink || 'https://pages.razorpay.com/hts-fbspecial'
                    })
                }
            } catch (error) {
                console.error('Error fetching content:', error)
            }
        }

        fetchContent()
    }, [])

    const bonuses = [
        {
            title: "Team Performance Dashboard",
            description: "Real-time analytics to track productivity and identify bottlenecks",
            value: "₹15,000",
            image: "https://lp.launchatscale.com/wp-content/uploads/2024/05/Frame-1519-8.png.webp",
            icon: "📊"
        },
        {
            title: "Delegation Playbook Templates",
            description: "Ready-to-use SOPs and task delegation frameworks",
            value: "₹12,000",
            image: "https://lp.launchatscale.com/wp-content/uploads/2024/05/Frame-1519-2.webp",
            icon: "📋"
        },
        {
            title: "Accountability Systems Toolkit",
            description: "Automated tracking and reporting systems for team oversight",
            value: "₹18,000",
            image: "https://lp.launchatscale.com/wp-content/uploads/2024/05/Frame-1519-3.webp",
            icon: "🎯"
        },
        {
            title: "1-Hour Private Consultation",
            description: "Personal session with Shubhodeep to customize your automation strategy",
            value: "₹25,000",
            image: "https://lp.launchatscale.com/wp-content/uploads/2024/05/Frame-1519-4.webp",
            icon: "💼"
        },
        {
            title: "Exclusive Leadership Community",
            description: "Lifetime access to network with 500+ successful business owners",
            value: "₹8,000",
            image: "https://lp.launchatscale.com/wp-content/uploads/2024/05/Frame-1519-8.png.webp",
            icon: "🤝"
        },
        {
            title: "Monthly Implementation Calls",
            description: "6 months of group coaching calls for ongoing support",
            value: "₹30,000",
            image: "https://lp.launchatscale.com/wp-content/uploads/2024/05/Frame-1519-2.webp",
            icon: "📞"
        }
    ]

    const totalValue = bonuses.reduce((sum, bonus) => {
        return sum + parseInt(bonus.value.replace('₹', '').replace(',', ''))
    }, 0)

    return (
        <section className="py-10 relative overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 mx-6">
            {/* Enhanced glassmorphism background elements */}
            <div className="absolute inset-0 opacity-60">
                <div className="absolute top-1/5 left-1/6 w-96 h-96 bg-gradient-to-r from-blue-400/60 to-purple-500/60 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-1/5 right-1/6 w-80 h-80 bg-gradient-to-r from-purple-500/50 to-pink-500/50 rounded-full blur-2xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-cyan-500/50 to-blue-500/50 rounded-full blur-2xl animate-pulse delay-2000"></div>
                <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-emerald-400/40 to-teal-500/40 rounded-full blur-2xl animate-pulse delay-3000"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 max-w-7xl">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="te/60 rounded-3xl p-8  ring-black/5">
                        <div className="inline-block backdrop-blur-md bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold mb-6">
                            🎁 EXCLUSIVE BONUSES
                        </div>
                        <h1 className={`text-4xl md:text-5xl lg:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-orange-500 bg-clip-text text-transparent leading-tight tracking-tight ${shadowsIntoLight.className}`}>
                            Get <span className="">₹1,08,000 Worth</span> of
                            <br />Business Automation Tools
                        </h1>
                        <p className="text-xl text-gray-600 font-medium mb-6">
                            Everything you need to build a completely automated, profitable business
                        </p>
                        <div className="backdrop-blur-md bg-green-50/80 border border-green-200/60 rounded-full px-8 py-3 inline-block">
                            <span className="text-green-700 font-bold text-lg">
                                FREE when you join today (normally ₹1,08,000)
                            </span>
                        </div>
                    </div>

                    {/* Hero Bonus Image */}
                    <div className="mt-12">
                        <div className="0 rounded-3xl p-6 -2xl  max-w-2xl mx-auto">
                            <Image
                                src="https://lp.launchatscale.com/wp-content/uploads/2025/02/9222d943181e28e25f5b5afe9ad302d5_1200_80-1024x576.webp"
                                alt="Business Automation Bonus Package"
                                width={1024}
                                height={576}
                                className="w-full h-auto rounded-2xl -xl"
                            />
                        </div>
                    </div>
                </div>

                {/* Bonuses Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {bonuses.map((bonus, index) => (
                        <BonusCard key={index} {...bonus} />
                    ))}
                </div>

                {/* Total Value Section */}
                <div className="backdrop-blur-2xl bg-white/40 border-2 border-white/70 rounded-3xl p-8 shadow-2xl ring-1 ring-black/5 mb-4">
                    <div className="text-center">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                            Total Bonus Value
                        </h3>
                        <div className="flex items-center justify-center gap-6 mb-6">
                            <span className="text-4xl md:text-5xl font-bold text-red-600 line-through">
                                ₹{totalValue.toLocaleString()}
                            </span>
                            <span className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                FREE
                            </span>
                        </div>
                        <p className="text-xl text-gray-700 font-medium">
                            When you secure your spot in the masterclass today
                        </p>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="text-center">
                    <div className=" rounded-3xl p-8   max-w-2xl mx-auto">


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

function BonusCard({ title, description, value, image, icon }: {
    title: string
    description: string
    value: string
    image: string
    icon: string
}) {
    return (
        <div className="backdrop-blur-xl p-2 bg-white/40 border-2 border-white/60 rounded-2xl shadow-xl hover:bg-white/50 hover:border-white/70 transition-all duration-300 ring-1 ring-black/5 h-full overflow-hidden">
            {/* Image Section */}
            <div className="relative">
                <Image
                    src={image}
                    alt={title}
                    width={549}
                    height={300}
                    className="w-full h-full object-cover"
                />

                {/* Icon overlay */}
                {/* <div className="absolute top-4 left-4 backdrop-blur-sm bg-white/80 rounded-full p-3 shadow-lg">
                    <span className="text-2xl">{icon}</span>
                </div> */}

                {/* Value badge */}
                {/* <div className="absolute top-4 right-4 backdrop-blur-sm bg-green-500/90 text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg">
                    {value}
                </div> */}
            </div>

            {/* Content Section */}
            <div className="p-6">
                <h3 className="text-gray-800 font-bold text-lg mb-3 leading-tight">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>

                {/* FREE Badge */}
                <div className="text-center">
                    <div className="backdrop-blur-sm bg-green-200 -500/90 text-black px-4 py-2 rounded-full text-sm font-bold inline-block shadow-lg">
                        <span className='line-through'>  {value}</span> FREE For Today
                    </div>
                </div>
            </div>
        </div>
    )
}
