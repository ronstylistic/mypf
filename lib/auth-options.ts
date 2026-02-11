import type { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) return null

        const valid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        )

        if (!valid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          doctorId: user.doctorId,
          subscription: user.subscription,
        }
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
        token.email = (user as any).email
        token.name = (user as any).name
        token.doctorId = (user as any).doctorId
        token.subscription = (user as any).subscription
      }
      return token
    },
    session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
        role: token.role,
        doctorId: token.doctorId,
        subscription: token.subscription,
      } as any
      return session
    },
  },

  pages: {
    signIn: "/login",
  },
}
