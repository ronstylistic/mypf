import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.MYPF_DATABASE_URL
  },
  migrations: {
    path: 'prisma/migrations'
  },
})