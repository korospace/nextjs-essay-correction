import { z } from "zod";

export const UserInputValidation = z.object({
    username: z.string()
        .min(5, "Username must be at least 5 characters long")
        .max(50, "Username cannot be more than 50 characters"),
    password: z.string()
        .min(5, "Password must be at least 5 characters long")
        .max(50, "Password cannot be more than 50 characters"),
    full_name: z.string()
        .min(1, "Full name cannot be empty")
        .max(255, "Full name cannot be more than 255 characters"),
});