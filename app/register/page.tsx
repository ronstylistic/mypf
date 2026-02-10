"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Page() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  async function handleRegister() {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error || "Registration failed")
      return
    }

    router.push("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-95">
        <CardHeader>
          <h1 className="text-xl font-bold">
            Create Account
          </h1>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          <Button className="w-full" onClick={handleRegister}>
            Register
          </Button>

          <p className="text-sm text-center">
            Already have an account?{" "}
            <a href="/login" className="underline">
              Login
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
