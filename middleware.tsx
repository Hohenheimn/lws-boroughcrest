import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export default async function middleware(req: NextRequest, res: NextResponse) {
    //preventing logging in if the cookie has no request
    const cookie = req.cookies.get("user");
    const url = req.url;

    if (!cookie && req.nextUrl.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    if (!cookie && req.nextUrl.pathname.startsWith("/project")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    if (!cookie && req.nextUrl.pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    if (!cookie && req.nextUrl.pathname.startsWith("/finance")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    //if the cookies is verified, redirect to the dashboard
    if (cookie && url.includes("/login")) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }
}
