import { z } from 'zod'

// These schemas are for UX only. The server MUST re-validate everything:
// client-side validation can always be bypassed.

const email = z
  .string()
  .trim()
  .min(1, 'Email is required')
  .max(254, 'Email is too long')
  .email('Enter a valid email address')

const name = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .max(50, `${label} is too long`)
    .regex(/^[\p{L}\p{M}' .-]+$/u, `${label} can only contain letters`)

export const loginSchema = z.object({
  email,
  password: z.string().min(1, 'Password is required').max(128, 'Password is too long'),
})

export const registerSchema = z.object({
  firstName: name('First name'),
  lastName: name('Last name'),
  email,
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9 ()-]{7,20}$/, 'Enter a valid phone number'),
  password: z
    .string()
    .min(10, 'Use at least 10 characters')
    .max(128, 'Password is too long')
    .regex(/[a-z]/, 'Add a lowercase letter')
    .regex(/[A-Z]/, 'Add an uppercase letter')
    .regex(/[0-9]/, 'Add a number'),
  acceptTerms: z.boolean().refine((v) => v === true, 'You must accept the terms to continue'),
})

export type LoginValues = z.infer<typeof loginSchema>
export type RegisterValues = z.infer<typeof registerSchema>
