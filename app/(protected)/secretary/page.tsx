import { getAuthSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function SecretaryPage() {
  //const session = await getAuthSession()

 /*  if (session?.user.role !== "DOCTOR") {
    redirect("/")
  } */

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Secretary
      </h2>
      <p>Invite / manage secretary here</p>
    </div>
  )
}
