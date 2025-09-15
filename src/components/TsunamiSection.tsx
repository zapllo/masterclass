'use client'

import { useEffect, useState } from 'react'
import EnrollButton from './enroll'

interface ContentData {
    price: string
    originalPrice: string
    enrollLink: string
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
        <section className="py-20 relative overflow-hidden mx-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
            {/* Enhanced glassmorphism background elements */}
            <div className="absolute inset-0 opacity-60">
                <div className="absolute top-1/5 left-1/6 w-96 h-96 bg-gradient-to-r from-blue-400/60 to-purple-500/60 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-1/5 right-1/6 w-80 h-80 bg-gradient-to-r from-purple-500/50 to-pink-500/50 rounded-full blur-2xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-cyan-500/50 to-blue-500/50 rounded-full blur-2xl animate-pulse delay-2000"></div>
                <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-gradient-to-r from-emerald-400/40 to-teal-500/40 rounded-full blur-2xl animate-pulse delay-3000"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 max-w-7xl">
                {/* Main Header */}
                <div className="text-center mb-16">
                    <div className="backdrop-blur-2xl bg-white/35 border-2 border-white/60 rounded-3xl p-8 shadow-2xl ring-1 ring-black/5">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                            <span className="text-blue-600">Proven Results</span> Across
                            <br />Every Major Industry
                        </h2>
                        <p className="text-xl text-gray-600 font-medium">
                            From manufacturing floors to digital offices - our framework works everywhere
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
                    <StatCard
                        number="15+"
                        label="Industries Transformed"
                        description="Proven success across diverse business sectors"
                    />
                    <StatCard
                        number="1000+"
                        label="Teams Automated"
                        description="From startups to enterprise-level operations"
                    />
                    <StatCard
                        number="85%"
                        label="Time Savings"
                        description="Average reduction in manual oversight"
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

                {/* Call to Action Section */}
                <div className="text-center">
                    <div className="backdrop-blur-2xl bg-white/40 border-2 border-white/70 rounded-3xl p-8 shadow-2xl ring-1 ring-black/5 max-w-2xl mx-auto">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                            Ready to Transform Your Industry?
                        </h3>

                        <div className="space-y-6">
                            <div className="flex items-center justify-center gap-4">
                                <span className="text-3xl text-gray-400 line-through">{content.originalPrice}</span>
                                <span className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                    {content.price}
                                </span>
                            </div>

                            <div className="text-gray-600 font-medium">Industry-agnostic leadership transformation</div>

                            <EnrollButton
                                price={content.price}
                                originalPrice={content.originalPrice}
                                buttonText="JOIN INDUSTRY LEADERS"
                                className="transform hover:scale-105 transition-all duration-300"
                            />

                            <p className="text-sm text-gray-500 italic">
                                Join leaders from 15+ industries who've already transformed their operations
                            </p>
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

function StatCard({ number, label, description }: { number: string; label: string; description: string }) {
    return (
        <div className="backdrop-blur-xl bg-white/40 border-2 border-white/60 rounded-2xl p-6 shadow-xl hover:bg-white/50 transition-all duration-300 ring-1 ring-black/5 text-center">
            <div className="space-y-3">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {number}
                </div>
                <h3 className="text-gray-800 font-bold text-lg">{label}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            </div>
        </div>
    )
}
