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
  MessageCircle,
  Menu,
  X,
  Home,
  Settings,
  BarChart3,
  Database,
  Zap,
  // New icons for lead management
  Search,
  Filter,
  Download,
  Edit3,
  Phone,
  Mail,
  Tag,
  Star,
  MoreHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  UserCheck,
  UserX,
  TrendingUp,
  Copy,
  ExternalLink,
  SortAsc,
  SortDesc,
  FileText,
  Activity
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

// Lead management interfaces
interface LeadFilters {
  search: string
  teamSize: string
  source: string
  startDate: string
  endDate: string
  dateRange: string
}

interface LeadPagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

interface LeadStats {
  total: number
  today: number
  thisWeek: number
  thisMonth: number
  byTeamSize: Record<string, number>
  bySource: Record<string, number>
  recentGrowth: number
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
  const [activeTab, setActiveTab] = useState<'pricing' | 'event' | 'videos' | 'testimonials' | 'bonuses' | 'whatsapp' | 'thankyou' | 'leads' | 'tracking' | 'dynamic-headings'>('pricing')
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  // Enhanced leads state
  const [leads, setLeads] = useState<ILead[]>([])
  const [loadingLeads, setLoadingLeads] = useState(false)
  const [leadFilters, setLeadFilters] = useState<LeadFilters>({
    search: '',
    teamSize: '',
    source: '',
    startDate: '',
    endDate: '',
    dateRange: ''
  })
  const [leadPagination, setLeadPagination] = useState<LeadPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })
  const [leadStats, setLeadStats] = useState<LeadStats>({
    total: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    byTeamSize: {},
    bySource: {},
    recentGrowth: 0
  })
  const [selectedLeads, setSelectedLeads] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  const [sortField, setSortField] = useState<'createdAt' | 'firstName' | 'email'>('createdAt')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedLead, setSelectedLead] = useState<ILead | null>(null)
  const [showLeadModal, setShowLeadModal] = useState(false)

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

  // Enhanced fetchLeads function
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
        let filteredLeads = [...data]

        // Apply filters
        if (leadFilters.search) {
          const searchTerm = leadFilters.search.toLowerCase()
          filteredLeads = filteredLeads.filter(lead =>
            lead.firstName.toLowerCase().includes(searchTerm) ||
            lead.lastName.toLowerCase().includes(searchTerm) ||
            lead.email.toLowerCase().includes(searchTerm) ||
            lead.phone.includes(searchTerm)
          )
        }

        if (leadFilters.teamSize) {
          filteredLeads = filteredLeads.filter(lead => lead.teamSize === leadFilters.teamSize)
        }

        if (leadFilters.source) {
          filteredLeads = filteredLeads.filter(lead => lead.source === leadFilters.source)
        }

        if (leadFilters.startDate || leadFilters.endDate || leadFilters.dateRange) {
          let startDate: Date | null = null
          let endDate: Date | null = null

          if (leadFilters.dateRange) {
            const now = new Date()
            switch (leadFilters.dateRange) {
              case 'today':
                startDate = new Date(now.setHours(0, 0, 0, 0))
                endDate = new Date(now.setHours(23, 59, 59, 999))
                break
              case 'yesterday':
                const yesterday = new Date(now)
                yesterday.setDate(yesterday.getDate() - 1)
                startDate = new Date(yesterday.setHours(0, 0, 0, 0))
                endDate = new Date(yesterday.setHours(23, 59, 59, 999))
                break
              case 'thisWeek':
                const weekStart = new Date(now)
                weekStart.setDate(now.getDate() - now.getDay())
                startDate = new Date(weekStart.setHours(0, 0, 0, 0))
                endDate = new Date()
                break
              case 'lastWeek':
                const lastWeekEnd = new Date(now)
                lastWeekEnd.setDate(now.getDate() - now.getDay() - 1)
                const lastWeekStart = new Date(lastWeekEnd)
                lastWeekStart.setDate(lastWeekEnd.getDate() - 6)
                startDate = new Date(lastWeekStart.setHours(0, 0, 0, 0))
                endDate = new Date(lastWeekEnd.setHours(23, 59, 59, 999))
                break
              case 'thisMonth':
                startDate = new Date(now.getFullYear(), now.getMonth(), 1)
                endDate = new Date()
                break
              case 'lastMonth':
                const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
                const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)
                startDate = lastMonth
                endDate = lastMonthEnd
                break
            }
          } else {
            if (leadFilters.startDate) startDate = new Date(leadFilters.startDate)
            if (leadFilters.endDate) endDate = new Date(leadFilters.endDate)
          }

          if (startDate || endDate) {
            filteredLeads = filteredLeads.filter(lead => {
              const leadDate = new Date(lead.createdAt)
              if (startDate && leadDate < startDate) return false
              if (endDate && leadDate > endDate) return false
              return true
            })
          }
        }

        // Apply sorting
        filteredLeads.sort((a, b) => {
          let aValue: any, bValue: any

          switch (sortField) {
            case 'firstName':
              aValue = a.firstName.toLowerCase()
              bValue = b.firstName.toLowerCase()
              break
            case 'email':
              aValue = a.email.toLowerCase()
              bValue = b.email.toLowerCase()
              break
            case 'createdAt':
            default:
              aValue = new Date(a.createdAt)
              bValue = new Date(b.createdAt)
              break
          }

          if (sortOrder === 'desc') {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
          } else {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
          }
        })

        // Calculate stats
        const now = new Date()
        const today = new Date(now.setHours(0, 0, 0, 0))
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        const monthAgo = new Date(now.getFullYear(), now.getMonth(), 1)
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)

        const todayLeads = data.filter((lead: ILead) => new Date(lead.createdAt) >= today).length
        const thisWeekLeads = data.filter((lead: ILead) => new Date(lead.createdAt) >= weekAgo).length
        const thisMonthLeads = data.filter((lead: ILead) => new Date(lead.createdAt) >= monthAgo).length
        const lastMonthLeads = data.filter((lead: ILead) => {
          const leadDate = new Date(lead.createdAt)
          return leadDate >= lastMonth && leadDate <= lastMonthEnd
        }).length

        const byTeamSize = data.reduce((acc: Record<string, number>, lead: ILead) => {
          acc[lead.teamSize] = (acc[lead.teamSize] || 0) + 1
          return acc
        }, {})

        const bySource = data.reduce((acc: Record<string, number>, lead: ILead) => {
          const source = lead.source || 'Direct'
          acc[source] = (acc[source] || 0) + 1
          return acc
        }, {})

        const growth = lastMonthLeads > 0 ? ((thisMonthLeads - lastMonthLeads) / lastMonthLeads) * 100 : 0

        setLeadStats({
          total: data.length,
          today: todayLeads,
          thisWeek: thisWeekLeads,
          thisMonth: thisMonthLeads,
          byTeamSize,
          bySource,
          recentGrowth: Math.round(growth)
        })

        // Apply pagination
        const total = filteredLeads.length
        const totalPages = Math.ceil(total / leadPagination.limit)
        const startIndex = (leadPagination.page - 1) * leadPagination.limit
        const endIndex = startIndex + leadPagination.limit
        const paginatedLeads = filteredLeads.slice(startIndex, endIndex)

        setLeads(paginatedLeads)
        setLeadPagination(prev => ({ ...prev, total, totalPages }))
      }
    } catch (error) {
      console.error('Error fetching leads:', error)
      showNotification('error', 'Failed to fetch leads')
    } finally {
      setLoadingLeads(false)
    }
  }

  // Export leads function
  const exportLeads = () => {
    const csvData = leads.map(lead => ({
      'First Name': lead.firstName,
      'Last Name': lead.lastName,
      'Email': lead.email,
      'Phone': lead.phone,
      'Team Size': lead.teamSize,
      'Source': lead.source || 'Direct',
      'Session': lead.session || '',
      'Registration Date': new Date(lead.createdAt).toLocaleDateString(),
      'Registration Time': new Date(lead.createdAt).toLocaleTimeString()
    }))

    const csvString = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).map(val => `"${val}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvString], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  // Reset filters
  const resetFilters = () => {
    setLeadFilters({
      search: '',
      teamSize: '',
      source: '',
      startDate: '',
      endDate: '',
      dateRange: ''
    })
    setLeadPagination(prev => ({ ...prev, page: 1 }))
  }

  // Filter change handler
  const handleFilterChange = (key: keyof LeadFilters, value: string) => {
    setLeadFilters(prev => ({ ...prev, [key]: value }))
    setLeadPagination(prev => ({ ...prev, page: 1 }))
  }

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    showNotification('success', 'Copied to clipboard!')
  }

  // Debounced search effect
  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchLeads()
    }, 300)
    return () => clearTimeout(debounce)
  }, [leadFilters, sortField, sortOrder, leadPagination.page, leadPagination.limit])

  // Fetch leads when leads tab is active
  useEffect(() => {
    if (activeTab === 'leads') {
      fetchLeads()
    }
  }, [activeTab])

  // Get unique team sizes and sources for filter options
  const uniqueTeamSizes = [...new Set(leads.map(lead => lead.teamSize))].sort()
  const uniqueSources = [...new Set(leads.map(lead => lead.source || 'Direct'))].sort()

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-lg p-8 border">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <img src='https://zapllo.com/logo.png' className="h-8 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Sign in to manage your content</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="admin@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          <p className="text-gray-600 font-medium">Loading content...</p>
        </div>
      </div>
    )
  }

  const navigationItems = [
    {
      id: 'pricing',
      label: 'Pricing',
      icon: IndianRupee,
      category: 'content',
      description: 'Manage pricing and enrollment settings'
    },
    {
      id: 'event',
      label: 'Event Details',
      icon: Calendar,
      category: 'content',
      description: 'Configure event information'
    },
    {
      id: 'videos',
      label: 'Videos',
      icon: Video,
      category: 'content',
      description: 'Manage promotional videos'
    },
    {
      id: 'testimonials',
      label: 'Testimonials',
      icon: MessageCircle,
      category: 'content',
      description: 'Customer testimonials'
    },
    {
      id: 'bonuses',
      label: 'Bonuses',
      icon: DollarSign,
      category: 'content',
      description: 'Bonus offerings'
    },
    {
      id: 'dynamic-headings',
      label: 'Dynamic Content',
      icon: Lightbulb,
      category: 'content',
      description: 'URL-based content variants'
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: MessageCircle,
      category: 'settings',
      description: 'WhatsApp integration'
    },
    {
      id: 'thankyou',
      label: 'Thank You Page',
      icon: CheckCircle,
      category: 'settings',
      description: 'Post-enrollment content'
    },
    {
      id: 'tracking',
      label: 'Analytics',
      icon: Code,
      category: 'settings',
      description: 'Tracking scripts'
    },
    {
      id: 'leads',
      label: 'Leads',
      icon: Users,
      category: 'data',
      description: 'View registrations'
    }
  ] as const

  const categories = [
    { id: 'content', label: 'Content Management', icon: Home },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'data', label: 'Analytics & Data', icon: BarChart3 }
  ]

  return (
    <div className="min-h-screen flex-1 flex bg-gray-50">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center space-x-2 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${notification.type === 'success'
          ? 'bg-green-600 text-white'
          : 'bg-red-600 text-white'
          }`}>
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Lead Detail Modal */}
      {showLeadModal && selectedLead && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Lead Details</h2>
                <button
                  onClick={() => setShowLeadModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Name</label>
                      <p className="text-gray-900 font-medium">{selectedLead.firstName} {selectedLead.lastName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Team Size</label>
                      <p className="text-gray-900">{selectedLead.teamSize}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{selectedLead.email}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(selectedLead.email)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">+91 {selectedLead.phone}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => copyToClipboard(selectedLead.phone)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <a
                          href={`tel:+91${selectedLead.phone}`}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                        <a
                          href={`https://wa.me/91${selectedLead.phone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-700"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Registration Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Registration Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Source</label>
                      <p className="text-gray-900">{selectedLead.source || 'Direct'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Session</label>
                      <p className="text-gray-900">{selectedLead.session || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Registration Date</label>
                      <p className="text-gray-900">{new Date(selectedLead.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Registration Time</label>
                      <p className="text-gray-900">{new Date(selectedLead.createdAt).toLocaleTimeString()}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <a
                    href={`mailto:${selectedLead.email}?subject=Welcome to the Masterclass`}
                    className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send Email
                  </a>
                  <a
                    href={`https://wa.me/91${selectedLead.phone}?text=Hi ${selectedLead.firstName}, thank you for registering for our masterclass!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-600 text-white text-center py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`tel:+91${selectedLead.phone}`}
                    className="flex-1 bg-orange-600 text-white text-center py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Call
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-3 ">
              <div className=''>
                <div className='flex items-center justify-center w-full'>
                  {/* <img src='https://zapllo.com/logo.png' className="h-8" /> */}
                </div>
                <h1 className="text-lg font-bold text-gray-900">
                  Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Content Management</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 p-4 space-y-6 overflow-y-auto">
            {categories.map((category) => {
              const CategoryIcon = category.icon
              const categoryItems = navigationItems.filter(item => item.category === category.id)

              return (
                <div key={category.id} className="space-y-2">
                  <div className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    <CategoryIcon className="w-4 h-4" />
                    <span>{category.label}</span>
                  </div>
                  <div className="space-y-1">
                    {categoryItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id)
                            setSidebarOpen(false)
                          }}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === item.id
                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                            : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                          <Icon className="w-5 h-5 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="font-medium">{item.label}</div>
                            <div className="text-xs text-gray-500">{item.description}</div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t">
            <button
              onClick={() => {
                localStorage.removeItem('adminToken')
                setIsLoggedIn(false)
              }}
              className="w-full flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:p w-full">
        {/* Top Header */}
        <div className="bg-white border-b px-4 py-4 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {navigationItems.find(item => item.id === activeTab)?.label}
                </h1>
                <p className="text-sm text-gray-500">
                  {navigationItems.find(item => item.id === activeTab)?.description}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center space-x-2 bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span className="hidden sm:inline">{saving ? 'Saving...' : 'Save'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 lg:p-6">
          <div className="bg-white rounded-lg shadow-sm border">
            {activeTab === 'pricing' && (
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Price
                      </label>
                      <input
                        type="text"
                        value={content.price}
                        onChange={(e) => updateContent('price', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="₹99"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Original Price (Strikethrough)
                      </label>
                      <input
                        type="text"
                        value={content.originalPrice}
                        onChange={(e) => updateContent('originalPrice', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="₹999"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Enrollment Link
                      </label>
                      <input
                        type="url"
                        value={content.enrollLink}
                        onChange={(e) => updateContent('enrollLink', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'event' && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Date (Display)
                      </label>
                      <input
                        type="text"
                        value={content.eventDate}
                        onChange={(e) => updateContent('eventDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="29th – 31st Aug"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Time (Display)
                      </label>
                      <input
                        type="text"
                        value={content.eventTime}
                        onChange={(e) => updateContent('eventTime', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="7 PM – 9 PM"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={content.eventLocation}
                        onChange={(e) => updateContent('eventLocation', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Zoom"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <input
                        type="text"
                        value={content.eventLanguage}
                        onChange={(e) => updateContent('eventLanguage', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="English"
                      />
                    </div>
                  </div>
                </div>

                {/* Countdown Settings */}
                <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-orange-900 mb-4">
                    Countdown Timer Settings
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Exact Event Date & Time (for countdown)
                    </label>
                    <input
                      type="datetime-local"
                      value={content.eventDeadline ? new Date(content.eventDeadline).toISOString().slice(0, 16) : ''}
                      onChange={(e) => {
                        const dateValue = e.target.value ? new Date(e.target.value).toISOString() : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
                        updateContent('eventDeadline', dateValue)
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This will be used for the countdown timer throughout the site
                    </p>
                  </div>

                  {/* Preview current countdown */}
                  {content.eventDeadline && (
                    <div className="mt-4 bg-white rounded-lg p-3 border border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-1">Countdown Preview:</p>
                      <div className="text-lg font-semibold text-orange-600">
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
            )}

            {activeTab === 'videos' && (
              <div className="p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Video URL
                      </label>
                      <input
                        type="url"
                        value={content.heroVideoUrl}
                        onChange={(e) => updateContent('heroVideoUrl', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://example.com/video.mp4"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Video Poster URL
                      </label>
                      <input
                        type="url"
                        value={content.heroVideoPoster}
                        onChange={(e) => updateContent('heroVideoPoster', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://example.com/poster.jpg"
                      />
                    </div>
                  </div>

                  {/* Video Preview */}
                  {content.heroVideoUrl && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Video Preview</h3>
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
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium text-gray-900">Manage Testimonials</h2>
                  <button
                    onClick={addTestimonial}
                    className="inline-flex items-center space-x-2 bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Testimonial</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {content.testimonials.map((testimonial, index) => (
                    <div key={testimonial.id} className="bg-gray-50 rounded-lg p-4 border">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-900">
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Customer Name
                          </label>
                          <input
                            type="text"
                            value={testimonial.name}
                            onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Quote
                          </label>
                          <input
                            type="text"
                            value={testimonial.quote}
                            onChange={(e) => updateTestimonial(index, 'quote', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder='"This changed my life!"'
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Thumbnail URL
                          </label>
                          <input
                            type="url"
                            value={testimonial.thumbnail}
                            onChange={(e) => updateTestimonial(index, 'thumbnail', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://example.com/thumbnail.jpg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Video URL
                          </label>
                          <input
                            type="url"
                            value={testimonial.videoUrl}
                            onChange={(e) => updateTestimonial(index, 'videoUrl', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://example.com/video.mp4"
                          />
                        </div>
                      </div>

                      {/* Thumbnail Preview */}
                      {testimonial.thumbnail && (
                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Preview</p>
                          <img
                            src={testimonial.thumbnail}
                            alt={testimonial.name}
                            className="w-32 h-20 object-cover rounded-lg border"
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

            {activeTab === 'bonuses' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium text-gray-900">Manage Bonuses</h2>
                  <button
                    onClick={addBonus}
                    className="inline-flex items-center space-x-2 bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Bonus</span>
                  </button>
                </div>

                {/* Bonus Settings */}
                <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-blue-900 mb-4">Bonus Section Settings</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hero Image URL
                      </label>
                      <input
                        type="url"
                        value={content?.bonusHeroImage || ''}
                        onChange={(e) => updateContent('bonusHeroImage', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://example.com/bonus-hero.jpg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Custom Total Value (Optional)
                      </label>
                      <input
                        type="text"
                        value={content?.bonusTotalValue || ''}
                     onChange={(e) => updateContent('bonusTotalValue', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    <div key={bonus.id} className="bg-gray-50 rounded-lg p-4 border">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-900">
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bonus Title
                          </label>
                          <input
                            type="text"
                            value={bonus.title}
                            onChange={(e) => updateBonus(index, 'title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Team Performance Dashboard"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bonus Value
                          </label>
                          <input
                            type="text"
                            value={bonus.value}
                            onChange={(e) => updateBonus(index, 'value', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="₹15,000"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                          </label>
                          <textarea
                            value={bonus.description}
                            onChange={(e) => updateBonus(index, 'description', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Brief description of what this bonus includes..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image URL
                          </label>
                          <input
                            type="url"
                            value={bonus.image}
                            onChange={(e) => updateBonus(index, 'image', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://example.com/bonus-image.jpg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Icon (Emoji)
                          </label>
                          <input
                            type="text"
                            value={bonus.icon}
                            onChange={(e) => updateBonus(index, 'icon', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="📊"
                            maxLength={2}
                          />
                        </div>
                      </div>

                      {/* Bonus Preview */}
                      {bonus.title && bonus.image && (
                        <div className="mt-4 p-3 bg-white rounded-lg border">
                          <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                          <div className="flex items-start space-x-4">
                            <img
                              src={bonus.image}
                              alt={bonus.title}
                              className="w-20 h-12 object-cover rounded border"
                              onError={(e) => {
                                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA4MCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iNDgiIGZpbGw9IiNGM0Y0RjYiLz48L3N2Zz4='
                              }}
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <h4 className="font-medium text-gray-900">{bonus.title}</h4>
                                <span className="text-lg font-semibold text-green-600">{bonus.value}</span>
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
                      <DollarSign className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No bonuses configured</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Add bonuses to showcase additional value for your offer.
                      </p>
                      <div className="mt-4">
                        <button
                          onClick={addBonus}
                          className="inline-flex items-center space-x-2 bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Your First Bonus</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Total Value Calculator */}
                  {content?.bonuses && content.bonuses.length > 0 && (
                    <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-green-900 mb-4">Bonus Value Summary</h3>
                      <div className="space-y-2">
                        {content.bonuses.map((bonus, index) => (
                          <div key={bonus.id} className="flex justify-between text-sm">
                            <span className="text-gray-700">{bonus.title || `Bonus ${index + 1}`}</span>
                            <span className="font-medium text-gray-900">{bonus.value}</span>
                          </div>
                        ))}
                        <div className="border-t border-green-300 pt-2 mt-4">
                          <div className="flex justify-between text-lg font-semibold">
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

            {activeTab === 'dynamic-headings' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">Dynamic Headings</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Create different landing page content for different URL parameters
                    </p>
                  </div>
                  <button
                    onClick={addDynamicHeading}
                    className="inline-flex items-center space-x-2 bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Variant</span>
                  </button>
                </div>

                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-900 mb-2">How Dynamic Headings Work</h3>
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
                    <div key={heading.id} className="bg-gray-50 rounded-lg p-4 border">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-900">
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
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            URL Parameter Key
                          </label>
                          <input
                            type="text"
                            value={heading.key}
                            onChange={(e) => updateDynamicHeading(index, 'key', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., entrepreneurs, smb-owners, freelancers"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            This will create the URL: yoursite.com/?heading={heading.key || 'your-key'}
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Main Heading
                          </label>
                          <input
                            type="text"
                            value={heading.mainHeading}
                            onChange={(e) => updateDynamicHeading(index, 'mainHeading', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Cut 30% of Your Operational Costs"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sub Heading
                          </label>
                          <input
                            type="text"
                            value={heading.subHeading}
                            onChange={(e) => updateDynamicHeading(index, 'subHeading', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., with India's 1st AI Co-Manager for MSMEs"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Old Way Text (❌ Old Way:)
                          </label>
                          <input
                            type="text"
                            value={heading.oldWay || ''}
                            onChange={(e) => updateDynamicHeading(index, 'oldWay', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Hire more managers, chase your team, and drown in follow-ups."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Way Text (✅ New Way:)
                          </label>
                          <input
                            type="text"
                            value={heading.newWay || ''}
                            onChange={(e) => updateDynamicHeading(index, 'newWay', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Plug in Zapllo, Your AI Co-Manager that saves time, cuts costs, reduces errors & scales your business smartly."
                          />
                        </div>

                        {/* Preview */}
                        {heading.mainHeading && (
                          <div className="mt-4 p-3 bg-white rounded-lg border">
                            <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                            <div className="space-y-2">
                              <h4 className="text-lg font-semibold text-gray-900">{heading.mainHeading}</h4>
                              <h5 className="text-base font-medium text-gray-700">{heading.subHeading}</h5>
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
                          className="inline-flex items-center space-x-2 bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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

            {activeTab === 'whatsapp' && (
              <div className="p-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-medium text-green-900 mb-4">📱 WhatsApp Template Configuration</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Template Name
                      </label>
                      <input
                        type="text"
                        value={content?.whatsappTemplate?.templateName || 'masterclass_registration'}
                        onChange={(e) => updateContent('whatsappTemplate', {
                          ...content?.whatsappTemplate,
                          templateName: e.target.value
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="masterclass_registration"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        This template must exist in your Interakt dashboard
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Variable 1 (Session Info)
                        </label>
                        <input
                          type="text"
                          value={content?.whatsappTemplate?.variable1 || '{{SESSION_INFO}}'}
                          onChange={(e) => updateContent('whatsappTemplate', {
                            ...content?.whatsappTemplate,
                            variable1: e.target.value
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                          placeholder="{{SESSION_INFO}}"
                          readOnly
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Auto-populated with event date & time
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Variable 2 (WhatsApp Group)
                        </label>
                        <input
                          type="url"
                          value={content?.whatsappTemplate?.variable2 || 'https://chat.whatsapp.com/BCgURzYeQZb1PB96uKvxjd?mode=ems_copy_t'}
                          onChange={(e) => updateContent('whatsappTemplate', {
                            ...content?.whatsappTemplate,
                            variable2: e.target.value
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="WhatsApp group invite link"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Variable 3 (Website)
                        </label>
                        <input
                          type="url"
                          value={content?.whatsappTemplate?.variable3 || 'https://zapllo.com'}
                          onChange={(e) => updateContent('whatsappTemplate', {
                            ...content?.whatsappTemplate,
                            variable3: e.target.value
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="https://zapllo.com"
                        />
                      </div>
                    </div>

                    {/* Template Preview */}
                    <div className="bg-white rounded-lg p-4 border">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Template Preview:</h4>
                      <div className="bg-gray-50 p-3 rounded-lg text-sm font-mono">
                        <div className="mb-2"><strong>Template:</strong> {content?.whatsappTemplate?.templateName || 'masterclass_registration'}</div>
                        <div className="mb-2"><strong>Variable 1:</strong> 📅 {content?.eventDate || '29th Sep'} at {content?.eventTime || '7 PM – 9 PM'}</div>
                        <div className="mb-2"><strong>Variable 2:</strong> {content?.whatsappTemplate?.variable2 || 'https://chat.whatsapp.com/BCgURzYeQZb1PB96uKvxjd?mode=ems_copy_t'}</div>
                        <div><strong>Variable 3:</strong> {content?.whatsappTemplate?.variable3 || 'https://zapllo.com'}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Template Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-blue-900 mb-4">📋 Template Setup Instructions</h3>
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
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Video Settings */}
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-purple-900 mb-4">🎬 Preview Video Settings</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Video URL
                        </label>
                        <input
                          type="url"
                          value={content?.thankYouPage?.videoUrl || content?.heroVideoUrl || ''}
                          onChange={(e) => updateContent('thankYouPage', {
                            ...content?.thankYouPage,
                            videoUrl: e.target.value
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          placeholder="https://example.com/video.mp4"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Video Poster/Thumbnail URL
                        </label>
                        <input
                          type="url"
                          value={content?.thankYouPage?.videoPoster || content?.heroVideoPoster || ''}
                          onChange={(e) => updateContent('thankYouPage', {
                            ...content?.thankYouPage,
                            videoPoster: e.target.value
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          placeholder="https://example.com/poster.jpg"
                        />
                      </div>

                      {/* Video Preview */}
                      {(content?.thankYouPage?.videoUrl || content?.heroVideoUrl) && (
                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
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
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-green-900 mb-4">📱 WhatsApp Community Settings</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          WhatsApp Group Invite Link
                        </label>
                        <input
                          type="url"
                          value={content?.thankYouPage?.whatsappGroupLink || content?.whatsappTemplate?.variable2 || ''}
                          onChange={(e) => updateContent('thankYouPage', {
                            ...content?.thankYouPage,
                            whatsappGroupLink: e.target.value
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="https://chat.whatsapp.com/..."
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          This link will be used for the "Join WhatsApp Community" button
                        </p>
                      </div>

                      {/* Link Preview */}
                      {content?.thankYouPage?.whatsappGroupLink && (
                        <div className="mt-4 p-3 bg-white rounded-lg border">
                          <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                          <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
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
               <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-yellow-900 mb-4">🔄 Sync with Other Settings</h3>
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

            {activeTab === 'tracking' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">Tracking Scripts</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage analytics and tracking codes</p>
                  </div>
                  <button
                    onClick={addTrackingScript}
                    className="inline-flex items-center space-x-2 bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Script</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {(content?.trackingScripts || []).map((script, index) => (
                    <div key={script.id} className="bg-gray-50 rounded-lg p-4 border">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-medium text-gray-900">
                            {script.name || `Script ${index + 1}`}
                          </h3>
                          <button
                            onClick={() => updateTrackingScript(index, 'enabled', !script.enabled)}
                            className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium transition-colors ${script.enabled
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                          >
                            <div className={`w-2 h-2 rounded-full ${script.enabled ? 'bg-green-600' : 'bg-gray-400'}`} />
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
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Script Name
                          </label>
                          <input
                            type="text"
                            value={script.name}
                            onChange={(e) => updateTrackingScript(index, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Google Analytics, Meta Pixel, etc."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Script Code
                          </label>
                          <textarea
                            value={script.script}
                            onChange={(e) => updateTrackingScript(index, 'script', e.target.value)}
                            rows={10}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
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
                          className="inline-flex items-center space-x-2 bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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

            {activeTab === 'leads' && (
              <div className="p-6">
                {/* Enhanced Stats Dashboard */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium opacity-90">Total Leads</p>
                        <p className="text-2xl font-bold">{leadStats.total}</p>
                      </div>
                      <Users className="w-8 h-8 opacity-80" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium opacity-90">Today</p>
                        <p className="text-2xl font-bold">{leadStats.today}</p>
                      </div>
                      <Activity className="w-8 h-8 opacity-80" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium opacity-90">This Week</p>
                        <p className="text-2xl font-bold">{leadStats.thisWeek}</p>
                      </div>
                      <Calendar className="w-8 h-8 opacity-80" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium opacity-90">This Month</p>
                        <p className="text-2xl font-bold">{leadStats.thisMonth}</p>
                      </div>
                      <TrendingUp className="w-8 h-8 opacity-80" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium opacity-90">Growth Rate</p>
                        <p className="text-2xl font-bold">{leadStats.recentGrowth > 0 ? '+' : ''}{leadStats.recentGrowth}%</p>
                      </div>
                      <BarChart3 className="w-8 h-8 opacity-80" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium opacity-90">Avg/Day</p>
                        <p className="text-2xl font-bold">{Math.round(leadStats.total / Math.max(1, Math.ceil((new Date().getTime() - new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime()) / (1000 * 60 * 60 * 24))))}</p>
                      </div>
                      <Clock className="w-8 h-8 opacity-80" />
                    </div>
                  </div>
                </div>

                {/* Team Size & Source Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Leads by Team Size</h3>
                    <div className="space-y-2">
                      {Object.entries(leadStats.byTeamSize).map(([teamSize, count]) => (
                        <div key={teamSize} className="flex items-center justify-between">
                          <span className="text-gray-700">{teamSize}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${(count / leadStats.total) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Leads by Source</h3>
                    <div className="space-y-2">
                      {Object.entries(leadStats.bySource).map(([source, count]) => (
                        <div key={source} className="flex items-center justify-between">
                          <span className="text-gray-700">{source}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{ width: `${(count / leadStats.total) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Search by name, email, or phone..."
                          value={leadFilters.search}
                          onChange={(e) => handleFilterChange('search', e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                          showFilters ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <Filter className="w-4 h-4" />
                        <span>Filters</span>
                      </button>

                      <button
                        onClick={() => setViewMode(viewMode === 'table' ? 'cards' : 'table')}
                        className="inline-flex items-center space-x-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
                      >
                        {viewMode === 'table' ? <BarChart3 className="w-4 h-4" /> : <Database className="w-4 h-4" />}
                        <span>{viewMode === 'table' ? 'Cards' : 'Table'}</span>
                      </button>

                      <button
                        onClick={fetchLeads}
                        disabled={loadingLeads}
                        className="inline-flex items-center space-x-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                      >
                        <RefreshCw className={`w-4 h-4 ${loadingLeads ? 'animate-spin' : ''}`} />
                        <span>Refresh</span>
                      </button>

                      <button
                        onClick={exportLeads}
                        className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export</span>
                      </button>
                    </div>
                  </div>

                  {/* Advanced Filters */}
                  {showFilters && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
                          <select
                            value={leadFilters.teamSize}
                            onChange={(e) => handleFilterChange('teamSize', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">All Team Sizes</option>
                            {uniqueTeamSizes.map(size => (
                              <option key={size} value={size}>{size}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                          <select
                            value={leadFilters.source}
                            onChange={(e) => handleFilterChange('source', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">All Sources</option>
                            {uniqueSources.map(source => (
                              <option key={source} value={source}>{source}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                          <select
                            value={leadFilters.dateRange}
                            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">All Time</option>
                            <option value="today">Today</option>
                            <option value="yesterday">Yesterday</option>
                            <option value="thisWeek">This Week</option>
                            <option value="lastWeek">Last Week</option>
                            <option value="thisMonth">This Month</option>
                            <option value="lastMonth">Last Month</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                          <input
                            type="date"
                            value={leadFilters.startDate}
                            onChange={(e) => handleFilterChange('startDate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={!!leadFilters.dateRange}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                          <input
                            type="date"
                            value={leadFilters.endDate}
                            onChange={(e) => handleFilterChange('endDate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={!!leadFilters.dateRange}
                          />
                        </div>

                        <div className="flex items-end">
                          <button
                            onClick={resetFilters}
                            className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                          >
                            Reset Filters
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sorting and Pagination Controls */}
                <div className="flex flex-col lg:flex-row justify-between items-center mb-4 gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">Sort by:</label>
                      <select
                        value={sortField}
                        onChange={(e) => setSortField(e.target.value as typeof sortField)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="createdAt">Registration Date</option>
                        <option value="firstName">First Name</option>
                        <option value="email">Email</option>
                      </select>
                    </div>

                    <button
                      onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                      className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {sortOrder === 'desc' ? <SortDesc className="w-4 h-4" /> : <SortAsc className="w-4 h-4" />}
                      <span className="text-sm">{sortOrder === 'desc' ? 'Desc' : 'Asc'}</span>
                    </button>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">Show:</label>
                      <select
                        value={leadPagination.limit}
                        onChange={(e) => setLeadPagination(prev => ({ ...prev, limit: parseInt(e.target.value), page: 1 }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                      <span className="text-sm text-gray-700">per page</span>
                    </div>
                  </div>
                </div>

                {/* Results Summary */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    Showing {((leadPagination.page - 1) * leadPagination.limit) + 1} to {Math.min(leadPagination.page * leadPagination.limit, leadPagination.total)} of {leadPagination.total} leads
                    {Object.values(leadFilters).some(filter => filter) && (
                      <span className="ml-2 text-blue-600">(filtered)</span>
                    )}
                  </p>
                </div>

                {/* Leads Content */}
                {loadingLeads ? (
                  <div className="text-center py-12">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading leads...</p>
                  </div>
                ) : leads.length > 0 ? (
                  <>
                    {viewMode === 'table' ? (
                      /* Table View */
                      <div className="bg-white rounded-lg shadow border overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  <input
                                    type="checkbox"
                                    checked={selectedLeads.length === leads.length}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedLeads(leads.map(lead => lead._id))
                                      } else {
                                        setSelectedLeads([])
                                      }
                                    }}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                  />
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Lead Details
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Contact Info
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Team Size
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Source
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Registered
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {leads.map((lead) => (
                                <tr key={lead._id} className="hover:bg-gray-50 transition-colors">
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                      type="checkbox"
                                      checked={selectedLeads.includes(lead._id)}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          setSelectedLeads([...selectedLeads, lead._id])
                                        } else {
                                          setSelectedLeads(selectedLeads.filter(id => id !== lead._id))
                                        }
                                      }}
                                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                      <div className="flex-shrink-0 h-10 w-10">
                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                          <span className="text-sm font-medium text-blue-800">
                                            {lead.firstName.charAt(0)}{lead.lastName.charAt(0)}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">
                                          {lead.firstName} {lead.lastName}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                          Lead ID: {lead._id.slice(-6)}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="space-y-1">
                                      <div className="flex items-center space-x-2">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-900">{lead.email}</span>
                                        <button
                                          onClick={() => copyToClipboard(lead.email)}
                                          className="text-blue-600 hover:text-blue-700"
                                        >
                                          <Copy className="w-3 h-3" />
                                        </button>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-900">+91 {lead.phone}</span>
                                        <button
                                          onClick={() => copyToClipboard(lead.phone)}
                                          className="text-blue-600 hover:text-blue-700"
                                        >
                                          <Copy className="w-3 h-3" />
                                        </button>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                                      {lead.teamSize}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                      {lead.source || 'Direct'}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div>
                                      {new Date(lead.createdAt).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                      })}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                      {new Date(lead.createdAt).toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                      })}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center space-x-2">
                                   <button
                                        onClick={() => {
                                          setSelectedLead(lead)
                                          setShowLeadModal(true)
                                        }}
                                        className="text-blue-600 hover:text-blue-700"
                                        title="View Details"
                                      >
                                        <Eye className="w-4 h-4" />
                                      </button>
                                      <a
                                        href={`mailto:${lead.email}?subject=Welcome to the Masterclass`}
                                        className="text-gray-600 hover:text-gray-700"
                                        title="Send Email"
                                      >
                                        <Mail className="w-4 h-4" />
                                      </a>
                                      <a
                                        href={`https://wa.me/91${lead.phone}?text=Hi ${lead.firstName}, thank you for registering!`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-600 hover:text-green-700"
                                        title="WhatsApp"
                                      >
                                        <MessageCircle className="w-4 h-4" />
                                      </a>
                                      <a
                                        href={`tel:+91${lead.phone}`}
                                        className="text-orange-600 hover:text-orange-700"
                                        title="Call"
                                      >
                                        <Phone className="w-4 h-4" />
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      /* Cards View */
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {leads.map((lead) => (
                          <div key={lead._id} className="bg-white rounded-lg shadow border p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                  <span className="text-lg font-medium text-blue-800">
                                    {lead.firstName.charAt(0)}{lead.lastName.charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-900">
                                    {lead.firstName} {lead.lastName}
                                  </h3>
                                  <p className="text-sm text-gray-500">
                                    {lead.teamSize}
                                  </p>
                                </div>
                              </div>
                              <input
                                type="checkbox"
                                checked={selectedLeads.includes(lead._id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedLeads([...selectedLeads, lead._id])
                                  } else {
                                    setSelectedLeads(selectedLeads.filter(id => id !== lead._id))
                                  }
                                }}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                            </div>

                            <div className="space-y-3 mb-4">
                              <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-700 flex-1 truncate">{lead.email}</span>
                                <button
                                  onClick={() => copyToClipboard(lead.email)}
                                  className="text-blue-600 hover:text-blue-700"
                                >
                                  <Copy className="w-3 h-3" />
                                </button>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-700">+91 {lead.phone}</span>
                                <button
                                  onClick={() => copyToClipboard(lead.phone)}
                                  className="text-blue-600 hover:text-blue-700"
                                >
                                  <Copy className="w-3 h-3" />
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                              <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                {lead.source || 'Direct'}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(lead.createdAt).toLocaleDateString()}
                              </span>
                            </div>

                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  setSelectedLead(lead)
                                  setShowLeadModal(true)
                                }}
                                className="flex-1 bg-blue-600 text-white text-center py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors"
                              >
                                View Details
                              </button>
                              <a
                                href={`https://wa.me/91${lead.phone}?text=Hi ${lead.firstName}, thank you for registering!`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-green-600 text-white text-center py-2 px-3 rounded text-sm hover:bg-green-700 transition-colors"
                              >
                                WhatsApp
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Pagination */}
                    <div className="mt-6 flex items-center justify-between">
                      <div className="text-sm text-gray-700">
                        Showing {((leadPagination.page - 1) * leadPagination.limit) + 1} to{' '}
                        {Math.min(leadPagination.page * leadPagination.limit, leadPagination.total)} of{' '}
                        {leadPagination.total} results
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setLeadPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                          disabled={leadPagination.page === 1}
                          className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span className="ml-1">Previous</span>
                        </button>

                        <div className="flex space-x-1">
                          {Array.from({ length: Math.min(5, leadPagination.totalPages) }, (_, i) => {
                            const pageNum = i + 1
                            return (
                              <button
                                key={pageNum}
                                onClick={() => setLeadPagination(prev => ({ ...prev, page: pageNum }))}
                                className={`px-3 py-2 border rounded-lg ${
                                  leadPagination.page === pageNum
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'border-gray-300 hover:bg-gray-50'
                                }`}
                              >
                                {pageNum}
                              </button>
                            )
                          })}
                        </div>

                        <button
                          onClick={() => setLeadPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                          disabled={leadPagination.page === leadPagination.totalPages}
                          className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="mr-1">Next</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Bulk Actions */}
                    {selectedLeads.length > 0 && (
                      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border px-6 py-4 z-50">
                        <div className="flex items-center space-x-4">
                          <span className="text-sm font-medium text-gray-700">
                            {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''} selected
                          </span>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                const emails = leads
                                  .filter(lead => selectedLeads.includes(lead._id))
                                  .map(lead => lead.email)
                                  .join(',')
                                window.open(`mailto:${emails}?subject=Welcome to the Masterclass`)
                              }}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Email All
                            </button>
                            <button
                              onClick={() => {
                                const csvData = leads
                                  .filter(lead => selectedLeads.includes(lead._id))
                                  .map(lead => ({
                                    'First Name': lead.firstName,
                                    'Last Name': lead.lastName,
                                    'Email': lead.email,
                                    'Phone': lead.phone,
                                    'Team Size': lead.teamSize,
                                    'Source': lead.source || 'Direct'
                                  }))

                                const csvString = [
                                  Object.keys(csvData[0]).join(','),
                                  ...csvData.map(row => Object.values(row).map(val => `"${val}"`).join(','))
                                ].join('\n')

                                const blob = new Blob([csvString], { type: 'text/csv' })
                                const url = window.URL.createObjectURL(blob)
                                const a = document.createElement('a')
                                a.href = url
                                a.download = `selected-leads-${new Date().toISOString().split('T')[0]}.csv`
                                a.click()
                                window.URL.revokeObjectURL(url)
                              }}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              Export Selected
                            </button>
                            <button
                              onClick={() => setSelectedLeads([])}
                              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                              Clear Selection
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <Users className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      {Object.values(leadFilters).some(filter => filter) ? 'No leads match your filters' : 'No leads yet'}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {Object.values(leadFilters).some(filter => filter)
                        ? 'Try adjusting your search criteria or filters.'
                        : 'Leads will appear here when visitors register through the enrollment form.'
                      }
                    </p>
                    {Object.values(leadFilters).some(filter => filter) && (
                      <div className="mt-4">
                        <button
                          onClick={resetFilters}
                          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                          <RefreshCw className="w-4 h-4" />
                          <span>Clear All Filters</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
