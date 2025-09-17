'use client'

import { Suspense, useEffect, useId, useMemo, useState } from 'react'
import EnrollButton from './enroll'
import { Calendar, CalendarOff, CalendarX, Clock, Globe, Languages, Phone } from 'lucide-react'
import { Outfit, Unbounded } from 'next/font/google'
import { useSearchParams } from 'next/navigation'
import HeaderAlert from './HeaderAlert'

interface ContentData {
    eventDate: string
    eventTime: string
    eventLocation: string
    eventLanguage: string
    heroVideoUrl: string
    heroVideoPoster: string
    dynamicHeadings: Array<{
        id: string
        key: string
        mainHeading: string
        subHeading: string
        description: string
        oldWay?: string
        newWay?: string
    }>
}


const shadowsIntoLight = Unbounded({
    weight: '600',
    subsets: ['latin']
})

const outfit = Outfit({
    weight: '400',
    subsets: ['latin']
})


function HeroSection() {
    const searchParams = useSearchParams()
    const headingParam = searchParams.get('heading') // This will get the heading parameter

    const [content, setContent] = useState<ContentData>({
        eventDate: '29th – 31st Aug',
        eventTime: '90 Minutes',
        eventLocation: 'Online',
        eventLanguage: 'English',
        heroVideoUrl: 'https://lp.launchatscale.com/wp-content/uploads/2025/06/C3926-YT.mp4',
        heroVideoPoster: '/thumbnail.jpg',
        dynamicHeadings: []
    })
    const [loading, setLoading] = useState(true)

    // Find the appropriate heading based on URL parameter
    const currentHeading = useMemo(() => {
        if (!headingParam || !content.dynamicHeadings.length) {
            return {
                mainHeading: 'Cut 30% of Your Operational Costs',
                subHeading: "with India's 1st AI Co-Manager for MSMEs",
                description: "Turn chaos into systems & boost your productivity",
                oldWay: "Hire more managers, chase your team, and drown in follow-ups.",
                newWay: "Plug in Zapllo, Your AI Co-Manager that saves time, cuts costs, reduces errors & scales your business smartly."
            }
        }

        const foundHeading = content.dynamicHeadings.find(h => h.key === headingParam)
        return foundHeading || {
            mainHeading: 'Cut 30% of Your Operational Costs',
            subHeading: "with India's 1st AI Co-Manager for MSMEs",
            description: "Turn chaos into systems & boost your productivity",
            oldWay: "Hire more managers, chase your team, and drown in follow-ups.",
            newWay: "Plug in Zapllo, Your AI Co-Manager that saves time, cuts costs, reduces errors & scales your business smartly."
        }
    }, [headingParam, content.dynamicHeadings])


    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch('/api/content')
                if (response.ok) {
                    const data = await response.json()
                    setContent({
                        eventDate: data.eventDate || '29th – 31st Aug',
                        eventTime: data.eventTime || '90 Minutes',
                        eventLocation: data.eventLocation || 'Online',
                        eventLanguage: data.eventLanguage || 'English',
                        heroVideoUrl: data.heroVideoUrl || 'https://lp.launchatscale.com/wp-content/uploads/2025/06/C3926-YT.mp4',
                        heroVideoPoster: data.heroVideoPoster || 'https://lp.launchatscale.com/wp-content/uploads/2024/05/Shubh-Jain-thum1-1-1.avif',
                        dynamicHeadings: data.dynamicHeadings || []
                    })
                }
            } catch (error) {
                console.error('Error fetching content:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchContent()
    }, [])


    const sessionDetails = [
        { label: 'DATE', value: content.eventDate, icon: Calendar },
        { label: 'DURATION', value: content.eventTime, icon: Clock },
        { label: 'DELIVERY', value: content.eventLocation, icon: Globe },
        { label: 'LANGUAGE', value: content.eventLanguage, icon: Languages },
    ]

    return (
        <div className="min-h-screen relative md:mx-6 overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">

            {/* Top ribbon */}
            <div className='w-full flex justify-center '>
                <div className="backdrop-blur-2xl bg-white/30 border-2 border-white/50 md:px-5 px-5 text-nowrap md:py-4 py-[9px] rounded-t-none rounded-b-xl max-w-full shadow-2xl ring-1 ring-black/5">
                    <h1 style={{ fontWeight: 600 }} className="text-gray-800 text-sm max-w-sm   gap-2 flex items-center lg:text-lg text-center drop-shadow-sm">
                        <img src={'/clock.png'} className='h-5 md:h-8' />
                        Give Me 90 Minutes & I&apos;ll Show You How To...
                    </h1>
                </div>
            </div>

            {/* Enhanced glassmorphism background pattern */}
            <div className="absolute inset-0 opacity-60">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/60 to-purple-500/60 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/50 to-pink-500/50 rounded-full blur-2xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-cyan-500/50 to-blue-500/50 rounded-full blur-2xl animate-pulse delay-2000"></div>
                <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-r from-emerald-400/40 to-teal-500/40 rounded-full blur-2xl animate-pulse delay-3000"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-10 ">
                {/* Main Title Section */}
                {/* Main Title Section */}
                <div className='flex justify-center mb-8'>
                    <div className="text-center space-y-6">
                        {/* <img src='https://www.zapllo.com/logo.png' className='h-16 mx-auto mb-4' /> */}
                        <div className='flex justify-center items-center gap-2'>
                            <h1 className={`text-3xl md:text-5xl lg:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-orange-500 bg-clip-text text-transparent leading-tight tracking-tight ${shadowsIntoLight.className}`}>
                                {currentHeading.mainHeading}<span className='text-white md:hidden'>🚀</span>
                            </h1>
                            <img src='/rocket.png' className='md:h-20 hidden md:block' />
                        </div>

                        <h2 className={`text-xl md:text-3xl lg:text-4xl font-bold text-gray-800 ${outfit.className} leading-tight`}>
                            {currentHeading.subHeading}
                        </h2>

                        <div className="flex items-center justify-center gap-2 ">


                            <div className="w-40 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 rounded-full"></div>

                        </div>
                        {/* Sub Headline */}
                        <div className="space-y-4 max-w- mb-4 mx-auto">
                            <div className="">
                                <p className="text-base md:text-lg text-gray-700 font-medium">
                                    <span className="font- text--600">❌ Old Way:</span> {currentHeading.oldWay || "Hire more managers, chase your team, and drown in follow-ups."}
                                </p>
                            </div>

                            <div className="">
                                <p className="text-base md:text-lg text-gray-700 font-medium">
                                    <span className="font- text--600">✅ New Way:</span> {currentHeading.newWay || "Plug in Zapllo, Your AI Co-Manager that saves time, cuts costs, reduces errors & scales your business smartly."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center mt-4'>
                    <div className="grid grid-cols-2 md:grid-cols-3 mb-4 gap-4">
                        <BenefitCard text="Stop Being the Chief Follow-Up Officer" />
                        <BenefitCard text="Turn Chaos into Systems & Accountability" />
                        <div className='hidden md:block '>
                            <BenefitCard text="Save 3–5 Hours Every Single Day from Now" />
                        </div>

                    </div>

                </div>
                <div className='flex justify-center md:hidden block'>
                    <div className=''></div>
                    <BenefitCard text="Save 3–5 Hours Every Single Day from Now" />
                </div>
                {/* Header Alert */}
                <HeaderAlert />

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 -mt-20 items-center">
                    {/* Right Content */}
                    <div className="space-y-8">
                        {/* Video Glassmorphism Container */}
                        <div className="backdrop-blur-2xl bg-white/35 border-2 border-white/60 rounded-3xl p-6 shadow-2xl ring-1 ring-black/5">
                            <div className="relative overflow-hidden rounded-2xl">
                                <video
                                    className="w-full h-64 lg:h-80 object-cover"
                                    src={content.heroVideoUrl}
                                    poster={content.heroVideoPoster}
                                    preload="metadata"
                                    controls
                                    controlsList="nodownload"
                                />
                            </div>
                        </div>

                        {/* Session Info Cards */}
                        <div className="grid grid-cols-2 gap-4">
                            {sessionDetails.map((detail, index) => {
                                const IconComponent = detail.icon
                                return (
                                    <div key={index} className="backdrop-blur-xl bg-white/40 border-2 border-white/60 rounded-2xl p-4 shadow-xl flex gap-2 ring-1 ring-black/5">
                                        <div className="text-center items-center gap-2 flex">
                                            <div className="flex gap-2 items-center justify-center mb-3">
                                                <div className="w-11 h-11 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                                                    <IconComponent className="w-4 h-4 text-white" />
                                                </div>
                                            </div>
                                            <div className='text-start  -mt-2'>
                                                <div className="text-[10px] md:text-sm font-medium text-gray-500 uppercase tracking- mb-2">{detail.label}</div>
                                                <div className="text-sm md:text-lg -mt-2 font-bold text-gray-800">{detail.value}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>


                        {/* Reality Check Section */}

                    </div>
                    {/* Left Content */}
                    <div className="text-center  relative md:mt-32 lg:text-left ">

                        <div className="absolute left-1/2 -top z-[100] -translate-x-1/2 -translate-y-1/2">
                            <img
                                src="/live.svg"
                                alt="live"
                                className="object-cover w-auto md:h-12   scale-150"
                            />
                        </div>


                        <div className="relative   backdrop-blur-3xl  bg-gradient-to-br from-white/35 to-white/15 border-2 border-white/50 rounded-3xl p-8 shadow-2xl ring-1 ring-white/30 hover:shadow-3xl transition-all duration-500 overflow-hidden">
                            {/* LIVE badge */}

                            {/* Background decorative elements */}
                            <div className="absolute  inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-orange-500/5 animate-pulse"></div>
                            <div
                                className="pointer-events-none absolute bottom-[-8px] right-[-8px] md:h-[80px] h-[120px] md:w-[80px] w-[120px] opacity-[.18]"
                                style={{
                                    background:
                                        "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 120 120%22><path d=%22M86 94 96 120 70 110 56 120 50 98 24 106 36 82 16 72 40 66 34 44 56 56 64 34 74 58 96 48 86 72 108 78 86 86Z%22 fill=%22%2394A3FF%22/></svg>') center/contain no-repeat",
                                }}
                            />

                            <div className="relative z-[1] " >
                                {/* Title */}
                                <h3 className="mb-2 mt-[5px] text-center text-[24px] font-extrabold tracking-[-0.2px] text-[#2a2a2a]">
                                    Implementation Agenda:
                                </h3>
                                {/* Decorative line */}
                                <div className="flex items-center justify-center gap-2 mb-6">


                                    <div className="w-40 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 rounded-full"></div>

                                </div>

                                {/* Decorative line */}
                                {/* <span className="block h-[8px] sm:h-[10px] w-[180px] sm:w-[210px] mx-auto -mt-1 mb-6 bg-[url('https://lp.launchatscale.com/wp-content/uploads/2024/05/line.svg')] bg-contain bg-center bg-no-repeat" /> */}

                                {/* Implementation points */}
                                <ul className="mt-6 text-[13px] sm:text-[15px] leading-[1.55] text-[#273352] space-y-6">
                                    <li className="flex gap-3 sm:gap-4">
                                        <span className="mt-[2px] inline-block shrink-0">
                                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                                                <span className="text-white text-xs sm:text-sm font-bold">✓</span>
                                            </div>
                                        </span>
                                        <span className="text-base text-start md:text-lg font-medium">
                                            <strong>Turn Your Business Into an Autopilot Machine</strong><br />
                                            <span className="text-gray-600">Eliminate daily follow-ups & chaos with AI systems that run your business 24/7.</span>
                                        </span>
                                    </li>

                                    {/* Separator */}
                                    <div className="h-px bg-white/40 mx-4"></div>

                                    <li className="flex gap-3 sm:gap-4">
                                        <span className="mt-[2px] inline-block shrink-0">
                                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                                                <span className="text-white text-xs sm:text-sm font-bold">✓</span>
                                            </div>
                                        </span>
                                        <span className="text-base md:text-lg text-start font-medium">
                                            <strong>Save 3–5 Hours Every Day & Reinvest Into Growth</strong><br />
                                            <span className="text-gray-600">Free yourself from micro-management so you focus on scaling profits.</span>
                                        </span>
                                    </li>

                                    {/* Separator */}
                                    <div className="h-px bg-white/40 mx-4"></div>

                                    <li className="flex gap-3 sm:gap-4 mb-8">
                                        <span className="mt-[2px] inline-block shrink-0">
                                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                                                <span className="text-white text-xs sm:text-sm font-bold">✓</span>
                                            </div>
                                        </span>
                                        <span className="text-base md:text-lg text-start font-medium">
                                            <strong>2X–5X Your Sales with WhatsApp AI & Automation</strong><br />
                                            <span className="text-gray-600">Close more deals without chasing leads or endless sales calls.</span>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* <div className="space-y-6">
                            <h1 className="text-4xl md:text-5xl xl:text-7xl font-extrabold leading-tight text-gray-800">
                                Stop Chasing Teams.
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                                    Start Leading Business.
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-gray-600 font-medium">
                                Build a <span className="text-blue-600 font-bold">10x ROI system</span> in 90 minutes.
                            </p>
                        </div> */}

                        {/* Key Benefits */}
                        <div className="space-y">

                        </div>

                        {/* Pricing Glassmorphism Card */}
                        <div className="flex justify-center mt-8 md:mt-4 p-3">

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
        </div>
    )
}

/* ============== Custom Components ============== */

function BenefitCard({ text }: { text: string }) {
    return (
        <div className="backdrop-blur-xl w-fit text-xl bg-white/30 border-2 border-white/50 rounded-2xl p-4 shadow-xl hover:bg-white/40 hover:border-white/60 transition-all duration-300 ring-1 ring-black/5">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mt-0.5 shadow-lg">
                    <span className="text-white text-sm font-bold">✓</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed font-medium">{text}</p>
            </div>
        </div>
    )
}

function FrustrationPoint({ text }: { text: string }) {
    return (
        <div className="flex items-start gap-4 p-4 rounded-xl backdrop-blur-lg bg-red-50/60 border-2 border-red-200/60 hover:bg-red-50/80 transition-colors duration-300 shadow-md">
            <div className="flex-shrink-0 w-6 h-6 bg-red-100/80 border-2 border-red-200/60 rounded-full flex items-center justify-center mt-0.5 shadow-sm">
                <span className="text-red-600 text-sm font-bold">×</span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
        </div>
    )
}


// ... existing code ...

function ImplementationPoint({ title, description }: { title: string; description: string }) {
    return (
        <div className="flex items-start gap-4 p-4 rounded-xl backdrop-blur-lg bg-green-50/60 border-2 border-green-200/60 hover:bg-green-50/80 transition-colors duration-300 shadow-md">
            <div className="flex-shrink-0 w-6 h-6 bg-green-100/80 border-2 border-green-200/60 rounded-full flex items-center justify-center mt-0.5 shadow-sm">
                <span className="text-green-600 text-sm font-bold">✓</span>
            </div>
            <div className="space-y-2">
                <h4 className="text-gray-800 font-semibold text-base leading-relaxed">{title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            </div>
        </div>
    )
}


export default function HeroSectionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    }>
      <HeroSection />
    </Suspense>
  )
}
