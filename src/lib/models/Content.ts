import mongoose, { Document, Schema } from 'mongoose'

export interface ITestimonial {
  id: string
  name: string
  quote: string
  thumbnail: string
  videoUrl: string
}

// Add interface for tracking scripts
export interface ITrackingScript {
  id: string
  name: string
  script: string
  enabled: boolean
}

export interface IContent extends Document {
  // Pricing
  price: string
  originalPrice: string
  enrollLink: string

  // Event Details
  eventDate: string
  eventTime: string
  eventLocation: string
  eventLanguage: string

  // Hero Video
  heroVideoUrl: string
  heroVideoPoster: string

  // Testimonial Videos
  testimonials: ITestimonial[]

  // Tracking Scripts
  trackingScripts: ITrackingScript[]
  // Deadline
  eventDeadline: Date

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

const ContentSchema = new Schema<IContent>({
  // Pricing
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

  // Hero Video
  heroVideoUrl: {
    type: String,
    default: 'https://lp.launchatscale.com/wp-content/uploads/2025/06/C3926-YT.mp4'
  },
  heroVideoPoster: {
    type: String,
    default: 'https://lp.launchatscale.com/wp-content/uploads/2024/05/Shubh-Jain-thum1-1-1.avif'
  },

  // Testimonial Videos
  testimonials: {
    type: [TestimonialSchema],
    default: []
  },

  // Tracking Scripts
  trackingScripts: {
    type: [TrackingScriptSchema],
    default: []
  },


  // Deadline
  eventDeadline: {
    type: Date,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
  }
}, {
  timestamps: true
})

export default mongoose.models.Content || mongoose.model<IContent>('Content', ContentSchema)