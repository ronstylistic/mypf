"use server"

import { registerUser } from "@/lib/auth/auth-service"

export async function registerAction(
  formData: FormData
) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
        await registerUser(name,email, password)
        return { success: true }
    } catch (error: any) {
        return { error: error.message }
    }
}