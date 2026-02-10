"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Patient = {
  id: string
  firstName: string
  lastName: string
  birthDate?: string
}

export const patientColumns: ColumnDef<Patient>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "birthDate",
    header: "Date of Birth",
    cell: ({ row }) => {
      const value = row.original.birthDate
      return value
        ? new Date(value).toLocaleDateString()
        : "-"
    },
  },
]
