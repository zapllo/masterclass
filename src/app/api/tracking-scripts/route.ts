import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Content from '@/lib/models/Content'

// Define the tracking script type
interface TrackingScript {
  enabled: boolean
  name?: string
  script?: string
  // Add other properties as needed based on your schema
}

export async function GET() {
  try {
    await dbConnect()
    const content = await Content.findOne()
    
    if (!content) {
      return NextResponse.json({ trackingScripts: [] })
    }
    
    // Return only enabled scripts for the frontend
    const enabledScripts = content.trackingScripts.filter((script: TrackingScript) => script.enabled)
    
    return NextResponse.json({ trackingScripts: enabledScripts })
  } catch (error) {
    console.error('Get tracking scripts error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}