import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import prisma  from "@/lib/prisma"

const JWT_SECRET = process.env.JWT_SECRET!

export async function registerUser(
  name: string,
  email: string,
  password: string
) {

  
  const existing = await prisma.user.findUnique({
    where: { email },
  })

  if (existing) {
    throw new Error("Email already registered")
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: "DOCTOR",
    },
  })

  return user
}

export async function loginUser(
  email: string,
  password: string
) {
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) throw new Error("Invalid credentials")

  const valid = await bcrypt.compare(
    password,
    user.passwordHash
  )

  if (!valid) throw new Error("Invalid credentials")

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  )

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  }
}
