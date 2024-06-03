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
  id_user: z.number(),
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

export const CourseUpdateValidation = z.object({
  id_course: z.number(),
  name: z.string().max(255, "Name cannot be more than 255 characters"),
  description: z
    .string()
    .max(255, "Description cannot be more than 255 characters"),
});

const isValidDateFormat = (value: string) => {
  const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
  return regex.test(value);
};

export const ExamInputValidation = z.object({
  id_course: z
    .number()
    .max(99999999999, "Duration cannot be more than 11 digit"),
  title: z.string().max(255, "Title cannot be more than 255 characters"),
  description: z
    .string()
    .max(255, "Description cannot be more than 255 characters"),
  start_date: z.string().refine(isValidDateFormat, {
    message: "Invalid start date format. Please use yyyy-mm-dd H:i format",
  }),
  end_date: z.string().refine(isValidDateFormat, {
    message: "Invalid end date format. Please use yyyy-mm-dd H:i format",
  }),
  duration: z
    .number()
    .max(99999999999, "Duration cannot be more than 11 digit"),
});
