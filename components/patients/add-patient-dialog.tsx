"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  patientSchema,
  PatientFormValues,
} from "@/lib/validators/patient"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"


import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"


export function AddPatientDialog({
  open,
  onClose,
  onAdded,
}: {
  open: boolean
  onClose: () => void
  onAdded: () => void
}) {
  const [loading, setLoading] = useState(false)

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      birthDate: "",
    },
  })

  async function onSubmit(values: PatientFormValues) {
    setLoading(true)

    const res = await fetch("/api/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })

    setLoading(false)

    if (!res.ok) {
      // Optional: show toast later
      return
    }

    form.reset()
    onAdded()
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Patient</DialogTitle>
        </DialogHeader>

        <form
              id="add-patient-form"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FieldGroup>
                {/* First Name */}
                <Controller
                  name="firstName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>First Name</FieldLabel>
                      <Input
                        {...field}
                        placeholder="Juan"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                        />
                      )}
                    </Field>
                  )}
                />

                {/* Last Name */}
                <Controller
                  name="lastName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Last Name</FieldLabel>
                      <Input
                        {...field}
                        placeholder="Dela Cruz"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                        />
                      )}
                    </Field>
                  )}
                />

                {/* Birth Date */}
                <Controller
                  name="birthDate"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel>Date of Birth</FieldLabel>
                      <Input type="date" {...field} />
                    </Field>
                  )}
                />
              </FieldGroup>


              <div className="flex justify-end space-x-2 mt-10">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => form.reset()}
                    >
                      Reset
                    </Button>

                    <Button
                      type="submit"
                      form="add-patient-form"
                    >
                      Save Patient
                    </Button>

              </div>

              

            </form>
      </DialogContent>
    </Dialog>
  )
}
