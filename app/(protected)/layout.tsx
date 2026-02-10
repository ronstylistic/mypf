import { ReactNode } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/nav/navbar-items"

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <>
        <Navbar />
        <main className="min-h-screen">{children}</main>
    </>  
  )
}
