'use client'

import { useEffect, useState } from 'react'
import EnrollButton from './enroll'
import { CalendarX } from 'lucide-react'

interface ContentData {
    price: string
    originalPrice: string
    enrollLink: string
}

interface QualificationState {
    [key: number]: boolean
}

export default function AgendaSection() {
    const [content, setContent] = useState<ContentData>({
        price: '₹97',
        originalPrice: '₹999',
        enrollLink: 'https://pages.razorpay.com/hts-fbspecial'
    })

    const [checkedItems, setCheckedItems] = useState<QualificationState>({})
    const [allChecked, setAllChecked] = useState(false)

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

    useEffect(() => {
        const totalItems = qualifications.length
        const checkedCount = Object.values(checkedItems).filter(Boolean).length
        setAllChecked(checkedCount === totalItems && totalItems > 0)
    }, [checkedItems])

    const handleCheckboxChange = (index: number, checked: boolean) => {
        setCheckedItems(prev => ({
            ...prev,
            [index]: checked
        }))
    }


    const qualifications = [
        {
            icon: "👑",
            title: "Leadership Role",
            description: "I'm the Business Owner / Founder / CEO and I want freedom from day-to-day firefighting."
        },
        {
            icon: "🧑‍🤝‍🧑",
            title: "Team Management",
            description: "I manage 5–50+ team members and struggle with constant follow-ups, delays & excuses."
        },
        {
            icon: "📈",
            title: "Revenue Stage",
            description: "My business is generating at least ₹50 Lakhs – ₹1 Crore annually OR I'm committed to reach there fast."
        },
        {
            icon: "🚀",
            title: "Growth Vision",
            description: "I know my product/service has potential, but operational chaos and manual work are holding me back."
        },
        {
            icon: "💰",
            title: "Investment Mindset",
            description: "I'm willing to invest in proven systems that can save 3–5 hours daily and multiply profits."
        }
    ]

    const checkedCount = Object.values(checkedItems).filter(Boolean).length
    const completionPercentage = (checkedCount / qualifications.length) * 100

    return (
        <section className="py-4 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-indigo-500/15 to-purple-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 max-w-5xl">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="space-y-6">
                        <div className="inline-block backdrop-blur-xl bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border-2 border-blue-200/50 rounded-2xl px-8 py-3 shadow-lg">
                            <span className="text-blue-700 font-bold text-lg">🎯 QUALIFICATION CHECK</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                            Is This
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Masterclass </span>
                            Right for You?
                        </h1>

                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            This exclusive session is designed for serious business leaders.
                            Check the boxes that apply to you:
                        </p>

                        {/* Progress Bar */}
                        {checkedCount > 0 && (
                            <div className="max-w-md mx-auto">
                                <div className="backdrop-blur-xl bg-white/50 border-2 border-white/60 rounded-2xl p-4 shadow-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">Your Fit Score</span>
                                        <span className="text-sm font-bold text-blue-600">{Math.round(completionPercentage)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500 ease-out"
                                            style={{ width: `${completionPercentage}%` }}
                                        ></div>
                                    </div>
                                    {allChecked && (
                                        <div className="text-center mt-2">
                                            <span className="text-green-600 font-bold text-sm">🎉 Perfect Match!</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Qualifications Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                    {qualifications.map((qualification, index) => (
                        <QualificationCard
                            key={index}
                            {...qualification}
                            index={index}
                            checked={checkedItems[index] || false}
                            onCheckedChange={handleCheckboxChange}
                        />
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <div className={` rounded-3xl p-10  max-w-3xl mx-auto transition-all duration-700 ${allChecked
                            ? ''
                            : ''
                        }`}>


                        {/* <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
                            {allChecked
                                ? 'Ready to Transform Your Leadership?'
                                : checkedCount >= 3
                                    ? 'You\'re Almost There!'
                                    : 'Ready to Break Free from Daily Chaos?'
                            }
                        </h2> */}

                        {/* Pricing */}
                        {/* <div className="space-y-6 mb-8">
                            <div className="flex items-center justify-center gap-6">
                                <span className="text-3xl text-gray-400 line-through">{content.originalPrice}</span>
                                <div className="text-center">
                                    <span className="text-6xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                        {content.price}
                                    </span>
                                    <div className="text-gray-600 text-sm font-medium">90-minute intensive session</div>
                                </div>
                            </div>

                            <div className="inline-block backdrop-blur-lg bg-orange-100/60 border-2 border-orange-200/60 rounded-full px-6 py-2">
                                <span className="text-orange-700 font-bold">Limited Time: Save ₹902!</span>
                            </div>
                        </div> */}

                        {/* CTA Button */}
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
                </div>
            </div>
        </section>
    )
}

/* ============== Custom Components ============== */

interface QualificationCardProps {
    title: string
    description: string
    index: number
    checked: boolean
    onCheckedChange: (index: number, checked: boolean) => void
}

function QualificationCard({ title, description, index, checked, onCheckedChange }: QualificationCardProps) {
    return (
        <div
            className={`group cursor-pointer backdrop-blur-xl border-2 rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl transform hover:scale-[1.02] ${checked
                    ? 'bg-gradient-to-br from-green-50/60 to-emerald-50/60 border-green-300/60 ring-2 ring-green-200/30'
                    : 'bg-white/50 border-gray-200/60 hover:bg-white/70 hover:border-gray-300/70'
                }`}
            onClick={() => onCheckedChange(index, !checked)}
        >
            <div className="flex items-start gap-4">
                {/* Checkbox Icon */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all duration-300 shadow-lg ${checked
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-400 scale-110'
                        : 'bg-white border-gray-300 group-hover:border-blue-400 group-hover:bg-blue-50'
                    }`}>
                    {checked && (
                        <span className="text-white text-lg font-bold animate-in zoom-in duration-200">✓</span>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1">
                    <h3 className={`font-bold text-lg mb-2 transition-colors duration-300 ${checked ? 'text-green-800' : 'text-gray-800 group-hover:text-blue-800'
                        }`}>
                        {title}
                    </h3>
                    <p className={`text-sm leading-relaxed transition-colors duration-300 ${checked ? 'text-green-700' : 'text-gray-600 group-hover:text-gray-700'
                        }`}>
                        {description}
                    </p>
                </div>
            </div>

            {/* Hover indicator */}
            {!checked && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
            )}
        </div>
    )
}
