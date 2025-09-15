import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Admin from '@/lib/models/Admin'

export async function POST() {
  // Add a simple security check - you can remove this endpoint after seeding
  const isProduction = process.env.NODE_ENV === 'production'
  if (isProduction) {
    return NextResponse.json({ error: 'This endpoint is disabled in production' }, { status: 403 })
  }

  try {
    await dbConnect()
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@example.com' })
    if (existingAdmin) {
      return NextResponse.json({ 
        message: 'Admin user already exists',
        email: 'admin@launchatscale.com',
        note: 'You can login with the existing credentials'
      })
    }

    // Create new admin
    const admin = new Admin({
      email: 'admin@launchatscale.com',
      password: 'shubh@launchAtScale',
      name: 'Admin User'
    })

    await admin.save()
    
    return NextResponse.json({ 
      success: true,
      message: 'Admin user created successfully!',
      credentials: {
        email: 'admin@example.com',
        password: 'admin123'
      },
      warning: 'Please change the password after first login',
      loginUrl: '/admin'
    })
    
  } catch (error) {
    console.error('Error creating admin:', error)
    return NextResponse.json({ 
      error: 'Failed to create admin user',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// Also support GET for easy browser testing
export async function GET() {
  const isProduction = process.env.NODE_ENV === 'production'
  if (isProduction) {
    return NextResponse.json({ error: 'This endpoint is disabled in production' }, { status: 403 })
  }

  try {
    await dbConnect()
    
    const adminCount = await Admin.countDocuments()
    const adminExists = await Admin.findOne({ email: 'admin@example.com' })
    
    return NextResponse.json({
      totalAdmins: adminCount,
      defaultAdminExists: !!adminExists,
      message: adminExists 
        ? 'Default admin already exists. Use POST to create if needed.' 
        : 'No default admin found. Use POST to create one.',
      instructions: {
        createAdmin: 'Send POST request to this endpoint',
        loginUrl: '/admin',
        defaultCredentials: {
          email: 'admin@example.com',
          password: 'admin123'
        }
      }
    })
    
  } catch (error) {
    console.error('Error checking admin:', error)
    return NextResponse.json({ 
      error: 'Failed to check admin status',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}