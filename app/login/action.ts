"use server"

import { loginUser } from "@/lib/service/register-service"

export async function loginAction(
  formData: FormData
) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
        await loginUser(email, password)
        return { success: true }
    } catch (error: any) {
        return { error: error.message }
    }
}