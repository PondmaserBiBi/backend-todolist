// config/prisma.js
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error']
})

// Test connection
prisma.$connect()
    .then(() => {
        console.log('✅ Prisma connected to database')
    })
    .catch((error) => {
        console.error('❌ Prisma connection error:', error)
    })

module.exports = prisma