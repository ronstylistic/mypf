"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  patientColumns,
} from "@/components/patients/patient-columns"
import { AddPatientDialog } from "@/components/patients/add-patient-dialog"
import { DataTable } from "@/components/ui/data-table"

type Patient = {
  id: string
  firstName: string
  lastName: string
  birthDate?: string
}

export default function PatientsPage() {
  const [data, setData] = useState<Patient[]>([])
  const [open, setOpen] = useState(false)

  async function loadPatients() {
    const res = await fetch("/api/patients")
    const patients = await res.json()
    setData(patients)
  }

  useEffect(() => {
    loadPatients()
  }, [])

  return (
    <section className="bg-white py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Patients</h2>
          <Button onClick={() => setOpen(true)}>
            Add Patient
          </Button>
        </div>

        <DataTable columns={patientColumns} data={data} />

      </div>
      

      <AddPatientDialog
        open={open}
        onClose={() => setOpen(false)}
        onAdded={loadPatients}
      />
    </section>
  )
}
