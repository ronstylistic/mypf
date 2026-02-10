import { z } from "zod"

export const patientSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name too long"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name too long"),

  birthDate: z
    .string()
    .optional()
    .refine(
      (val) => !val || !isNaN(Date.parse(val)),
      "Invalid date"
    ),
})

export type PatientFormValues = z.infer<
  typeof patientSchema
>
