import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      name: string
      email?: string | null
      doctorId?: string | null
      subscription?: string | null
    }
  }

  interface User {
    id: string
    role: string
    name: string
    email?: string | null
    doctorId?: string | null
    subscription?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
    name: string
    doctorId?: string | null
    subscription?: string | null
  }
}
