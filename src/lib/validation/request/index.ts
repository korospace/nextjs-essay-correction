import { z } from "zod";

export const UserInputValidation = z.object({
  username: z
    .string()
    .min(5, "Username must be at least 5 characters long")
    .max(50, "Username cannot be more than 50 characters"),
  password: z
    .string()
    .min(5, "Password must be at least 5 characters long")
    .max(50, "Password cannot be more than 50 characters"),
  full_name: z
    .string()
    .min(1, "Full name cannot be empty")
    .max(255, "Full name cannot be more than 255 characters"),
});

export const UserUpdateValidation = z.object({
  username: z
    .string()
    .min(5, "Username must be at least 5 characters long")
    .max(50, "Username cannot be more than 50 characters"),
  password: z
    .string()
    .min(5, "Password must be at least 5 characters long")
    .max(50, "Password cannot be more than 50 characters")
    .optional(),
  full_name: z
    .string()
    .min(1, "Full name cannot be empty")
    .max(255, "Full name cannot be more than 255 characters"),
});

export const CourseInputValidation = z.object({
  name: z.string().max(255, "Name cannot be more than 255 characters"),
  description: z
    .string()
    .max(255, "Description cannot be more than 255 characters"),
});
