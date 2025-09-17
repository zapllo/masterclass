import mongoose, { Document, Schema } from 'mongoose'

export interface ITestimonial {
  id: string
  name: string
  quote: string
  thumbnail: string
  videoUrl: string
}

export interface IBonus {
  id: string
  title: string
  description: string
  value: string
  image: string
  icon: string
}

export interface IDynamicHeading {
  id: string
  key: string
  mainHeading: string
  subHeading: string
  description: string
  oldWay?: string
  newWay?: string
  price?: string
  originalPrice?: string
  enrollLink?: string
  createdAt: Date
}

// Add interface for tracking scripts
export interface ITrackingScript {
  id: string
  name: string
  script: string
  enabled: boolean
}

export interface IWhatsAppTemplate {
  templateName: string
  variable1: string // Session info placeholder
  variable2: string // WhatsApp group link
  variable3: string // Website link
}

export interface IThankYouPage {
  videoUrl: string
  videoPoster: string
  whatsappGroupLink: string
}

export interface IContent extends Document {
  // Default Pricing (fallback)
  price: string
  originalPrice: string
  enrollLink: string

  // Event Details
  eventDate: string
  eventTime: string
  eventLocation: string
  eventLanguage: string
  eventDeadline: Date // This will be used for countdown

  // Hero Video
  heroVideoUrl: string
  heroVideoPoster: string

  // Testimonial Videos
  testimonials: ITestimonial[]

  // Bonuses
  bonuses: IBonus[]
  bonusHeroImage: string
  bonusTotalValue: string

  // WhatsApp Template Settings
  whatsappTemplate: IWhatsAppTemplate

  // Thank You Page Settings
  thankYouPage: IThankYouPage

  // Tracking Scripts
  trackingScripts: ITrackingScript[]
  dynamicHeadings: IDynamicHeading[]
  // Metadata
  updatedAt: Date
  createdAt: Date
}

const TestimonialSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  quote: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  }
})

const BonusSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: "🎁"
  }
})

// Add schema for tracking scripts
const TrackingScriptSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  script: {
    type: String,
    required: true
  },
  enabled: {
    type: Boolean,
    default: true
  }
})

const WhatsAppTemplateSchema = new Schema({
  templateName: { type: String, default: 'masterclass_registration' },
  variable1: { type: String, default: '{{SESSION_INFO}}' },
  variable2: { type: String, default: 'https://chat.whatsapp.com/BCgURzYeQZb1PB96uKvxjd?mode=ems_copy_t' },
  variable3: { type: String, default: 'https://zapllo.com' }
})

const ThankYouPageSchema = new Schema({
  videoUrl: { type: String, default: 'https://lp.launchatscale.com/wp-content/uploads/2025/06/C3926-YT.mp4' },
  videoPoster: { type: String, default: 'https://lp.launchatscale.com/wp-content/uploads/2024/05/Shubh-Jain-thum1-1-1.avif' },
  whatsappGroupLink: { type: String, default: 'https://chat.whatsapp.com/BCgURzYeQZb1PB96uKvxjd?mode=ems_copy_t' }
})

const ContentSchema = new Schema<IContent>({
  // Default Pricing (fallback)
  price: {
    type: String,
    default: '₹99'
  },
  originalPrice: {
    type: String,
    default: '₹999'
  },
  enrollLink: {
    type: String,
    default: 'https://pages.razorpay.com/hts-fbspecial'
  },

  // Event Details
  eventDate: {
    type: String,
    default: '29th – 31st Aug'
  },
  eventTime: {
    type: String,
    default: '7 PM – 9 PM'
  },
  eventLocation: {
    type: String,
    default: 'Zoom'
  },
  eventLanguage: {
    type: String,
    default: 'English'
  },
  eventDeadline: {
    type: Date,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
  },

  dynamicHeadings: [{
    id: String,
    key: String,
    mainHeading: String,
    subHeading: String,
    description: String,
    oldWay: String,
    newWay: String,
    price: String,
    originalPrice: String,
    enrollLink: String,
    createdAt: { type: Date, default: Date.now }
  }],

  // Hero Video
  heroVideoUrl: { type: String, default: 'https://lp.launchatscale.com/wp-content/uploads/2025/06/C3926-YT.mp4' },
  heroVideoPoster: { type: String, default: 'https://lp.launchatscale.com/wp-content/uploads/2024/05/Shubh-Jain-thum1-1-1.avif' },
  // Testimonial Videos
  testimonials: {
    type: [TestimonialSchema],
    default: []
  },

  // Bonuses
  bonuses: {
    type: [BonusSchema],
    default: []
  },
  bonusHeroImage: {
    type: String,
    default: 'https://lp.launchatscale.com/wp-content/uploads/2025/02/9222d943181e28e25f5b5afe9ad302d5_1200_80-1024x576.webp'
  },
  bonusTotalValue: {
    type: String,
    default: '₹1,08,000'
  },
  // WhatsApp Template Settings
  whatsappTemplate: { type: WhatsAppTemplateSchema, default: () => ({}) },

  // Thank You Page Settings
  thankYouPage: { type: ThankYouPageSchema, default: () => ({}) },

  // Tracking Scripts
  trackingScripts: {
    type: [TrackingScriptSchema],
    default: []
  }
}, {
  timestamps: true
})

export default mongoose.models.Content || mongoose.model<IContent>('Content', ContentSchema)
