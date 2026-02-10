
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: "DOCTOR" | "SECRETARY"
      doctorId?: string | null
      subscription: "FREE" | "PRO"
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: "DOCTOR" | "SECRETARY"
    doctorId?: string | null
    subscription: "FREE" | "PRO"
  }
}
