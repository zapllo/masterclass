import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Lead, { ILead } from '@/lib/models/Lead'
import Content from '@/lib/models/Content'
import { verifyToken, getTokenFromHeaders } from '@/lib/auth'

// Function to send WhatsApp message via Zapllo webhook
const sendWhatsAppWelcomeMessage = async (phoneNumber: string, eventDate: string, eventTime: string, leadInfo: any, whatsappSettings: any) => {
  const sessionInfo = `📅 ${eventDate} at ${eventTime}`

  const webhookPayload = {
    phoneNumber: phoneNumber,
    country: 'IN',
    templateName: whatsappSettings.templateName || 'masterclass_registration',
    mediaUrl: null,
    bodyVariables: [
      sessionInfo, // Variable 1: Session info (replaces {{SESSION_INFO}})
      whatsappSettings.variable2 || 'https://chat.whatsapp.com/BCgURzYeQZb1PB96uKvxjd?mode=ems_copy_t', // Variable 2: WhatsApp Group Link
      whatsappSettings.variable3 || 'https://zapllo.com' // Variable 3: Website Link
    ]
  }

  console.log('🚀 Starting WhatsApp message send process...')
  console.log('📊 Lead Information:', {
    leadId: leadInfo.id,
    firstName: leadInfo.firstName,
    lastName: leadInfo.lastName,
    email: leadInfo.email,
    phone: phoneNumber,
    teamSize: leadInfo.teamSize
  })
  console.log('📋 Event Details:', {
    eventDate,
    eventTime,
    formattedSessionInfo: sessionInfo
  })
  console.log('⚙️ WhatsApp Template Settings:', whatsappSettings)
  console.log('📦 Webhook Payload:', JSON.stringify(webhookPayload, null, 2))

  try {
    console.log('📡 Sending request to Zapllo webhook...')
    console.log('🌐 Webhook URL: https://zapllo.com/api/webhook')

    const startTime = Date.now()

    const response = await fetch('https://zapllo.com/api/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload)
    })

    const endTime = Date.now()
    const responseTime = endTime - startTime

    console.log('⏱️ Webhook Response Time:', `${responseTime}ms`)
    console.log('📈 Response Status:', response.status)
    console.log('📄 Response Status Text:', response.statusText)
    console.log('🔗 Response Headers:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      let errorData
      const contentType = response.headers.get('content-type')

      console.log('❌ WhatsApp webhook failed!')
      console.log('📋 Response Content-Type:', contentType)

      try {
        if (contentType && contentType.includes('application/json')) {
          errorData = await response.json()
          console.log('📄 Error Response JSON:', JSON.stringify(errorData, null, 2))
        } else {
          errorData = await response.text()
          console.log('📄 Error Response Text:', errorData)
        }
      } catch (parseError) {
        console.log('⚠️ Failed to parse error response:', parseError)
        errorData = 'Could not parse error response'
      }

      // Log detailed error information
      console.log('🔍 Detailed Error Analysis:')
      console.log('  - HTTP Status:', response.status)
      console.log('  - Status Text:', response.statusText)
      console.log('  - Lead Phone:', phoneNumber)
      console.log('  - Template Name:', webhookPayload.templateName)
      console.log('  - Country Code:', webhookPayload.country)
      console.log('  - Body Variables Count:', webhookPayload.bodyVariables.length)
      console.log('  - Body Variables:', webhookPayload.bodyVariables)
      console.log('  - Response Time:', `${responseTime}ms`)
      console.log('  - Timestamp:', new Date().toISOString())

      // Categorize error types
      if (response.status >= 400 && response.status < 500) {
        console.log('🚨 CLIENT ERROR (4xx): Issue with request data or authentication')

        if (response.status === 400) {
          console.log('💡 Bad Request - Possible issues:')
          console.log('  - Invalid phone number format')
          console.log('  - Missing required template variables')
          console.log('  - Template name not found:', webhookPayload.templateName)
          console.log('  - Invalid country code')
        } else if (response.status === 401) {
          console.log('💡 Unauthorized - Possible issues:')
          console.log('  - Missing or invalid API key')
          console.log('  - API key not configured in environment')
        } else if (response.status === 403) {
          console.log('💡 Forbidden - Possible issues:')
          console.log('  - API key doesn\'t have required permissions')
          console.log('  - Account limits reached')
        } else if (response.status === 404) {
          console.log('💡 Not Found - Possible issues:')
          console.log('  - Webhook endpoint URL is incorrect')
          console.log('  - Template name not found in Interakt:', webhookPayload.templateName)
        } else if (response.status === 429) {
          console.log('💡 Rate Limited - Possible issues:')
          console.log('  - Too many requests sent too quickly')
          console.log('  - Need to implement retry logic with backoff')
        }
      } else if (response.status >= 500) {
        console.log('🚨 SERVER ERROR (5xx): Issue with Zapllo/Interakt servers')
        console.log('💡 Possible issues:')
        console.log('  - Zapllo webhook server is down')
        console.log('  - Interakt API is experiencing issues')
        console.log('  - Temporary service outage')
      }

      throw new Error(`Webhook failed with status: ${response.status} - ${JSON.stringify(errorData)}`)
    }

    // Success case
    let result
    const successContentType = response.headers.get('content-type')

    try {
      if (successContentType && successContentType.includes('application/json')) {
        result = await response.json()
        console.log('✅ WhatsApp message sent successfully!')
        console.log('📄 Success Response JSON:', JSON.stringify(result, null, 2))
      } else {
        result = await response.text()
        console.log('✅ WhatsApp message sent successfully!')
        console.log('📄 Success Response Text:', result)
      }
    } catch (parseError) {
      console.log('⚠️ Success but failed to parse response:', parseError)
      result = { success: true, message: 'WhatsApp sent but response parse failed' }
    }

    console.log('📊 Success Summary:')
    console.log('  - Lead ID:', leadInfo.id)
    console.log('  - Phone Number:', phoneNumber)
    console.log('  - Template Name:', webhookPayload.templateName)
    console.log('  - Response Time:', `${responseTime}ms`)
    console.log('  - Timestamp:', new Date().toISOString())

    return result

  } catch (error: any) {
    console.log('💥 CRITICAL ERROR in WhatsApp sending process!')
    console.log('🔍 Error Details:')
    console.log('  - Error Type:', error.constructor.name)
    console.log('  - Error Message:', error.message)
    console.log('  - Error Stack:', error.stack)
    console.log('  - Lead ID:', leadInfo.id)
    console.log('  - Phone Number:', phoneNumber)
    console.log('  - Template Name:', webhookPayload.templateName)
    console.log('  - Timestamp:', new Date().toISOString())

    // Check for common error types
    if (error.message.includes('fetch')) {
      console.log('🌐 Network Error - Possible issues:')
      console.log('  - No internet connection')
      console.log('  - DNS resolution failed')
      console.log('  - Zapllo webhook URL is unreachable')
      console.log('  - Firewall blocking outbound requests')
    } else if (error.message.includes('timeout')) {
      console.log('⏱️ Timeout Error - Possible issues:')
      console.log('  - Request took too long to complete')
      console.log('  - Server is overloaded')
      console.log('  - Need to increase timeout duration')
    } else if (error.message.includes('JSON')) {
      console.log('📄 JSON Error - Possible issues:')
      console.log('  - Invalid JSON in request payload')
      console.log('  - Special characters in variables need escaping')
    }

    // Re-throw to be caught by calling function
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const leadData = await request.json()
    console.log('📥 Received lead registration request:', JSON.stringify(leadData, null, 2))

    // Validate required fields
    const { firstName, lastName, email, phone, teamSize } = leadData

    if (!firstName || !lastName || !email || !phone || !teamSize) {
      console.log('❌ Validation failed - missing required fields')
      console.log('📋 Received fields:', { firstName: !!firstName, lastName: !!lastName, email: !!email, phone: !!phone, teamSize: !!teamSize })
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    console.log('✅ Lead validation passed')

    // Get event details and WhatsApp settings from Content model
    console.log('📋 Fetching content settings from Content model...')
    const content = await Content.findOne()

    if (!content) {
      console.log('❌ No content found in database')
      return NextResponse.json({ error: 'Event details not found' }, { status: 500 })
    }

    console.log('✅ Content model data retrieved:', {
      eventDate: content.eventDate,
      eventTime: content.eventTime,
      eventLocation: content.eventLocation,
      whatsappTemplate: content.whatsappTemplate
    })

    // Create the lead first
    console.log('💾 Creating lead in database...')
    const lead = await Lead.create(leadData)
    console.log('✅ Lead created successfully with ID:', lead._id)

    // Send WhatsApp welcome message using settings from Content model
    console.log('📱 Initiating WhatsApp message send...')

    const leadInfo = {
      id: lead._id.toString(),
      firstName,
      lastName,
      email,
      teamSize
    }

    try {
      await sendWhatsAppWelcomeMessage(
        phone,
        content.eventDate || '29th Sep',
        content.eventTime || '7 PM – 9 PM',
        leadInfo,
        content.whatsappTemplate || {
          templateName: 'masterclass_registration',
          variable1: '{{SESSION_INFO}}',
          variable2: 'https://chat.whatsapp.com/BCgURzYeQZb1PB96uKvxjd?mode=ems_copy_t',
          variable3: 'https://zapllo.com'
        }
      )

      console.log('🎉 Complete success: Lead created and WhatsApp message sent!')

    } catch (whatsappError: any) {
      console.log('🚨 WhatsApp sending failed but lead was created successfully')
      console.log('📋 WhatsApp Error Summary:')
      console.log('  - Lead ID:', lead._id)
      console.log('  - Phone:', phone)
      console.log('  - Error:', whatsappError.message)
      console.log('  - Time:', new Date().toISOString())

      // Could implement retry logic here in the future
      console.log('💡 Consider implementing retry logic for failed WhatsApp sends')
    }

    const responseData = {
      success: true,
      leadId: lead._id,
      message: 'Registration successful! Check your WhatsApp for event details.',
      eventDetails: {
        date: content.eventDate,
        time: content.eventTime,
        location: content.eventLocation
      }
    }

    console.log('📤 Sending response to client:', JSON.stringify(responseData, null, 2))
    return NextResponse.json(responseData)

  } catch (error: any) {
    console.log('💥 CRITICAL ERROR in lead creation process!')
    console.log('🔍 Error Details:')
    console.log('  - Error Type:', error.constructor.name)
    console.log('  - Error Message:', error.message)
    console.log('  - Error Stack:', error.stack)
    console.log('  - Timestamp:', new Date().toISOString())

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const token = getTokenFromHeaders(request)
    if (!token) {
      console.log('❌ GET /api/leads - No authentication token provided')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      console.log('❌ GET /api/leads - Invalid authentication token')
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    console.log('✅ GET /api/leads - Authentication successful')

    const leads = await Lead.find().sort({ createdAt: -1 })
    console.log(`📊 Retrieved ${leads.length} leads from database`)

    return NextResponse.json(leads)
  } catch (error: any) {
    console.log('💥 ERROR in GET /api/leads:')
    console.log('  - Error:', error.message)
    console.log('  - Stack:', error.stack)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
