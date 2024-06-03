// nextjs
import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { MiddlewareFactoryType } from "../types/ResultTypes";

/**
 * MIDDLEWARE PATH
 * ----------------------------
 */
const authPage: string[] = ["/login"];
const onlyAdmin: string[] = [
  "/dashboard/admin",
  "/dashboard/teacher",
  "/dashboard/student",
  "/dashboard/courses",
];
const onlyTeacher: string[] = [];
const requiredPath: string[] = [
  ...authPage,
  ...onlyAdmin,
  "/",
  "/logout",
  "/notfound",
  "/dashboard",
  "/dashboard/ujian",
  "/dashboard/profile",
];

/**
 * MIDDLEWARE RULES
 * ----------------------------
 */
const PageMiddleware: MiddlewareFactoryType = (middleware: NextMiddleware) => {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    if (requiredPath.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.APP_KEY,
      });

      if (pathname == "/") {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      if (!token && !authPage.includes(pathname)) {
        const url = new URL("/login", req.url);

        url.searchParams.set("callbackUrl", encodeURI(req.url));

        return NextResponse.redirect(url);
      }

      if (token) {
        if (authPage.includes(pathname)) {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }

        if (token?.id_user_role !== 1 && onlyAdmin.includes(pathname)) {
          return NextResponse.redirect(new URL("/notfound", req.url));
        }
      }
    }

    return middleware(req, next);
  };
};

export default PageMiddleware;
