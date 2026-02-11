import { NextResponse } from "next/server"
import prisma  from "@/lib/prisma"
import { getAuthSession } from "@/lib/auth"
import { doctorScope } from "@/lib/rbac"

export async function GET() {
  const session = await getAuthSession()
  if (!session) return NextResponse.json([], { status: 401 })

  const doctorId = doctorScope(session)
  if (!doctorId) return NextResponse.json([], { status: 401 })

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
  if (!doctorId) {
    return NextResponse.json(
      { error: "Doctor ID is required" },
      { status: 401 }
    )
  }
  const { firstname, lastName, birthday } = await req.json()

  if (!firstname || !lastName) {
    return NextResponse.json(
      { error: "First name and last name are required" },
      { status: 400 }
    )
  }

  const patient = await prisma.patient.create({
    data: {
      // Replace 'name' with the correct field name as per your Prisma schema, e.g., 'fullName' or remove if not needed
      // fullName: name,
      firstName: firstname,
      lastName: lastName,
      birthday: birthday ? new Date(birthday) : null,
      doctorId,
    },
  })

  return NextResponse.json(patient)
}
