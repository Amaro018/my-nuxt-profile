import 'dotenv/config'
import  db  from '..'
import { users } from '../schema/user-schema'

async function main() {
  // Insert or update an admin account
  await db
    .insert(users)
    .values({
      name: 'JHOMARI AMARO',
      email: 'jhomari.amaro@gmail.com',
      password:
        '$2a$12$8.2ZyzDFTq3V2gN62zBA6erMgoJlMCXxev78i7BxdddDrIFu9LHva',
      role: 'admin'
    })
    // 🔑 Turso/SQLite equivalent of MySQL's `ON DUPLICATE KEY UPDATE`
    .onConflictDoUpdate({
      target: users.email, // column with UNIQUE constraint
      set: {
        name: 'Admin',
        password:
          '$2a$12$8.2ZyzDFTq3V2gN62zBA6erMgoJlMCXxev78i7BxdddDrIFu9LHva',
      }
    })
}

;(async () => {
  try {
    await main()
    console.log('🌱 Seed complete')
    process.exit(0)
  } catch (err) {
    console.error('❌ Seed failed:', err)
    process.exit(1)
  }
})()
