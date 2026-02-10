import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthSession } from "@/lib/auth"
import { doctorScope } from "@/lib/rbac"

export async function GET() {
  const session = await getAuthSession()
  if (!session) return NextResponse.json([], { status: 401 })

  const doctorId = doctorScope(session)

  const patients = await prisma.patient.findMany({
    where: { doctorId },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(patients)
}

export async function POST(req: Request) {
  const session = await getAuthSession()
  if (!session) return NextResponse.json({}, { status: 401 })

  const doctorId = doctorScope(session)
  const { name, birthday } = await req.json()

  if (!name) {
    return NextResponse.json(
      { error: "Name is required" },
      { status: 400 }
    )
  }

  const patient = await prisma.patient.create({
    data: {
      name,
      birthday: birthday ? new Date(birthday) : null,
      doctorId,
    },
  })

  return NextResponse.json(patient)
}
