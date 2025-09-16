'use client'

import { useState, useEffect } from 'react'
import { Clock, DollarSign, TrendingDown, TrendingUp, Zap, Users, Target, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { Unbounded } from 'next/font/google'

const shadowsIntoLight = Unbounded({
  weight: '600',
  subsets: ['latin']
})

export default function AITransformationSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="py-16 md:py-24 mx-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-red-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        {/* Shocking Fact Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 backdrop-blur-xl bg-gradient-to-r from-red-500/10 to-orange-500/10 border-2 border-red-200/50 rounded-full px-6 py-3 shadow-lg mb-6">
            <span className="text-2xl">⚠️</span>
            <span className="text-red-600 font-bold text-sm md:text-base uppercase tracking-wide">Shocking Fact Every MSME Owner Must Know</span>
          </div>

          <h1 className={`text-2xl mt-2 md:mt-0 md:text-5xl lg:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-orange-500 bg-clip-text text-transparent leading-tight tracking-tight ${shadowsIntoLight.className}`}>
            <span className="text-red-600">💡 90%</span> of MSMEs Are Still{' '}
            <br className='md:block hidden' />
            <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Running Manually</span>
          </h1>

          <p className="text-lg mt-2 md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            And it's silently costing them <span className="text-red-600 font-bold">time, money & growth</span> every single day.
          </p>

          {/* Decorative separator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-24 h-0.5 bg-gradient-to-r from-gray-400 to-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-12 h-0.5 bg-gradient-to-r from-gray-400 to-transparent rounded-full"></div>
          </div>
        </div>
        {/* Hidden Cost Section */}
        <div className="mb-20">
          <div className="relative backdrop-blur-3xl bg-gradient-to-br from-white/10 via-red-50/20 to-orange-50/10 border border-white/30 rounded-3xl p-8 md:p-12 shadow-2xl ring-1 ring-white/20 max-w-5xl mx-auto overflow-hidden">
            {/* Glass overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10 rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-red-100/20 via-transparent to-orange-100/20 rounded-3xl"></div>

            {/* Subtle geometric patterns for glass texture */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5">
              <div className="absolute top-4 left-4 w-32 h-32 bg-white rounded-full blur-xl"></div>
              <div className="absolute top-1/2 right-8 w-24 h-24 bg-white rounded-full blur-lg"></div>
              <div className="absolute bottom-8 left-1/3 w-20 h-20 bg-white rounded-full blur-md"></div>
            </div>

            <div className="relative z-10">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 backdrop-blur-2xl bg-gradient-to-r from-red-500/30 to-orange-500/30 border border-white/40 rounded-full px-4 py-2 shadow-xl mb-4 ring-1 ring-white/30">
                  <TrendingDown className="h-5 w-5 text-red-700" />
                  <span className="text-red-800 font-bold text-sm">THE HIDDEN COST</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 drop-shadow-sm">
                  📉 The Hidden Cost of Doing Business the Old Way
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <GlassCostCard
                  icon={<Clock className="h-8 w-8" />}
                  title="3–5 Hours Wasted Daily"
                  description="Repetitive tasks, follow-ups & manual reports eating your productive time"
                  color="from-red-500 to-orange-500"
                />
                <GlassCostCard
                  icon={<DollarSign className="h-8 w-8" />}
                  title="₹15,000–₹20,000 Lost Weekly"
                  description="At just ₹1,000/hour, manual operations are burning your profits"
                  color="from-orange-500 to-red-500"
                />
                <GlassCostCard
                  icon={<TrendingDown className="h-8 w-8" />}
                  title="Stunted Growth"
                  description="Not because your business is weak — but because you haven't leveraged AI yet"
                  color="from-red-600 to-red-500"
                />
              </div>
            </div>

            {/* Additional glass reflection effect */}
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-white/20 to-transparent rounded-tl-3xl"></div>
          </div>
        </div>

        {/* Before vs After Comparison */}
        <div className="md:mb-20">
          <div className="text-center ">
            <div className='flex justify-center items-center gap-2'>
              <h1 className={`text-4xl md:text-5xl hidden md:block lg:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-orange-500 bg-clip-text text-transparent leading-tight tracking-tight ${shadowsIntoLight.className}`}>
                AI Business Launchpad
              </h1>
              <img src='/rocket.png' className='h-20 hidden md:block' />
            </div>
            <div className='flex justify-center '>
              <div className="w-40  h-1 bg-gradient-to-r from-blue-500 hidden md:block via-purple-500 to-orange-500 rounded-full"></div>
            </div>
          </div>

          {/* Desktop Node Layout */}
          <div className="hidden -mt-12 lg:block">
            <div className="relative max-w-7xl mx-auto min-h-[700px] flex items-center justify-center">
              {/* Central AI Capsule */}
              <div className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-1000 delay-500 ${isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
                <CentralAICapsule />
              </div>

              {/* Old Way Nodes - Left Side with proper spacing */}
              <div className="absolute z-[100] left-0 top-1/2 transform -translate-y-1/2 w-[450px]">
                <OldWayNode
                  text="Delayed orders & projects"
                  impact="Lost revenue daily"
                  position={{ top: '-210px', left: '20px' }}
                  connectionPoint={{ x: '85%', y: '50%' }}
                  delay={100}
                  nodeNumber={1}
                  isVisible={isVisible}
                />
                <OldWayNode
                  text="Constant follow-ups & blame games"
                  impact="Team demotivation"
                  position={{ top: '-88px', left: '0px' }}
                  connectionPoint={{ x: '100%', y: '50%' }}
                  delay={200}
                  nodeNumber={2}
                  isVisible={isVisible}
                />
                <OldWayNode
                  text="Lost sales & frustrated customers"
                  impact="Damaged reputation"
                  position={{ top: '50px', left: '0px' }}
                  connectionPoint={{ x: '100%', y: '50%' }}
                  delay={300}
                  nodeNumber={3}
                  isVisible={isVisible}
                />
                <OldWayNode
                  text="No accountability & endless stress"
                  impact="Burnout culture"
                  position={{ top: '180px', left: '20px' }}
                  connectionPoint={{ x: '85%', y: '50%' }}
                  delay={400}
                  nodeNumber={4}
                  isVisible={isVisible}
                />
              </div>

              {/* New Way Nodes - Right Side with proper spacing */}
              <div className="absolute z-[100] right-0 top-1/2 transform -translate-y-1/2 w-[450px]">
                <NewWayNode
                  text="Faster execution & error-free systems"
                  benefit="100% accuracy guaranteed"
                  position={{ top: '-230px', right: '20px' }}
                  connectionPoint={{ x: '15%', y: '50%' }}
                  delay={600}
                  nodeNumber={5}
                  isVisible={isVisible}
                />
                <NewWayNode
                  text="24/7 invisible AI workforce working"
                  benefit="Never sleeps, never stops"
                  position={{ top: '-90px', right: '0px' }}
                  connectionPoint={{ x: '0%', y: '50%' }}
                  delay={700}
                  nodeNumber={6}
                  isVisible={isVisible}
                />
                <NewWayNode
                  text="More profits with less effort"
                  benefit="Automated profit generation"
                  position={{ top: '40px', right: '0px' }}
                  connectionPoint={{ x: '0%', y: '50%' }}
                  delay={800}
                  nodeNumber={7}
                  isVisible={isVisible}
                />
                <NewWayNode
                  text="Focus on scaling, not firefighting"
                  benefit="Strategic growth mindset"
                  position={{ top: '160px', right: '20px' }}
                  connectionPoint={{ x: '15%', y: '50%' }}
                  delay={900}
                  nodeNumber={8}
                  isVisible={isVisible}
                />
              </div>

              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
                {/* Left side connections - to actual connection points */}
                <ConnectionLine
                  start={{ x: '50%', y: '50%' }}
                  end={{ x: '27%', y: '24%' }}
                  color="#ef4444"
                  delay={100}
                  isVisible={isVisible}
                />
                <ConnectionLine
                  start={{ x: '50%', y: '50%' }}
                  end={{ x: '22%', y: '42%' }}
                  color="#ef4444"
                  delay={200}
                  isVisible={isVisible}
                />
                <ConnectionLine
                  start={{ x: '50%', y: '50%' }}
                  end={{ x: '22%', y: '66%' }}
                  color="#ef4444"
                  delay={300}
                  isVisible={isVisible}
                />
                <ConnectionLine
                  start={{ x: '50%', y: '50%' }}
                  end={{ x: '27%', y: '84%' }}
                  color="#ef4444"
                  delay={400}
                  isVisible={isVisible}
                />

                {/* Right side connections - to actual connection points */}
                <ConnectionLine
                  start={{ x: '50%', y: '50%' }}
                  end={{ x: '73%', y: '24%' }}
                  color="#22c55e"
                  delay={600}
                  isVisible={isVisible}
                />
                <ConnectionLine
                  start={{ x: '50%', y: '50%' }}
                  end={{ x: '78%', y: '42%' }}
                  color="#22c55e"
                  delay={700}
                  isVisible={isVisible}
                />
                <ConnectionLine
                  start={{ x: '50%', y: '50%' }}
                  end={{ x: '78%', y: '65%' }}
                  color="#22c55e"
                  delay={800}
                  isVisible={isVisible}
                />
                <ConnectionLine
                  start={{ x: '50%', y: '50%' }}
                  end={{ x: '73%', y: '82%' }}
                  color="#22c55e"
                  delay={900}
                  isVisible={isVisible}
                />
              </svg>
            </div>
          </div>

          {/* Mobile Layout - Keep existing mobile layout */}
          <div className="lg:hidden space-y-8">
            {/* Existing mobile layout code... */}
          </div>
        </div>



        {/* Final CTA */}
        <div className="text-center">
          <div className="backdrop-blur-2xl bg-gradient-to-r from-blue-50/60 to-purple-50/60 border-2 border-blue-200/50 rounded-3xl p-10 shadow-xl ring-1 ring-blue-100/30 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full text-sm font-bold mb-6">
              <span className="text-lg">👉</span>
              URGENT WARNING
            </div>

            <h3 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
              Every day you delay AI, <span className="text-red-600">you're burning money.</span>
            </h3>

            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              Zapllo helps MSMEs cut costs, save 3–5 hours daily & scale with
              <span className="text-blue-600 font-bold"> AI-powered Co-Managers + AI Agents.</span>
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-500" />
                <span>Cut Operational Costs</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-500" />
                <span>Save 3-5 Hours Daily</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-500" />
                <span>Scale with AI Agents</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Custom Components */
function CostCard({ icon, title, description, color }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="backdrop-blur-lg bg-white/40 border border-red-200/60 rounded-2xl p-6 text-center hover:bg-white/50 transition-all duration-300">
      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${color} rounded-2xl text-white mb-4 shadow-lg`}>
        {icon}
      </div>
      <h3 className="font-bold text-gray-800 text-lg mb-3">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function OldWayPoint({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 p-4 backdrop-blur-lg bg-red-100/50 border border-red-200/60 rounded-xl">
      <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-sm">
        <span className="text-white text-sm font-bold">×</span>
      </div>
      <p className="text-gray-700 font-medium">{text}</p>
    </div>
  )
}

function NewWayPoint({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 p-4 backdrop-blur-lg bg-green-100/50 border border-green-200/60 rounded-xl">
      <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
        <span className="text-white text-sm">✓</span>
      </div>
      <p className="text-gray-700 font-medium">{text}</p>
    </div>
  )
}

function TransformationArrow() {
  return (
    <div className="flex flex-col items-center">
      {/* AI Capsule Image Placeholder */}
      <div className="relative mb-4">
        <div className="w-24 h-24 md:w-32 md:h-32  bg-transparent rounded-full flex items-center justify-center animate-">
          {/* Replace this div with your actual capsule image */}
          <Image
            src="/ai.png"
            alt="AI Army Capsule"
            width={200}
            height={200}
            className="rounded-full h- bg-transparent scale-[280%]"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 backdrop-blur-xl mt-4 bg-white/60 border border-white/80 rounded-full px-4 py-2 shadow-lg">
        <span className="text-gray-700 font-bold text-lg">TRANSFORM</span>
        <ArrowRight className="h-4 w-4 text-gray-700 animate-pulse" />
      </div>
    </div>
  )
}



// ... existing code ...

/* New Node Components */
function CentralAICapsule() {
  return (
    <div className="relative">
      {/* Pulsing Rings */}
      <div className="absolute inset-0 rounded-full">
        <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping"></div>
        <div className="absolute inset-2 rounded-full bg-purple-500/20 animate-ping animation-delay-1000"></div>
        <div className="absolute inset-4 rounded-full bg-cyan-500/20 animate-ping animation-delay-2000"></div>
      </div>

      {/* Main Capsule */}
      <div className="relative w-40 h-40 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/50">
        <Image
          src="/ai.png"
          alt="AI Army Capsule"
          width={160}
          height={160}
          className="rounded-full bg-transparent scale-[280%]"
        />
      </div>

      {/* Transform Label */}
      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
        <div className="inline-flex items-center gap-2 backdrop-blur-xl bg-gradient-to-r from-blue-500/90 to-purple-600/90 text-white px-4 py-2 rounded-xl shadow-xl border border-white/30">
          <Zap className="h-4 w-4" />
          <span className="font-bold text-sm">AI TRANSFORMATION</span>
        </div>
      </div>
    </div>
  )
}

function OldWayNode({ text, impact, position, delay, nodeNumber, isVisible }: {
  text: string;
  impact: string;
  position: { top?: string; left?: string; right?: string; bottom?: string };
  delay: number;
  nodeNumber: number;
  isVisible: boolean;
}) {
  return (
    <div
      className={`absolute z-[100] transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100 scale-100' : '-translate-x-10 opacity-0 scale-75'}`}
      style={{
        ...position,
        transitionDelay: `${delay}ms`
      }}
    >
      <div className="group relative">
        {/* Connection Node */}
        <div className="absolute -right-2 top-1/2 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg transform -translate-y-1/2 group-hover:scale-125 transition-transform"></div>

        {/* Content Card */}
        <div className="backdrop-blur-2xl z-[100] bg-gradient-to-br from-red-50/90 to-orange-50/90 border-2 border-red-200/60 rounded-2xl p-4 shadow-xl ring-1 ring-red-100/40 w-80 group-hover:scale-105 transition-all duration-300">
          {/* Node Number */}
          {/* <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-white">
            {nodeNumber}
          </div> */}

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-lg font-bold">×</span>
            </div>
            <div className="flex-1">
              <p className="text-gray-800 font-bold text-sm leading-tight mb-2">{text}</p>
              <p className="text-red-600 text-xs font-medium bg-red-100/50 px-2 py-1 rounded-lg">{impact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function NewWayNode({ text, benefit, position, delay, nodeNumber, isVisible }: {
  text: string;
  benefit: string;
  position: { top?: string; left?: string; right?: string; bottom?: string };
  delay: number;
  nodeNumber: number;
  isVisible: boolean;
}) {
  return (
    <div
      className={`absolute z-[100] transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-10 opacity-0 scale-75'}`}
      style={{
        ...position,
        transitionDelay: `${delay}ms`
      }}
    >
      <div className="group relative">
        {/* Connection Node */}
        <div className="absolute -left-2 top-1/2 w-4 h-4  bg-green-500 rounded-full border-2 border-white shadow-lg transform -translate-y-1/2 group-hover:scale-125 transition-transform"></div>

        {/* Content Card */}
        <div className="backdrop-blur-2xl z-[100] bg-gradient-to-br from-green-50/90 to-emerald-50/90 border-2 border-green-200/60 rounded-2xl p-4 shadow-xl ring-1 ring-green-100/40 w-80 group-hover:scale-105 transition-all duration-300">
          {/* Node Number */}
          {/* <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-white">
            {nodeNumber}
          </div> */}

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-lg">✓</span>
            </div>
            <div className="flex-1">
              <p className="text-gray-800 font-bold text-sm leading-tight mb-2">{text}</p>
              <p className="text-green-600 text-xs font-medium bg-green-100/50 px-2 py-1 rounded-lg">{benefit}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


function ConnectionLine({ start, end, color, delay, isVisible }: {
  start: { x: string; y: string };
  end: { x: string; y: string };
  color: string;
  delay: number;
  isVisible: boolean;
}) {
  return (
    <line
      x1={start.x}
      y1={start.y}
      x2={end.x}
      y2={end.y}
      stroke={color}
      strokeWidth="2"
      strokeDasharray="5,5"
      className={`transition-all z-[10] duration-1000 ${isVisible ? 'opacity-60' : 'opacity-0'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <animate
        attributeName="stroke-dashoffset"
        values="0;-10"
        dur="2s"
        repeatCount="indefinite"
      />
    </line>
  )
}



// ... existing code ...

        /* Enhanced Glassmorphic Cost Card */
        function GlassCostCard({icon, title, description, color}: {
          icon: React.ReactNode;
        title: string;
        description: string;
        color: string;
}) {
    return (
        <div className="group relative backdrop-blur-2xl bg-gradient-to-br from-white/20 via-white/10 to-white/5 border border-white/30 rounded-2xl p-6 text-center hover:bg-white/25 transition-all duration-500 shadow-xl ring-1 ring-white/20 overflow-hidden">
          {/* Glass overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/5 rounded-2xl group-hover:from-white/40 transition-all duration-500"></div>

          {/* Subtle light reflection */}
          <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-white/40 to-transparent rounded-tl-2xl"></div>

          {/* Content */}
          <div className="relative z-10">
            <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${color} rounded-2xl text-white mb-4 shadow-2xl backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300`}>
              {icon}
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-3 drop-shadow-sm">{title}</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
          </div>

          {/* Animated glass shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
        </div>
        )
}
