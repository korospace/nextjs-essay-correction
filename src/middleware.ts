// nextjs
import { NextRequest, NextResponse } from "next/server";
// middlewares
import { PageMiddleware } from "./lib/middlewares";

export function Middleware(request: NextRequest) {
  const res = NextResponse.next();
  return res;
}

export default PageMiddleware(Middleware, [
  "/login",
  "/dashboard",
]);