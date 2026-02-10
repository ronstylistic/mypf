import { getAuthSession } from "@/lib/auth"

export default async function SettingsPage() {
 // const session = await getAuthSession()

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Settings
      </h2>

      <div className="space-y-2 text-sm">
       {/*  <p>Email: {session?.user.email}</p>
        <p>Role: {session?.user.role}</p>
        <p>
          Subscription: {session?.user.subscription}
        </p> */}
      </div>
    </div>
  )
}
