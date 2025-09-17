'use client'

import { useState, useEffect } from 'react'
import { IContent, ITestimonial, ITrackingScript, IDynamicHeading, IBonus } from '@/lib/models/Content'
import {
  Save,
  LogOut,
  Loader2,
  Plus,
  Trash2,
  Eye,
  Calendar,
  Clock,
  MapPin,
  Globe,
  Video,
  DollarSign,
  Users,
  AlertCircle,
  CheckCircle,
  IndianRupee,
  Code,
  ToggleLeft,
  Lightbulb,
  MessageCircle
} from 'lucide-react'
import { ILead } from '@/lib/models/Lead'

interface LoginForm {
  email: string
  password: string
}

interface AdminUser {
  id: string
  email: string
  name: string
}

// Update the Google Analytics script in defaultTrackingScripts
const defaultTrackingScripts: ITrackingScript[] = [
  {
    id: '1',
    name: 'Meta Pixel',
    script: `<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1106571651572381');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=1106571651572381&ev=PageView&noscript=1"
/></noscript>`,
    enabled: true
  },
  {
    id: '2',
    name: 'Google Analytics',
    script: `<script async src="https://www.googletagmanager.com/gtag/js?id=AW-670210434"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-670210434');
</script>`,
    enabled: true
  },
  {
    id: '3',
    name: 'Microsoft Clarity',
    script: `<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "t2vg0a9heb");
</script>`,
    enabled: true
  }
]

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [loginForm, setLoginForm] = useState<LoginForm>({ email: '', password: '' })
  const [content, setContent] = useState<IContent | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [saving, setSaving] = useState<boolean>(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  // Update the activeTab type
  const [activeTab, setActiveTab] = useState<'pricing' | 'event' | 'videos' | 'testimonials' | 'bonuses' | 'whatsapp' | 'thankyou' | 'leads' | 'tracking' | 'dynamic-headings'>('pricing')

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      setIsLoggedIn(true)
      fetchContent()
    } else {
      setLoading(false)
    }
  }, [])

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      })

      if (response.ok) {
        const data: { token: string; admin: AdminUser } = await response.json()
        localStorage.setItem('adminToken', data.token)
        setIsLoggedIn(true)
        fetchContent()
        showNotification('success', 'Login successful!')
      } else {
        const errorData = await response.json()
        showNotification('error', errorData.error || 'Invalid credentials')
      }
    } catch (error) {
      console.error('Login error:', error)
      showNotification('error', 'Login failed')
    }
  }

  // Add leads state
  const [leads, setLeads] = useState<ILead[]>([])
  const [loadingLeads, setLoadingLeads] = useState(false)

  // Add fetchLeads function
  const fetchLeads = async () => {
    setLoadingLeads(true)
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('/api/leads', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setLeads(data)
      }
    } catch (error) {
      console.error('Error fetching leads:', error)
    } finally {
      setLoadingLeads(false)
    }
  }

  // Fetch leads when leads tab is active
  useEffect(() => {
    if (activeTab === 'leads') {
      fetchLeads()
    }
  }, [activeTab])


  const updateBonus = <K extends keyof IBonus>(index: number, field: K, value: IBonus[K]) => {
    if (!content) return
    const newBonuses = [...content.bonuses]
    newBonuses[index] = { ...newBonuses[index], [field]: value }
    setContent({ ...content, bonuses: newBonuses })
  }

  const addBonus = () => {
    if (!content) return
    const newBonus: IBonus = {
      id: Date.now().toString(),
      title: '',
      description: '',
      value: '',
      image: '',
      icon: '🎁'
    }
    setContent({ ...content, bonuses: [...content.bonuses, newBonus] })
  }

  const removeBonus = (index: number) => {
    if (!content) return
    const newBonuses = content.bonuses.filter((_, i) => i !== index)
    setContent({ ...content, bonuses: newBonuses })
  }

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content')
      if (response.ok) {
        const data: IContent = await response.json()

        // Ensure trackingScripts exists, if not, add default scripts
        if (!data.trackingScripts || data.trackingScripts.length === 0) {
          console.log('🔧 No tracking scripts found, initializing with defaults...')
          data.trackingScripts = defaultTrackingScripts

          // Optionally save the defaults to the database immediately
          const token = localStorage.getItem('adminToken')
          if (token) {
            try {
              await fetch('/api/content', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
              })
              console.log('✅ Default tracking scripts saved to database')
            } catch (saveError) {
              console.warn('⚠️ Could not save default scripts to database:', saveError)
            }
          }
        }

        setContent(data)
      }
    } catch (error) {
      console.error('Fetch content error:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateTrackingScript = <K extends keyof ITrackingScript>(index: number, field: K, value: ITrackingScript[K]) => {
    if (!content || !content.trackingScripts) return
    const newScripts = [...content.trackingScripts]
    newScripts[index] = { ...newScripts[index], [field]: value }
    setContent({ ...content, trackingScripts: newScripts })
  }

  const addTrackingScript = () => {
    if (!content) return
    const newScript: ITrackingScript = {
      id: Date.now().toString(),
      name: '',
      script: '',
      enabled: true
    }
    const currentScripts = content.trackingScripts || []
    setContent({ ...content, trackingScripts: [...currentScripts, newScript] })
  }

  const removeTrackingScript = (index: number) => {
    if (!content || !content.trackingScripts) return
    const newScripts = content.trackingScripts.filter((_, i) => i !== index)
    setContent({ ...content, trackingScripts: newScripts })
  }

  const updateDynamicHeading = <K extends keyof IDynamicHeading>(index: number, field: K, value: IDynamicHeading[K]) => {
    if (!content || !content.dynamicHeadings) return
    const newHeadings = [...content.dynamicHeadings]
    newHeadings[index] = { ...newHeadings[index], [field]: value }
    setContent({ ...content, dynamicHeadings: newHeadings })
  }

  const addDynamicHeading = () => {
    if (!content) return
    const newHeading: IDynamicHeading = {
      id: Date.now().toString(),
      key: '',
      mainHeading: '',
      subHeading: '',
      description: '',
      oldWay: '',
      newWay: '',
      createdAt: new Date()
    }
    const currentHeadings = content.dynamicHeadings || []
    setContent({ ...content, dynamicHeadings: [...currentHeadings, newHeading] })
  }

  const removeDynamicHeading = (index: number) => {
    if (!content || !content.dynamicHeadings) return
    const newHeadings = content.dynamicHeadings.filter((_, i) => i !== index)
    setContent({ ...content, dynamicHeadings: newHeadings })
  }

  const handleSave = async () => {
    if (!content) return

    setSaving(true)
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(content)
      })

      if (response.ok) {
        showNotification('success', 'Content updated successfully!')
      } else {
        const errorData = await response.json()
        showNotification('error', errorData.error || 'Failed to update content')
      }
    } catch (error) {
      console.error('Save error:', error)
      showNotification('error', 'Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  const updateContent = <K extends keyof IContent>(field: K, value: IContent[K]) => {
    if (!content) return
    setContent({ ...content, [field]: value })
  }

  const updateTestimonial = <K extends keyof ITestimonial>(index: number, field: K, value: ITestimonial[K]) => {
    if (!content) return
    const newTestimonials = [...content.testimonials]
    newTestimonials[index] = { ...newTestimonials[index], [field]: value }
    setContent({ ...content, testimonials: newTestimonials })
  }

  const addTestimonial = () => {
    if (!content) return
    const newTestimonial: ITestimonial = {
      id: Date.now().toString(),
      name: '',
      quote: '',
      thumbnail: '',
      videoUrl: ''
    }
    setContent({ ...content, testimonials: [...content.testimonials, newTestimonial] })
  }

  const removeTestimonial = (index: number) => {
    if (!content) return
    const newTestimonials = content.testimonials.filter((_, i) => i !== index)
    setContent({ ...content, testimonials: newTestimonials })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <img src='https://zapllo.com/logo.png' />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Zapllo</h1>
              <p className="text-gray-600">Admin Dashboard Login</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="admin@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02]"
              >
                Sign In to Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          <p className="text-gray-600 font-medium">Loading content...</p>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'pricing', label: 'Pricing & Links', icon: IndianRupee },
    { id: 'event', label: 'Event Details', icon: Calendar },
    { id: 'videos', label: 'Hero Video', icon: Video },
    { id: 'testimonials', label: 'Testimonials', icon: Users },
    { id: 'bonuses', label: 'Bonuses', icon: IndianRupee },
    { id: 'whatsapp', label: 'WhatsApp Settings', icon: MessageCircle },
    { id: 'thankyou', label: 'Thank You Page', icon: CheckCircle },
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'tracking', label: 'Tracking Scripts', icon: Code },
    { id: 'dynamic-headings', label: 'Dynamic Headings', icon: Lightbulb }
  ] as const

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center space-x-2 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${notification.type === 'success'
          ? 'bg-green-500 text-white'
          : 'bg-red-500 text-white'
          }`}>
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className='flex items-center'>
              <div className='flex'>
                <img src='https://zapllo.com/logo.png' className='h-10' />
                {/* <h1 className="text-2xl font-bold text-gray-900 mb-2">Zapllo</h1> */}
                <p className="text-black font-bold text-4xl -600">Content Management Dashboard </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold px-6 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('adminToken')
                  setIsLoggedIn(false)
                }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold px-6 py-3 rounded-xl hover:from-red-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 transform hover:scale-[1.02]"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {activeTab === 'pricing' && (
            <div className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <IndianRupee className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Pricing & Enrollment</h2>
                  <p className="text-gray-600">Manage pricing and enrollment settings</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Current Price
                    </label>
                    <input
                      type="text"
                      value={content.price}
                      onChange={(e) => updateContent('price', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="₹99"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Original Price (Strikethrough)
                    </label>
                    <input
                      type="text"
                      value={content.originalPrice}
                      onChange={(e) => updateContent('originalPrice', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="₹999"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Enrollment Link
                    </label>
                    <input
                      type="url"
                      value={content.enrollLink}
                      onChange={(e) => updateContent('enrollLink', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'event' && (
            <div className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Event Details</h2>
                  <p className="text-gray-600">Configure event information and countdown</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>Event Date (Display)</span>
                    </label>
                    <input
                      type="text"
                      value={content.eventDate}
                      onChange={(e) => updateContent('eventDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="29th – 31st Aug"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This is for display purposes only
                    </p>
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                      <Clock className="w-4 h-4" />
                      <span>Event Time (Display)</span>
                    </label>
                    <input
                      type="text"
                      value={content.eventTime}
                      onChange={(e) => updateContent('eventTime', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="7 PM – 9 PM"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This is for display purposes only
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>Location</span>
                    </label>
                    <input
                      type="text"
                      value={content.eventLocation}
                      onChange={(e) => updateContent('eventLocation', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Zoom"
                    />
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                      <Globe className="w-4 h-4" />
                      <span>Language</span>
                    </label>
                    <input
                      type="text"
                      value={content.eventLanguage}
                      onChange={(e) => updateContent('eventLanguage', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="English"
                    />
                  </div>
                </div>
              </div>

              {/* Countdown Settings */}
              <div className="mt-8 bg-orange-50 border border-orange-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-orange-900 mb-4">
                  ⏰ Countdown Timer Settings
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>Exact Event Date & Time (for countdown)</span>
                    </label>
                    <input
                      type="datetime-local"
                      value={content.eventDeadline ? new Date(content.eventDeadline).toISOString().slice(0, 16) : ''}
                      onChange={(e) => {
                        const dateValue = e.target.value ? new Date(e.target.value).toISOString() : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
                        updateContent('eventDeadline', dateValue)
                      }}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This will be used for the countdown timer in bonus section and throughout the site
                    </p>
                  </div>

                  {/* Preview current countdown */}
                  {content.eventDeadline && (
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-2">Countdown Preview:</p>
                      <div className="text-2xl font-bold text-orange-600">
                        {(() => {
                          const now = new Date().getTime()
                          const target = new Date(content.eventDeadline).getTime()
                          const diff = target - now

                          if (diff <= 0) {
                            return "Event has passed"
                          }

                          const days = Math.floor(diff / (1000 * 60 * 60 * 24))
                          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

                          return `${days}d ${hours}h ${minutes}m remaining`
                        })()}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}


          {activeTab === 'bonuses' && (
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <IndianRupee className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Bonus Management</h2>
                    <p className="text-gray-600">Manage bonus offerings and total value</p>
                  </div>
                </div>
                <button
                  onClick={addBonus}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Bonus</span>
                </button>
              </div>

              {/* Bonus Settings */}
              <div className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Bonus Section Settings</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Hero Image URL
                    </label>
                    <input
                      type="url"
                      value={content?.bonusHeroImage || ''}
                      onChange={(e) => updateContent('bonusHeroImage', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="https://example.com/bonus-hero.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Custom Total Value (Optional)
                    </label>
                    <input
                      type="text"
                      value={content?.bonusTotalValue || ''}
                      onChange={(e) => updateContent('bonusTotalValue', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="₹1,08,000 (leave empty for auto-calculation)"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Leave empty to auto-calculate from individual bonus values
                    </p>
                  </div>
                </div>
              </div>

              {/* Bonuses List */}
              <div className="space-y-6">
                {content?.bonuses?.map((bonus, index) => (
                  <div key={bonus.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Bonus {index + 1}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {bonus.image && (
                          <button
                            onClick={() => window.open(bonus.image, '_blank')}
                            className="inline-flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Preview</span>
                          </button>
                        )}
                        {content.bonuses.length > 1 && (
                          <button
                            onClick={() => removeBonus(index)}
                            className="inline-flex items-center space-x-1 text-sm text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Remove</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Bonus Title
                        </label>
                        <input
                          type="text"
                          value={bonus.title}
                          onChange={(e) => updateBonus(index, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="e.g., Team Performance Dashboard"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Bonus Value
                        </label>
                        <input
                          type="text"
                          value={bonus.value}
                          onChange={(e) => updateBonus(index, 'value', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="₹15,000"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={bonus.description}
                          onChange={(e) => updateBonus(index, 'description', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Brief description of what this bonus includes..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Image URL
                        </label>
                        <input
                          type="url"
                          value={bonus.image}
                          onChange={(e) => updateBonus(index, 'image', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="https://example.com/bonus-image.jpg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Icon (Emoji)
                        </label>
                        <input
                          type="text"
                          value={bonus.icon}
                          onChange={(e) => updateBonus(index, 'icon', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="📊"
                          maxLength={2}
                        />
                      </div>
                    </div>

                    {/* Bonus Preview */}
                    {bonus.title && bonus.image && (
                      <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Preview:</p>
                        <div className="flex items-start space-x-4">
                          <img
                            src={bonus.image}
                            alt={bonus.title}
                            className="w-20 h-12 object-cover rounded border border-gray-200"
                            onError={(e) => {
                              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA4MCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iNDgiIGZpbGw9IiNGM0Y0RjYiLz48L3N2Zz4='
                            }}
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <h4 className="font-semibold text-gray-900">{bonus.title}</h4>
                              <span className="text-lg font-bold text-green-600">{bonus.value}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{bonus.description}</p>
                            <div className="mt-2">
                              <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                <span className="line-through">{bonus.value}</span> FREE For Today
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Show empty state only if no bonuses exist */}
                {(!content?.bonuses || content.bonuses.length === 0) && (
                  <div className="text-center py-12">
                    <IndianRupee className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No bonuses configured</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Add bonuses to showcase additional value for your offer.
                    </p>
                    <div className="mt-4">
                      <button
                        onClick={addBonus}
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Your First Bonus</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Total Value Calculator */}
                {content?.bonuses && content.bonuses.length > 0 && (
                  <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-green-900 mb-4">Bonus Value Summary</h3>
                    <div className="space-y-2">
                      {content.bonuses.map((bonus, index) => (
                        <div key={bonus.id} className="flex justify-between text-sm">
                          <span className="text-gray-700">{bonus.title || `Bonus ${index + 1}`}</span>
                          <span className="font-medium text-gray-900">{bonus.value}</span>
                        </div>
                      ))}
                      <div className="border-t border-green-300 pt-2 mt-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span className="text-green-900">Total Calculated Value:</span>
                          <span className="text-green-700">
                            ₹{content.bonuses.reduce((sum, bonus) => {
                              const value = parseInt(bonus.value.replace(/[₹,]/g, '')) || 0
                              return sum + value
                            }, 0).toLocaleString()}
                          </span>
                        </div>
                        {content.bonusTotalValue && content.bonusTotalValue !== '₹1,08,000' && (
                          <div className="flex justify-between text-sm mt-2">
                            <span className="text-gray-600">Custom Display Value:</span>
                            <span className="font-medium text-gray-900">{content.bonusTotalValue}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'videos' && (
            <div className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Video className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Hero Video</h2>
                  <p className="text-gray-600">Manage main promotional video</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Video URL
                    </label>
                    <input
                      type="url"
                      value={content.heroVideoUrl}
                      onChange={(e) => updateContent('heroVideoUrl', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="https://example.com/video.mp4"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Video Poster URL
                    </label>
                    <input
                      type="url"
                      value={content.heroVideoPoster}
                      onChange={(e) => updateContent('heroVideoPoster', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="https://example.com/poster.jpg"
                    />
                  </div>
                </div>

                {/* Video Preview */}
                {content.heroVideoUrl && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Video Preview</h3>
                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                      <video
                        src={content.heroVideoUrl}
                        poster={content.heroVideoPoster}
                        controls
                        className="w-full h-full object-cover"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Testimonials</h2>
                    <p className="text-gray-600">Manage customer testimonial videos</p>
                  </div>
                </div>
                <button
                  onClick={addTestimonial}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Testimonial</span>
                </button>
              </div>

              <div className="space-y-6">
                {content.testimonials.map((testimonial, index) => (
                  <div key={testimonial.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Testimonial {index + 1}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {testimonial.videoUrl && (
                          <button
                            onClick={() => window.open(testimonial.videoUrl, '_blank')}
                            className="inline-flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Preview</span>
                          </button>
                        )}
                        {content.testimonials.length > 1 && (
                          <button
                            onClick={() => removeTestimonial(index)}
                            className="inline-flex items-center space-x-1 text-sm text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Remove</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Customer Name
                        </label>
                        <input
                          type="text"
                          value={testimonial.name}
                          onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Quote
                        </label>
                        <input
                          type="text"
                          value={testimonial.quote}
                          onChange={(e) => updateTestimonial(index, 'quote', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder='"This changed my life!"'
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Thumbnail URL
                        </label>
                        <input
                          type="url"
                          value={testimonial.thumbnail}
                          onChange={(e) => updateTestimonial(index, 'thumbnail', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="https://example.com/thumbnail.jpg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Video URL
                        </label>
                        <input
                          type="url"
                          value={testimonial.videoUrl}
                          onChange={(e) => updateTestimonial(index, 'videoUrl', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="https://example.com/video.mp4"
                        />
                      </div>
                    </div>

                    {/* Thumbnail Preview */}
                    {testimonial.thumbnail && (
                      <div className="mt-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Preview</p>
                        <img
                          src={testimonial.thumbnail}
                          alt={testimonial.name}
                          className="w-32 h-20 object-cover rounded-lg border border-gray-200"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTI4IDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iODAiIGZpbGw9IiNGM0Y0RjYiLz48L3N2Zz4='
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tracking' && (
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Code className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Tracking Scripts</h2>
                    <p className="text-gray-600">Manage analytics and tracking codes</p>
                  </div>
                </div>
                <button
                  onClick={addTrackingScript}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Script</span>
                </button>
              </div>

              <div className="space-y-6">
                {/* Add safety check for trackingScripts */}
                {(content?.trackingScripts || []).map((script, index) => (
                  <div key={script.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {script.name || `Script ${index + 1}`}
                        </h3>
                        <button
                          onClick={() => updateTrackingScript(index, 'enabled', !script.enabled)}
                          className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${script.enabled
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                          <Lightbulb className="w-4 h-4" />
                          <span>{script.enabled ? 'Enabled' : 'Disabled'}</span>
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        {(content?.trackingScripts || []).length > 1 && (
                          <button
                            onClick={() => removeTrackingScript(index)}
                            className="inline-flex items-center space-x-1 text-sm text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Remove</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Script Name
                        </label>
                        <input
                          type="text"
                          value={script.name}
                          onChange={(e) => updateTrackingScript(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="e.g., Google Analytics, Meta Pixel, etc."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Script Code
                        </label>
                        <textarea
                          value={script.script}
                          onChange={(e) => updateTrackingScript(index, 'script', e.target.value)}
                          rows={10}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-mono text-sm"
                          placeholder="Paste your tracking script here..."
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Show empty state only if no scripts exist */}
                {(!content?.trackingScripts || content.trackingScripts.length === 0) && (
                  <div className="text-center py-12">
                    <Code className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No tracking scripts</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Get started by adding your first tracking script.
                    </p>
                    <div className="mt-4">
                      <button
                        onClick={() => {
                          // Initialize with default scripts
                          if (content) {
                            setContent({ ...content, trackingScripts: defaultTrackingScripts })
                          }
                        }}
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Default Scripts</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'whatsapp' && (
            <div className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">WhatsApp Template Settings</h2>
                  <p className="text-gray-600">Configure WhatsApp message template and variables</p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-green-900 mb-4">📱 WhatsApp Template Configuration</h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Template Name
                    </label>
                    <input
                      type="text"
                      value={content?.whatsappTemplate?.templateName || 'masterclass_registration'}
                      onChange={(e) => updateContent('whatsappTemplate', {
                        ...content?.whatsappTemplate,
                        templateName: e.target.value
                      })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="masterclass_registration"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This template must exist in your Interakt dashboard
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Variable 1 (Session Info)
                      </label>
                      <input
                        type="text"
                        value={content?.whatsappTemplate?.variable1 || '{{SESSION_INFO}}'}
                        onChange={(e) => updateContent('whatsappTemplate', {
                          ...content?.whatsappTemplate,
                          variable1: e.target.value
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        placeholder="{{SESSION_INFO}}"
                        readOnly
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Auto-populated with event date & time
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Variable 2 (WhatsApp Group)
                      </label>
                      <input
                        type="url"
                        value={content?.whatsappTemplate?.variable2 || 'https://chat.whatsapp.com/BCgURzYeQZb1PB96uKvxjd?mode=ems_copy_t'}
                        onChange={(e) => updateContent('whatsappTemplate', {
                          ...content?.whatsappTemplate,
                          variable2: e.target.value
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        placeholder="WhatsApp group invite link"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Variable 3 (Website)
                      </label>
                      <input
                        type="url"
                        value={content?.whatsappTemplate?.variable3 || 'https://zapllo.com'}
                        onChange={(e) => updateContent('whatsappTemplate', {
                          ...content?.whatsappTemplate,
                          variable3: e.target.value
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        placeholder="https://zapllo.com"
                      />
                    </div>
                  </div>

                  {/* Template Preview */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Template Preview:</h4>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm font-mono">
                      <div className="mb-2"><strong>Template:</strong> {content?.whatsappTemplate?.templateName || 'masterclass_registration'}</div>
                      <div className="mb-2"><strong>Variable 1:</strong> 📅 {content?.eventDate || '29th Sep'} at {content?.eventTime || '7 PM – 9 PM'}</div>
                      <div className="mb-2"><strong>Variable 2:</strong> {content?.whatsappTemplate?.variable2 || 'https://chat.whatsapp.com/BCgURzYeQZb1PB96uKvxjd?mode=ems_copy_t'}</div>
                      <div><strong>Variable 3:</strong> {content?.whatsappTemplate?.variable3 || 'https://zapllo.com'}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Template Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">📋 Template Setup Instructions</h3>
                <div className="text-sm text-blue-800 space-y-2">
                  <p><strong>1.</strong> Create a template in your Interakt dashboard with the name specified above</p>
                  <p><strong>2.</strong> Use these placeholders in your template: <code className="bg-blue-200 px-2 py-1 rounded">{'{{1}}'}</code>, <code className="bg-blue-200 px-2 py-1 rounded">{'{{2}}'}</code>, <code className="bg-blue-200 px-2 py-1 rounded">{'{{3}}'}</code></p>
                  <p><strong>3.</strong> Set template category as <code className="bg-blue-200 px-2 py-1 rounded">UTILITY</code></p>
                  <p><strong>4.</strong> Language should be <code className="bg-blue-200 px-2 py-1 rounded">en</code></p>
                </div>
              </div>
            </div>
          )}


          {activeTab === 'thankyou' && (
            <div className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Thank You Page Settings</h2>
                  <p className="text-gray-600">Configure video and WhatsApp community link for thank you page</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Video Settings */}
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-purple-900 mb-4">🎬 Preview Video Settings</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Video URL
                      </label>
                      <input
                        type="url"
                        value={content?.thankYouPage?.videoUrl || content?.heroVideoUrl || ''}
                        onChange={(e) => updateContent('thankYouPage', {
                          ...content?.thankYouPage,
                          videoUrl: e.target.value
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="https://example.com/video.mp4"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Video Poster/Thumbnail URL
                      </label>
                      <input
                        type="url"
                        value={content?.thankYouPage?.videoPoster || content?.heroVideoPoster || ''}
                        onChange={(e) => updateContent('thankYouPage', {
                          ...content?.thankYouPage,
                          videoPoster: e.target.value
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="https://example.com/poster.jpg"
                      />
                    </div>

                    {/* Video Preview */}
                    {(content?.thankYouPage?.videoUrl || content?.heroVideoUrl) && (
                      <div className="mt-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Preview:</p>
                        <div className="aspect-video bg-black rounded-lg overflow-hidden">
                          <video
                            src={content?.thankYouPage?.videoUrl || content?.heroVideoUrl}
                            poster={content?.thankYouPage?.videoPoster || content?.heroVideoPoster}
                            controls
                            className="w-full h-full object-cover"
                            preload="metadata"
                          >
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* WhatsApp Community Settings */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-4">📱 WhatsApp Community Settings</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        WhatsApp Group Invite Link
                      </label>
                      <input
                        type="url"
                        value={content?.thankYouPage?.whatsappGroupLink || content?.whatsappTemplate?.variable2 || ''}
                        onChange={(e) => updateContent('thankYouPage', {
                          ...content?.thankYouPage,
                          whatsappGroupLink: e.target.value
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        placeholder="https://chat.whatsapp.com/..."
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        This link will be used for the "Join WhatsApp Community" button
                      </p>
                    </div>

                    {/* Link Preview */}
                    {content?.thankYouPage?.whatsappGroupLink && (
                      <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Preview:</p>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <input
                            type="text"
                            value={content.thankYouPage.whatsappGroupLink}
                            readOnly
                            className="flex-1 bg-transparent border-none outline-none text-gray-700 text-sm"
                          />
                          <button
                            onClick={() => window.open(content.thankYouPage.whatsappGroupLink, '_blank')}
                            className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
                          >
                            Test Link
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sync Options */}
              <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-yellow-900 mb-4">🔄 Sync with Other Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      updateContent('thankYouPage', {
                        ...content?.thankYouPage,
                        videoUrl: content?.heroVideoUrl,
                        videoPoster: content?.heroVideoPoster
                      })
                    }}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Use Hero Video Settings
                  </button>
                  <button
                    onClick={() => {
                      updateContent('thankYouPage', {
                        ...content?.thankYouPage,
                        whatsappGroupLink: content?.whatsappTemplate?.variable2
                      })
                    }}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Use WhatsApp Template Link
                  </button>
                </div>
                <p className="text-sm text-yellow-700 mt-2">
                  Click these buttons to sync settings from other sections
                </p>
              </div>
            </div>
          )}

          {/* // Add the leads tab content (add this after the bonuses tab and before tracking tab) */}
          {activeTab === 'leads' && (
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Lead Management</h2>
                    <p className="text-gray-600">View and manage registration leads</p>
                  </div>
                </div>
                <button
                  onClick={fetchLeads}
                  disabled={loadingLeads}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50"
                >
                  {loadingLeads ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>Refresh</span>
                  )}
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Leads</p>
                      <p className="text-3xl font-bold text-gray-900">{leads.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Today</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {leads.filter(lead => new Date(lead.createdAt).toDateString() === new Date().toDateString()).length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">This Week</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {leads.filter(lead => {
                          const leadDate = new Date(lead.createdAt)
                          const weekAgo = new Date()
                          weekAgo.setDate(weekAgo.getDate() - 7)
                          return leadDate >= weekAgo
                        }).length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {leads.length > 0 ? '100%' : '0%'}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Leads Table */}
              {loadingLeads ? (
                <div className="text-center py-12">
                  <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600">Loading leads...</p>
                </div>
              ) : leads.length > 0 ? (
                <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Team Size
                          </th>
                          {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Session
                          </th> */}
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Registered
                          </th>
                          {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th> */}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {leads.map((lead) => (
                          <tr key={lead._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {lead.firstName} {lead.lastName}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{lead.email}</div>
                              <div className="text-sm text-gray-500">+91 {lead.phone}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                {lead.teamSize}
                              </span>
                            </td>
                            {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {lead.session}
                            </td> */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(lead.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </td>
                            {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => {
                                  const mailtoLink = `mailto:${lead.email}?subject=Welcome to the Masterclass&body=Hi ${lead.firstName},\n\nThank you for registering for our masterclass.\n\nBest regards,\nTeam`
                                  window.open(mailtoLink, '_blank')
                                }}
                                className="text-blue-600 hover:text-blue-900 mr-3"
                              >
                                Email
                              </button>
                              <button
                                onClick={() => {
                                  const whatsappLink = `https://wa.me/91${lead.phone}?text=Hi ${lead.firstName}, thank you for registering for our masterclass!`
                                  window.open(whatsappLink, '_blank')
                                }}
                                className="text-green-600 hover:text-green-900"
                              >
                                WhatsApp
                              </button>
                            </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No leads yet</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Leads will appear here when visitors register through the enrollment form.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'dynamic-headings' && (
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Lightbulb className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Dynamic Headings</h2>
                    <p className="text-gray-600">Create different landing page content for different URL parameters</p>
                  </div>
                </div>
                <button
                  onClick={addDynamicHeading}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Heading Variant</span>
                </button>
              </div>

              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">How Dynamic Headings Work</h3>
                <p className="text-blue-700 mb-2">
                  Create different versions of your landing page content that will be shown based on the URL parameter.
                </p>
                <p className="text-blue-600 text-sm">
                  Example: If you create a heading with key "entrepreneurs", users visiting
                  <code className="bg-blue-100 px-1 rounded ml-1">yoursite.com/?heading=entrepreneurs</code> will see that specific content.
                </p>
              </div>

              <div className="space-y-6">
                {(content?.dynamicHeadings || []).map((heading, index) => (
                  <div key={heading.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Heading Variant {index + 1}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {heading.key && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            URL: ?heading={heading.key}
                          </span>
                        )}
                        {(content?.dynamicHeadings || []).length > 1 && (
                          <button
                            onClick={() => removeDynamicHeading(index)}
                            className="inline-flex items-center space-x-1 text-sm text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Remove</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          URL Parameter Key
                        </label>
                        <input
                          type="text"
                          value={heading.key}
                          onChange={(e) => updateDynamicHeading(index, 'key', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="e.g., entrepreneurs, smb-owners, freelancers"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          This will create the URL: yoursite.com/?heading={heading.key || 'your-key'}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Main Heading
                        </label>
                        <input
                          type="text"
                          value={heading.mainHeading}
                          onChange={(e) => updateDynamicHeading(index, 'mainHeading', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="e.g., Cut 30% of Your Operational Costs"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Sub Heading
                        </label>
                        <input
                          type="text"
                          value={heading.subHeading}
                          onChange={(e) => updateDynamicHeading(index, 'subHeading', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="e.g., with India's 1st AI Co-Manager for MSMEs"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Description/Benefits Text
                        </label>
                        <textarea
                          value={heading.description || ''}
                          onChange={(e) => updateDynamicHeading(index, 'description', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="e.g., Turn chaos into systems & boost your productivity"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Old Way Text (❌ Old Way:)
                        </label>
                        <input
                          type="text"
                          value={heading.oldWay || ''}
                          onChange={(e) => updateDynamicHeading(index, 'oldWay', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="e.g., Hire more managers, chase your team, and drown in follow-ups."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          New Way Text (✅ New Way:)
                        </label>
                        <input
                          type="text"
                          value={heading.newWay || ''}
                          onChange={(e) => updateDynamicHeading(index, 'newWay', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="e.g., Plug in Zapllo, Your AI Co-Manager that saves time, cuts costs, reduces errors & scales your business smartly."
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Current Price (Optional)
                          </label>
                          <input
                            type="text"
                            value={heading.price || ''}
                            onChange={(e) => updateDynamicHeading(index, 'price', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="e.g., ₹197 (leave empty for default)"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Original Price (Optional)
                          </label>
                          <input
                            type="text"
                            value={heading.originalPrice || ''}
                            onChange={(e) => updateDynamicHeading(index, 'originalPrice', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="e.g., ₹1999 (leave empty for default)"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Enrollment Link (Optional)
                          </label>
                          <input
                            type="url"
                            value={heading.enrollLink || ''}
                            onChange={(e) => updateDynamicHeading(index, 'enrollLink', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="https://... (leave empty for default)"
                          />
                        </div>
                      </div>

                      {/* Add this info note */}
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          <strong>💡 Pricing Override:</strong> If you set custom pricing here, it will override the default pricing when users visit this specific URL variant. Leave empty to use default pricing.
                        </p>
                      </div>
                      {/* Preview */}
                      {heading.mainHeading && (
                        <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                          <p className="text-sm font-semibold text-gray-700 mb-2">Preview:</p>
                          <div className="space-y-2">
                            <h4 className="text-lg font-bold text-gray-900">{heading.mainHeading}</h4>
                            <h5 className="text-base font-medium text-gray-700">{heading.subHeading}</h5>
                            {heading.description && <p className="text-sm text-gray-600">{heading.description}</p>}
                            {heading.oldWay && <p className="text-sm text-gray-600">❌ Old Way: {heading.oldWay}</p>}
                            {heading.newWay && <p className="text-sm text-gray-600">✅ New Way: {heading.newWay}</p>}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Show empty state only if no headings exist */}
                {(!content?.dynamicHeadings || content.dynamicHeadings.length === 0) && (
                  <div className="text-center py-12">
                    <Lightbulb className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No dynamic headings</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Create different versions of your landing page content for different audiences.
                    </p>
                    <div className="mt-4">
                      <button
                        onClick={addDynamicHeading}
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Your First Heading</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
