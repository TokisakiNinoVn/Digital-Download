// test-db.js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    await prisma.$connect()
    console.log('✅ Connected to database successfully!')
    
    // Test query
    const count = await prisma.merchant.count()
    console.log(`📊 Found ${count} merchants`)
  } catch (error) {
    console.error('❌ Database connection error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()