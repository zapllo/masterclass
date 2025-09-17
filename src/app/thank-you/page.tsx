'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Copy, CheckCircle, Calendar, Clock, MapPin, Users, ExternalLink } from 'lucide-react'

interface ContentData {
  eventDate: string
  eventTime: string
  eventLocation: string
  eventLanguage: string
  thankYouPage: {
    videoUrl: string
    videoPoster: string
    whatsappGroupLink: string
  }
}

function ThankYouContent() {
  const searchParams = useSearchParams()
  const leadId = searchParams.get('leadId')
  const [copied, setCopied] = useState(false)
  const [content, setContent] = useState<ContentData>({
    eventDate: '29th – 31st Aug',
    eventTime: '7 PM – 9 PM',
    eventLocation: 'Zoom',
    eventLanguage: 'English',
    thankYouPage: {
      videoUrl: 'https://lp.launchatscale.com/wp-content/uploads/2025/06/C3926-YT.mp4',
      videoPoster: 'https://lp.launchatscale.com/wp-content/uploads/2024/05/Shubh-Jain-thum1-1-1.avif',
      whatsappGroupLink: 'https://chat.whatsapp.com/BCgURzYeQZb1PB96uKvxjd?mode=ems_copy_t'
    }
  })

  useEffect(() => {
    const fetchContent = async () => {
      try {
        console.log('🔍 Fetching content for thank you page...')
        const response = await fetch('/api/content')
        if (response.ok) {
          const data = await response.json()
          console.log('✅ Content fetched successfully:', data)

          setContent({
            eventDate: data.eventDate || '29th – 31st Aug',
            eventTime: data.eventTime || '7 PM – 9 PM',
            eventLocation: data.eventLocation || 'Zoom',
            eventLanguage: data.eventLanguage || 'English',
            thankYouPage: {
              videoUrl: data.thankYouPage?.videoUrl || data.heroVideoUrl || 'https://lp.launchatscale.com/wp-content/uploads/2025/06/C3926-YT.mp4',
              videoPoster: data.thankYouPage?.videoPoster || data.heroVideoPoster || 'https://lp.launchatscale.com/wp-content/uploads/2024/05/Shubh-Jain-thum1-1-1.avif',
              whatsappGroupLink: data.thankYouPage?.whatsappGroupLink || data.whatsappTemplate?.variable2 || 'https://chat.whatsapp.com/BCgURzYeQZb1PB96uKvxjd?mode=ems_copy_t'
            }
          })
        }
      } catch (error) {
        console.error('❌ Error fetching content:', error)
      }
    }

    fetchContent()
  }, [])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content.thankYouPage.whatsappGroupLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const openWhatsAppLink = () => {
    window.open(content.thankYouPage.whatsappGroupLink, '_blank')
  }

  const sessionDetails = [
    { label: 'DATE', value: content.eventDate, icon: Calendar },
    { label: 'TIME', value: content.eventTime, icon: Clock },
    { label: 'LOCATION', value: content.eventLocation, icon: MapPin },
    { label: 'LANGUAGE', value: content.eventLanguage, icon: Users },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500 rounded-full mb-6 shadow-lg">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🎉 Registration Successful!
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            Welcome to the exclusive masterclass! Your spot has been secured.
          </p>

          {leadId && (
            <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
              Registration ID: {leadId.slice(-8).toUpperCase()}
            </div>
          )}
        </div>

        {/* Event Details */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            📅 Event Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sessionDetails.map((detail, index) => {
              const IconComponent = detail.icon
              return (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 rounded-xl mb-3">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm font-medium text-gray-500 uppercase mb-1">
                    {detail.label}
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {detail.value}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Share Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            🚀 Join Our Exclusive Inner WhatsApp Community
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Connect with like-minded entrepreneurs and get exclusive updates about the masterclass!
          </p>

          <div className="space-y-4">
            {/* WhatsApp Link Display */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <input
                type="text"
                value={content.thankYouPage.whatsappGroupLink}
                readOnly
                className="flex-1 bg-transparent border-none outline-none text-gray-700 text-sm"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={openWhatsAppLink}
                className="flex-1 inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-[1.02]"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Join WhatsApp Community</span>
              </button>

              <button
                onClick={copyToClipboard}
                className={`flex-1 inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-bold transition-all duration-200 transform hover:scale-[1.02] ${
                  copied
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                }`}
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>

            {/* Additional Info */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">💡</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-green-800 mb-1">
                    Why Join Our Community?
                  </h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Get exclusive pre-masterclass tips and resources</li>
                    <li>• Network with fellow entrepreneurs</li>
                    <li>• Receive important event updates and reminders</li>
                    <li>• Access to bonus content and materials</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Video */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            🎬 Get a Preview of What's Coming
          </h2>

          <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
            <video
              src={content.thankYouPage.videoUrl}
              poster={content.thankYouPage.videoPoster}
              controls
              className="w-full h-full object-cover"
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="mt-6 text-center">
            <div className="inline-block bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-blue-800 font-medium mb-2">
                📧 Check your email for the calendar invite & Zoom link
              </p>
              <p className="text-blue-600 text-sm">
                Make sure to add the event to your calendar so you don't miss out!
              </p>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => window.location.href = '/'}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-8 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02]"
          >
            <span>← Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  )
}
