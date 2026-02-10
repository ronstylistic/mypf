import { getAuthSession } from "@/lib/auth"

export default async function DashboardPage() {
  //const session = await getAuthSession()

  return (
    <section className="bg-white py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h2 className="text-2xl font-bold">
            Ronnel Bedana
       {/*  Welcome, {session?.user.email} */}
      </h2>

      <p className="text-muted-foreground mt-2">
     {/*    Role: {session?.user.role} */}
     Doctor
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <DashboardCard title="Patients" value="—" />
        <DashboardCard title="Admissions" value="—" />
        <DashboardCard title="Monthly PF" value="—" />
      </div>

      </div>
    </section>
  )
}

function DashboardCard({
  title,
  value,
}: {
  title: string
  value: string
}) {
  return (
    <div className="border rounded p-4">
      <p className="text-sm text-muted-foreground">
        {title}
      </p>
      <p className="text-xl font-bold mt-2">
        {value}
      </p>
    </div>
  )
}
