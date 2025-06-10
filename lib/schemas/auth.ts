import { z } from "zod";

import type { User } from "~/lib/db/schema/auth";

// Base user validation schema derived from database schema
const baseUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
});

// Password validation (not stored in database, only for forms)
const passwordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Shared validation schemas for auth forms
export const authSchemas = {
  // Login form validation (same everywhere)
  login: z.object({
    email: baseUserSchema.shape.email,
    password: passwordSchema.shape.password,
  }),

  // Unified signup validation (same for dialog and pages)
  signup: baseUserSchema
    .extend({
      password: passwordSchema.shape.password,
      confirmPassword: z.string().min(6, "Please confirm your password"),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }),

  // User profile update (no password required)
  profileUpdate: baseUserSchema.partial(),

  // User creation (server-side, derived from database schema)
  userCreate: baseUserSchema.extend({
    id: z.string().optional(), // Will be generated server-side
    emailVerified: z.boolean().optional().default(false),
    image: z.string().url().optional(),
    admin: z.boolean().optional().default(false),
  }),
};

// Type exports for TypeScript
export type LoginFormData = z.infer<typeof authSchemas.login>;
export type SignupFormData = z.infer<typeof authSchemas.signup>;
export type ProfileUpdateData = z.infer<typeof authSchemas.profileUpdate>;
export type UserCreateData = z.infer<typeof authSchemas.userCreate>;

// Utility function to convert form data to database format
export function prepareUserForDatabase(
  formData: SignupFormData,
): Omit<UserCreateData, "id"> {
  return {
    name: formData.name,
    email: formData.email,
    emailVerified: false,
    admin: false,
  };
}

// Validation for existing user (ensure compatibility with database type)
export function validateUserData(user: unknown): user is User {
  const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    emailVerified: z.boolean(),
    image: z.string().nullable(),
    admin: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
  });

  return userSchema.safeParse(user).success;
}
