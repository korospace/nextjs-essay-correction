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
const noCallbackUrl: string[] = ["/logout", "/notfound"];
const onlyTeacher: string[] = [
  "/dashboard/exam/create",
  "/dashboard/exam/update",
];
const onlyAdmin: string[] = [
  "/dashboard/admin",
  "/dashboard/teacher",
  "/dashboard/student",
  "/dashboard/courses",
  ...onlyTeacher,
];
const requiredPath: string[] = [
  "/",
  "/dashboard",
  "/dashboard/exam",
  "/dashboard/profile",
  ...noCallbackUrl,
  ...authPage,
  ...onlyAdmin,
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

      // redirect to main page (login)
      if (pathname == "/") {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      // redirect to dashboard if loggedin
      if (token && authPage.includes(pathname)) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      // protect all page except login
      if (!token && !authPage.includes(pathname)) {
        const url = new URL("/login", req.url);

        if (!noCallbackUrl.includes(pathname)) {
          url.searchParams.set("callbackUrl", encodeURI(req.url));
        }

        return NextResponse.redirect(url);
      }

      if (token) {
        if (
          onlyTeacher.includes(pathname) &&
          token?.id_user_role !== 1 &&
          token?.id_user_role !== 2
        ) {
          return NextResponse.redirect(new URL("/notfound", req.url));
        }
        if (onlyAdmin.includes(pathname) && token?.id_user_role !== 1) {
          return NextResponse.redirect(new URL("/notfound", req.url));
        }
      }
    }

    return middleware(req, next);
  };
};

export default PageMiddleware;
