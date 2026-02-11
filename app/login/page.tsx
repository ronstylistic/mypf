"use client"
import { signIn } from "next-auth/react"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Controller, useForm } from "react-hook-form"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function Page() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (data: LoginFormValues) => {
    setError(null);

    startTransition(async () => {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password")
      } else {
        router.push("/dashboard");
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-95">
        <CardHeader>
          <h1 className="text-xl font-bold">
           Login
          </h1>
        </CardHeader>
        <CardContent className="space-y-4">

          <form
              id="login-form"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FieldGroup>
                
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Email</FieldLabel>
                      <Input
                        {...field}
                        placeholder="juan@example.com"
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

                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Password</FieldLabel>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter your password"
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
              </FieldGroup>
            </form>          
        </CardContent>

        <CardFooter>
        <Field orientation="responsive">
          <Button type="submit" form="login-form" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
          </Button>

           <p className="text-sm text-center">
            Don't have an account?{" "}
            <a href="/register" className="underline">
              Register
            </a>
          </p>

          {error && (
              <p className="text-sm text-red-600">
                {error}
              </p>
            )}
        </Field>
      </CardFooter>
      </Card>
    </div>
  )
}
