import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Admin from '@/lib/models/Admin'
import { signToken } from '@/lib/auth'

interface LoginRequest {
  email: string
  password: string
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const { email, password }: LoginRequest = await request.json()

    const admin = await Admin.findOne({ email })
    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const isValid = await admin.comparePassword(password)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = signToken({ 
      adminId: admin._id.toString(), 
      email: admin.email,
      name: admin.name 
    })

    return NextResponse.json({ 
      token, 
      admin: { 
        id: admin._id.toString(), 
        email: admin.email, 
        name: admin.name 
      } 
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}