'use client'

import { useEffect, useState } from 'react'
import EnrollButton from './enroll'
import { ArrowDown, CalendarX, Languages } from 'lucide-react'

interface ContentData {
    price: string
    originalPrice: string
    enrollLink: string
}

export default function ReadyToBuySection() {
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

    return (
        <section className="py-20 relative overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
            {/* Enhanced glassmorphism background elements */}
            <div className="absolute inset-0 opacity-50">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/40 to-purple-500/40 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 max-w-6xl">
                {/* Header Section */}
                <div className="text-center mb-16">
                    {/* Language & Audience Badge */}
                    <div className="inline-block backdrop-blur-2xl bg-white/35 border-2 border-white/50 rounded-2xl px-8 py-6 w-full shadow-xl mb-8 ring-1 ring-white/30 max-w-2xl">
                        <div className="text-center space-y-4">
                            {/* Business Owners Only Badge */}
                            <div className="inline-flex items-center gap-2 backdrop-blur-xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-300/60 rounded-full px-4 py-2 shadow-lg">
                                <span className="text-sm">
                                    <Languages className='h-5' />
                                </span>
                                <span className="text-red-700 font-bold text-xs uppercase tracking-wide">Language & Audience</span>
                            </div>

                            {/* Language & Audience */}
                            <div>
                                <h3 className="text-blue-600 gap-2 flex justify-center font-bold text-xl mb-2">
                                    Hindi & English (हिंदी + English)
                                </h3>
                                <p className="text-gray-700 text-base leading-relaxed">
                                    Exclusive for Business Owners, CXOs, Founders, and Entrepreneurs who want to automate their team and delegate tasks effectively.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Main Headings Section */}
                    <div className="text-center mb-16 space-y-12">


                        {/* Decorative Separator */}
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-gray-400 rounded-full"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            <div className="w-16 h-0.5 bg-gradient-to-r from-gray-400 to-gray-400 rounded-full"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            <div className="w-8 h-0.5 bg-gradient-to-r from-gray-400 to-transparent rounded-full"></div>
                        </div>

                        {/* Secondary Truth Statement */}
                        {/* <div className="space-y-4">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 max-w-4xl mx-auto leading-tight">
                                It's Not Your Fault.
                            </h2>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold max-w-4xl mx-auto leading-tight">
                                But It <span className="text-red-600 font-black">IS</span> Now Our Problem to Solve.
                            </h2>
                        </div> */}

                        {/* Solution Promise */}
                        <div className="space-y-6">
                            <div className="inline-block backdrop-blur-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-2 border-blue-200/50 rounded-2xl px-4 py-2 shadow-lg">
                                <span className="text-blue-600 font-bold text-sm">⚡ TRANSFORMATION GUARANTEED</span>
                            </div>

                            <h3 className="text-3xl md:text-4xl lg:text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent leading-tight max-w-4xl mx-auto">
                                In Just 90 Minutes, Install the AI Framework That Cuts Costs, Saves Time & Puts Your Business on Autopilot.
                            </h3>
                        </div>
                    </div>
                    {/* Main Heading */}
                    {/* <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight mb-6">
                        Ready To Transform Your Business?
                    </h1>

                    <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 mx-auto rounded-full mb-8"></div> */}
                </div>
                {/* Problem vs Solution Section */}
                <div className="mb-16">
                    <div className="max-w-6xl mx-auto">
                        {/* Section Header */}
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-4">
                                From Chaos to Control
                            </h2>
                            <div className="w-20 h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 mx-auto rounded-full"></div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
                            {/* BEFORE - Reality Check */}
                            <div className="relative">
                                {/* Header Badge */}
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                                    <div className="inline-flex items-center gap-2 backdrop-blur-xl bg-gradient-to-r from-red-500/90 to-orange-500/90 text-white px-6 py-2 rounded-full shadow-xl border-2 border-red-200/50">
                                        <span className="text-lg">⚠️</span>
                                        <span className="font-bold text-sm uppercase tracking-wide">BEFORE</span>
                                    </div>
                                </div>

                                <div className="backdrop-blur-2xl bg-gradient-to-br from-red-50/40 to-orange-50/40 border-2 border-red-200/50 rounded-3xl p-8 pt-12 shadow-xl ring-1 ring-red-100/30 h-full">
                                    <div className="text-center mb-8">
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Current Reality</h3>
                                        <p className="text-gray-600">What you're dealing with right now</p>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Pain Points */}
                                        <div className="space-y-4">
                                            <ProblemPoint text="Constant WhatsApp chasing for updates" />
                                            <ProblemPoint text="Every decision bottlenecks through you" />
                                            <ProblemPoint text="Tasks fall through the cracks daily" />
                                            <ProblemPoint text="No clear accountability structure" />
                                            <ProblemPoint text="Team operates in reactive mode" />
                                            <ProblemPoint text="Growth feels impossible to manage" />
                                        </div>

                                        {/* Impact Statement */}
                                        <div className="backdrop-blur-lg bg-red-100/60 border-2 border-red-300/60 rounded-2xl p-6 shadow-lg mt-6">
                                            <div className="text-center">
                                                <div className="text-red-600 text-3xl mb-2">📉</div>
                                                <p className="text-red-800 font-bold text-lg">
                                                    Result: Burnout & Stagnation
                                                </p>
                                                <p className="text-red-700 text-sm mt-2">
                                                    You're working IN the business, not ON it
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* AFTER - The Solution */}
                            <div className="relative">
                                {/* Header Badge */}
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                                    <div className="inline-flex items-center gap-2 backdrop-blur-xl bg-gradient-to-r from-green-500/90 to-emerald-500/90 text-white px-6 py-2 rounded-full shadow-xl border-2 border-green-200/50">
                                        <span className="text-lg">🚀</span>
                                        <span className="font-bold text-sm uppercase tracking-wide">AFTER</span>
                                    </div>
                                </div>

                                <div className="backdrop-blur-2xl bg-gradient-to-br from-green-50/40 to-emerald-50/40 border-2 border-green-200/50 rounded-3xl p-8 pt-12 shadow-xl ring-1 ring-green-100/30 h-full">
                                    <div className="text-center mb-8">
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Your New Reality</h3>
                                        <p className="text-gray-600">What becomes possible with the right system</p>
                                    </div>

                                    <div className="space-y-6">

                                        <div className="space-y-4">
                                            <SolutionPoint
                                                icon="✓"
                                                title="Automated Status Updates"
                                                description="Real-time visibility without asking"
                                            />
                                            <SolutionPoint
                                                icon="✓"
                                                title="Delegation That Actually Works"
                                                description="Clear ownership and accountability"
                                            />
                                            <SolutionPoint
                                                icon="✓"
                                                title="Nothing Falls Through Cracks"
                                                description="Smart reminders and follow-ups"
                                            />
                                            <SolutionPoint
                                                icon="✓"
                                                title="Data-Driven Decisions"
                                                description="Performance metrics at your fingertips"
                                            />
                                            <SolutionPoint
                                                icon="✓"
                                                title="Proactive Team Culture"
                                                description="Self-managing, results-oriented"
                                            />
                                            <SolutionPoint
                                                icon="✓"
                                                title="Scalable Growth Systems"
                                                description="From 10 to 100+ employees seamlessly"
                                            />
                                        </div>


                                        {/* Impact Statement */}
                                        <div className="backdrop-blur-lg bg-green-100/60 border-2 border-green-300/60 rounded-2xl p-6 shadow-lg mt-6">
                                            <div className="text-center">
                                                <div className="text-green-600 text-3xl mb-2">📈</div>
                                                <p className="text-green-800 font-bold text-lg">
                                                    Result: Freedom & Growth
                                                </p>
                                                <p className="text-green-700 text-sm mt-2">
                                                    Focus on strategy while systems handle operations
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Transformation Arrow */}
                        <div className="flex justify-center my-8">
                            <div className="backdrop-blur-xl bg-white/40 border-2 border-white/60 rounded-full p-4 shadow-xl">
                                <div className="text-4xl animate-pulse"><ArrowDown/></div>
                            </div>
                        </div>

                        {/* Transformation Promise */}
                        <div className="text-center max-w-3xl mx-auto">
                            <div className="backdrop-blur-2xl bg-gradient-to-r from-blue-50/40 to-purple-50/40 border-2 border-blue-200/50 rounded-3xl p-8 shadow-xl ring-1 ring-blue-100/30">
                                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        90 Minutes to Complete Transformation
                                    </span>
                                </h3>
                                <p className="text-gray-700 text-lg">
                                    Get the exact step-by-step framework that moves you from left to right,
                                    from chaos to control, from burnout to breakthrough.
                                </p>
                            </div>
                        </div>
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

                {/* Bottom Statement */}
                <div className="text-center mt-16">
                    <div className="max-w-4xl mx-auto backdrop-blur-2xl bg-white/30 border-2 border-white/50 rounded-3xl p-10 shadow-xl ring-1 ring-white/30">
                        <h3 className="text-3xl md:text-4xl font-black text-gray-800 mb-6 leading-tight">
                            This isn't just another webinar.
                        </h3>
                        <p className="text-xl text-gray-700 leading-relaxed">
                            It's your blueprint to install a culture of
                            <span className="text-blue-600 font-bold"> accountability, ownership, and performance </span>
                            into the DNA of your company — forever.
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
function FrameworkPoint({ title, description }: { title: string; description: string }) {
    return (
        <div className="backdrop-blur-xl bg-white/30 border-2 border-white/50 rounded-xl p-4 hover:bg-white/40 hover:border-white/60 transition-all duration-300 ring-1 ring-black/5">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mt-1 shadow-lg">
                    <span className="text-white text-sm font-bold">✓</span>
                </div>
                <div>
                    <h4 className="text-gray-800 font-bold text-lg mb-2">{title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
                </div>
            </div>
        </div>
    )
}


// ... existing code ...

/* ============== Custom Components ============== */

function ProblemPoint({ text }: { text: string }) {
    return (
        <div className="flex items-start gap-3 p-3 backdrop-blur-lg bg-red-100/40 border border-red-200/60 rounded-xl shadow-sm">
            <div className="flex-shrink-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mt-0.5 shadow-sm">
                <span className="text-white text-xs font-bold">×</span>
            </div>
            <p className="text-gray-700 text-sm font-medium leading-relaxed">{text}</p>
        </div>
    )
}

function SolutionPoint({ icon, title, description }: { icon: string; title: string; description: string }) {
    return (
        <div className="flex items-start gap-4 p-4 backdrop-blur-lg bg-green-100/40 border border-green-200/60 rounded-xl shadow-sm hover:bg-green-100/60 transition-colors duration-300">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-sm">{icon}</span>
            </div>
            <div>
                <h4 className="text-gray-800 font-bold text-sm mb-1">{title}</h4>
                <p className="text-gray-600 text-xs leading-relaxed">{description}</p>
            </div>
        </div>
    )
}

// Keep existing FrameworkPoint component...
