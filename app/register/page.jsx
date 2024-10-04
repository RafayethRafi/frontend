'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import useAuth from '@/lib/hooks/useAuth'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1, 'Name is required'),
  phone: z.string().optional(),
})

export default function RegistrationPage() {
  const [serverError, setServerError] = useState('')
  const router = useRouter()
  const { login, authenticated } = useAuth()
  const api = process.env.NEXT_PUBLIC_API_URL

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  })

  useEffect(() => {
    if (authenticated) {
      router.push('/')
    }
  }, [authenticated, router])

  const onSubmit = async (data) => {
    setServerError('')
    try {
      const response = await fetch(`${api}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const responseData = await response.json()
      if (response.ok) {
        login(responseData?.access_token, responseData)
        router.push('/')
      } else {
        setServerError(responseData.message || 'Registration failed. Please try again.')
      }
    } catch (err) {
      console.error(err)
      setServerError('An unexpected error occurred. Please try again later.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Register</CardTitle>
        </CardHeader>
        <CardContent>
          {serverError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              {['email', 'name', 'password', 'phone'].map((field) => (
                <div key={field} className="space-y-2">
                  <Label htmlFor={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </Label>
                  <Input
                    id={field}
                    type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                    {...register(field)}
                    placeholder={`Enter your ${field}`}
                    aria-invalid={errors[field] ? 'true' : 'false'}
                  />
                  {errors[field] && (
                    <Alert variant="destructive">
                      <AlertDescription>
                        {errors[field]?.message}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              ))}
              <Button className="w-full" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  'Register'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Login here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}