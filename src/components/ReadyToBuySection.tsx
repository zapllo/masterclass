'use client'

import { useEffect, useState } from 'react'
import EnrollButton from './enroll'
import { ArrowDown, CalendarX, Languages } from 'lucide-react'
import { Outfit, Shadows_Into_Light, Unbounded } from 'next/font/google'

interface ContentData {
    price: string
    originalPrice: string
    enrollLink: string
}



const shadowsIntoLight = Unbounded({
    weight: '600',
    subsets: ['latin']
})

const outfit = Outfit({
    weight: '400',
    subsets: ['latin']
})


const AnimatedArrow = ({ className = "" }: { className?: string }) => (
    <div className={`inline-block ${className}`}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 500"
            width="60"
            height="60"
            preserveAspectRatio="xMidYMid meet"
            className="w-12 h-12 sm:w-16 sm:h-16"
        >
            <defs>
                <clipPath id="__lottie_element_38">
                    <rect width="500" height="500" x="0" y="0"></rect>
                </clipPath>
            </defs>
            <g clipPath="url(#__lottie_element_38)">
                <g transform="matrix(0.9999986290931702,0,0,0.9999986290931702,0.000244140625,0.000579833984375)" opacity="1">
                    <g opacity="1" transform="matrix(1,0,0,1,165.5489959716797,408.22698974609375)">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fillOpacity="0"
                            stroke="rgb(255,3,3)"
                            strokeOpacity="1"
                            strokeWidth="13"
                            d="M-22.608999252319336,-10.553000450134277 C-22.608999252319336,-10.553000450134277 10.477999687194824,25.02899932861328 10.477999687194824,25.02899932861328 C14.522000312805176,8.343000411987305 18.565000534057617,-8.343000411987305 22.608999252319336,-25.02899932861328"
                            style={{
                                animation: 'arrowHeadAppear 3s ease-in-out infinite'
                            }}
                        />
                    </g>
                </g>
                <g transform="matrix(1,0,0,1,0,0)" opacity="1">
                    <g opacity="1" transform="matrix(1,0,0,1,249.40199279785156,242.52999877929688)">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fillOpacity="0"
                            stroke="rgb(255,3,3)"
                            strokeOpacity="1"
                            strokeWidth="13"
                            d="M160.60000610351562,-173.0290069580078 C-76.98200225830078,-178.9709930419922 -158.76100158691406,-174.7209930419922 -159.39999389648438,-165.91799926757812 C-160.60000610351562,-149.406005859375 123.46099853515625,-113.99199676513672 121.48899841308594,-87.69499969482422 C120.177001953125,-70.2040023803711 -5.004000186920166,-92.18800354003906 -63.400001525878906,-23.695999145507812 C-107.53600311279297,28.070999145507812 -96.47000122070312,111.5250015258789 -77.62300109863281,178.97000122070312"
                            style={{
                                animation: 'drawArrowPath 3s ease-in-out infinite'
                            }}
                        />
                    </g>
                </g>
            </g>
        </svg>

        <style jsx>{`
            @keyframes drawArrowPath {
                0% {
                    stroke-dasharray: 0 1000;
                    stroke-dashoffset: 0;
                }
                50% {
                    stroke-dasharray: 1000 1000;
                    stroke-dashoffset: 0;
                }
                100% {
                    stroke-dasharray: 0 1000;
                    stroke-dashoffset: -1000;
                }
            }

            @keyframes arrowHeadAppear {
                0% {
                    opacity: 0;
                }
                70% {
                    opacity: 0;
                }
                75% {
                    opacity: 1;
                }
                100% {
                    opacity: 1;
                }
            }
        `}</style>
    </div>
)


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
                    <div className="inline-block  backdrop-blur-2xl bg-white/35 border-2 border-white/50 rounded-2xl px-8 py-6 w-full shadow-xl mb-8 ring-1 ring-white/30 md:max-w-2xl">
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

                            <h3 className={`text-xl md:text-4xl lg:text-3xl font-bold  bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent leading-tight max-w-4xl mx-auto  ${shadowsIntoLight.className}`}>
                                In Just 90 Minutes, Install the AI Framework That Cuts Costs, Saves Time & Puts Your Business on Autopilot.
                            </h3>
                            <div>
                                <p className={`${outfit.className} text-base md:text-2xl font- -800 max-w-2xl mx-auto leading-`}>
                                    This is the AI growth blueprint smart MSMEs are secretly using to 2X–5X profits (and you’ve never been told…)
                                </p>
                            </div>
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
                            <div className='flex justify-center '>
                                <div className="w-40  h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 rounded-full"></div>
                            </div>
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
                                            <ProblemPoint
                                                text="Constant WhatsApp chasing for updates"
                                                description="Endless follow-ups eating your time"
                                            />
                                            <ProblemPoint
                                                text="Every decision bottlenecks through you"
                                                description="Team can't move without your approval"
                                            />
                                            <ProblemPoint
                                                text="Tasks fall through the cracks daily"
                                                description="No system to track completion"
                                            />
                                            <ProblemPoint
                                                text="No clear accountability structure"
                                                description="Blame games when things go wrong"
                                            />
                                            <ProblemPoint
                                                text="Team operates in reactive mode"
                                                description="Always firefighting, never planning"
                                            />
                                            <ProblemPoint
                                                text="Growth feels impossible to manage"
                                                description="More clients = more chaos"
                                            />
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
                        <div className=" my-4 ">
                            <div className='md:grid grid-cols-3 mb-12 hidden '>
                                <div className='relative mb-16'>
                                    <AnimatedArrow className='scale-125 ml-56 mt-6 absolute' />
                                </div>
                                <div className='relative'>
                                    <AnimatedArrow className='scale-125 ml-36 mt-6 absolute rotate-[360deg]' />
                                </div>
                                <div className='relative'>
                                    <AnimatedArrow className='scale-125  ml-24 mt-6 absolute' />
                                </div>
                            </div>
                        </div>

                        {/* Transformation Promise */}
                        <div className="text-center mt-12 max-w-3xl mx-auto">
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
                            This isn't just another masterclass.
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


// ... existing code ...

function ProblemPoint({ text, description }: { text: string; description: string }) {
    return (
        <div className="flex items-start gap-4 p-4 backdrop-blur-lg bg-red-100/40 border border-red-200/60 rounded-xl shadow-sm">
            <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-bold">×</span>
            </div>
            <div>
                <h4 className="text-gray-800 font-bold text-sm mb-1">{text}</h4>
                <p className="text-gray-600 text-xs leading-relaxed">{description}</p>
            </div>
        </div>
    )
}

// ... existing code ...

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
