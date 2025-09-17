import mongoose, { Document, Schema } from 'mongoose'

export interface ILead extends Document {
  firstName: string
  lastName: string
  email: string
  phone: string
  teamSize: string
  session: string
  source?: string
  createdAt: Date
  updatedAt: Date
}

const LeadSchema = new Schema<ILead>({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  teamSize: {
    type: String,
    required: true
  },
  session: {
    type: String,
  },
  source: {
    type: String,
    default: 'enrollment-form'
  }
}, {
  timestamps: true
})

export default mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema)
