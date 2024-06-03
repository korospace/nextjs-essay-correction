// nextjs
import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";
// helpers
import { ResponseFormating } from "../helpers/helpers";
// types
import { MiddlewareFactoryType } from "../types/ResultTypes";

/**
 * MIDDLEWARE PATH
 * ----------------------------
 */
const onlyAdmin: string[] = [
  "/api/admin",
  "/api/teacher",
  "/api/student",
  "/api/courses/create",
  "/api/courses/update",
  "/api/courses/delete",
];
const onlyTeacher: string[] = [];
const requiredPath: string[] = [
  ...onlyAdmin,
  "api/courses",
  "/api/profile",
  "/api/ujian",
];

/**
 * MIDDLEWARE RULES
 * ----------------------------
 */
const ApiMiddleware: MiddlewareFactoryType = (middleware: NextMiddleware) => {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    if (requiredPath.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.APP_KEY,
      });

      if (!token) {
        return ResponseFormating.json("Unauthorized", 401);
      } else if (token) {
        if (token?.id_user_role !== 1 && onlyAdmin.includes(pathname)) {
          return ResponseFormating.json("Unauthorized", 401);
        }
      }
    }

    return middleware(req, next);
  };
};

export default ApiMiddleware;
