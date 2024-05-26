// nextjs
import { NextRequest } from "next/server";
// helpers
import { ResponseFormating } from "@/lib/helpers/helpers";
// services
import { CreateAdmin } from "@/lib/services/mysql/user";
// validation request
import { UserInputValidation } from "@/lib/validation/request";

/**
 * Create Admin
 * -------------------------
 */
export async function POST(request: NextRequest) {
  const req = await request.json();

  // validation
  const validationResult = UserInputValidation.safeParse(req)

  if (!validationResult.success) {
    return ResponseFormating.json("validation failed", 400, ResponseFormating.zodErrors(validationResult.error))
  }

  // logic
  const res = await CreateAdmin(req)
  return ResponseFormating.json(res.message, res.code, res.data)
}