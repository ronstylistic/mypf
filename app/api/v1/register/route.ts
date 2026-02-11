import { NextResponse } from "next/server"
import { registerUser } from "@/lib/service/register-service"

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

  
    // 1️⃣ Validate input
    if (!email) {
      return NextResponse.json(
        { error: "Email are required" },
        { status: 400 }
      )
    }

    if (!password) {
      return NextResponse.json(
        { error: "Password are required" },
        { status: 400 }
      )
    }
    
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      )
    }

     if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      )
    }
    
    const result = await registerUser(name, email, password);

    // 5️⃣ Return success
    return NextResponse.json(
      {
        message: "Account created successfully",
        user: {
          name: result.name,
          email: result.email,
          role: result.role,
          subscription: result.subscription,       },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("REGISTER_ERROR", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
