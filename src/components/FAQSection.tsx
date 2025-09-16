'use client'

import { useState } from 'react'
import { ChevronDown, MessageCircleQuestion, Sparkles } from 'lucide-react'

const faqs = [
    {
        question: "Who is this AI transformation workshop for?",
        answer: "This is specifically designed for MSME owners, business founders, CXOs, and entrepreneurs who are tired of manual operations and want to automate their teams with AI. Whether you run manufacturing, retail, consulting, or any other business with 5-100+ employees, this framework works."
    },
    {
        question: "How is this different from other AI automation courses?",
        answer: "Unlike generic AI courses, this is a proven system specifically tested on 20,000+ MSMEs across India. You get practical, implementable frameworks that work in real Indian business conditions - not theoretical concepts. Plus, it's taught in both Hindi and English."
    },
    {
        question: "What if I'm not tech-savvy? Can I still implement this?",
        answer: "Absolutely! This system is designed for business owners, not techies. You'll get step-by-step implementation guides, ready-to-use templates, and simple tools that require zero coding. If you can use WhatsApp, you can implement this AI framework."
    },
    {
        question: "Will this work for my specific industry?",
        answer: "Yes! This framework has been successfully implemented across 15+ major industries - manufacturing, retail, healthcare, real estate, consulting, IT, education, e-commerce, finance, logistics, hospitality, construction, automotive, and more. The principles adapt to any business model."
    },
    {
        question: "Is there a money-back guarantee?",
        answer: "Absolutely! You get a 30-day 'no questions asked' money-back guarantee. If you're not completely satisfied with the AI transformation framework, get a full refund. You even keep all the bonus materials."
    },
    {
        question: "When can I start seeing results?",
        answer: "Most participants start seeing initial improvements within 7-14 days of implementation. Significant cost savings and time reduction typically happen within 30-60 days. Complete transformation usually takes 3-6 months depending on your business size and complexity."
    }
]

function ChevronIcon({ isActive }: { isActive: boolean }) {
    return (
        <ChevronDown
            className={`w-5 h-5 transition-transform duration-300 ease-in-out ${isActive ? 'rotate-180' : ''} text-white -600`}
        />
    )
}

interface FAQItemProps {
    question: string
    answer: string
    isActive: boolean
    onClick: () => void
}

function FAQItem({ question, answer, isActive, onClick }: FAQItemProps) {
    return (
        <div className="group backdrop-blur-2xl bg-gradient-to-br from-white/40 via-white/30 to-white/20 border border-white/40 rounded-2xl mb-4 shadow-xl hover:bg-white/50 transition-all duration-300 ring-1 ring-white/20 overflow-hidden">
            {/* Glass overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div
                className="relative z-10 text-base font-bold leading-tight p-6 cursor-pointer flex justify-between items-start text-left text-gray-800 hover:text-gray-900 transition-colors duration-200"
                onClick={onClick}
            >
                <span className="flex-1 pr-4">{question}</span>
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <ChevronIcon isActive={isActive} />
                </div>
            </div>

            <div className={`relative z-10 overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <div className="px-6 pb-6 pt-0">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-4"></div>
                    <p className="text-gray-700 leading-relaxed text-sm">{answer}</p>
                </div>
            </div>
        </div>
    )
}

export default function FAQSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0) // Start with first FAQ open

    const handleToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index)
    }

    return (
        <section className="w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden py-16 px-4">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 backdrop-blur-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-2 border-blue-200/50 rounded-full px-6 py-3 shadow-lg mb-6">
                        <MessageCircleQuestion className="h-6 w-6 text-blue-600" />
                        <span className="text-blue-700 font-bold text-sm uppercase tracking-wide">FAQ Section</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 mb-6 leading-tight">
                        Got Questions About
                        <br />
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
                            The Masterclass?
                        </span>
                    </h2>

                    <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                        Everything you need to know about implementing AI in your MSME
                    </p>

                    {/* Decorative separator */}
                    <div className="flex items-center justify-center gap-2 mt-8 mb-4">
                        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-blue-400 rounded-full"></div>
                        <Sparkles className="h-4 w-4 text-blue-500" />
                        <div className="w-24 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                        <Sparkles className="h-4 w-4 text-purple-500" />
                        <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-transparent rounded-full"></div>
                    </div>
                </div>

                {/* FAQ Container */}
                <div className="space-y-2">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isActive={activeIndex === index}
                            onClick={() => handleToggle(index)}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                {/* <div className="text-center mt-12">
                    <div className="backdrop-blur-2xl bg-gradient-to-r from-blue-50/60 to-purple-50/60 border-2 border-blue-200/50 rounded-3xl p-8 shadow-xl ring-1 ring-blue-100/30">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            Still Have Questions?
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Join the workshop and get all your doubts cleared during the live Q&A session
                        </p>
                        <div className="inline-flex items-center gap-2 backdrop-blur-xl bg-gradient-to-r from-green-500/90 to-emerald-600/90 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                            <span className="font-bold text-sm">GET ANSWERS LIVE</span>
                            <ChevronDown className="h-4 w-4" />
                        </div>
                    </div>
                </div> */}
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
