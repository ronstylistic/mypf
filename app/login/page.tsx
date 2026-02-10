"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Page() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleLogin() {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/dashboard",
    })

    if (res?.error) {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-95">
        <CardHeader>
          <h1 className="text-xl font-bold">Login</h1>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Email"
            value={email}
            onChange={(e:any) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e:any) => setPassword(e.target.value)}
          />
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          <Button className="w-full" onClick={handleLogin}>
            Sign in
          </Button>
          <p className="text-sm text-center">
            No account?{" "}
            <a href="/register" className="underline">
              Register
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
