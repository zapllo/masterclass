import dbConnect from '@/lib/mongodb'
import Admin from '@/lib/models/Admin'

async function createAdmin() {
  await dbConnect()
  
  try {
    const admin = new Admin({
      email: 'admin@example.com',
      password: 'admin123',
      name: 'Admin User'
    })
    
    await admin.save()
    console.log('Admin user created successfully')
    console.log('Email: admin@example.com')
    console.log('Password: admin123')
  } catch (error) {
    console.error('Error creating admin:', error)
  }
  
  process.exit(0)
}

createAdmin()