// nextjs
import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

const authPage: string[]    = [
  "/login"
];
const onlyAdmin: string[]   = [
];
const onlyTeacher: string[] = [
];

export default function PageMiddleware(
  middleware: NextMiddleware,
  requiredAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    if (pathname == "/") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (requiredAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.APP_KEY,
      });

      if (!token && !authPage.includes(pathname)) {
        const url = new URL("/login", req.url);

        url.searchParams.set("callbackUrl", encodeURI(req.url));

        return NextResponse.redirect(url);
      }

      if (token) {
        if (authPage.includes(pathname)) {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }

        if (token?.role !== "admin" && onlyAdmin.includes(pathname)) {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }

        if (token?.role !== "teacher" && onlyTeacher.includes(pathname)) {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
      }
    }

    return middleware(req, next);
  };
}