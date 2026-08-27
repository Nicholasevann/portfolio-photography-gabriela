import { NextRequest, NextResponse } from "next/server";
import * as cookie from "cookie";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;
    const adminPassword =
      process.env.ADMIN_PASSWORD || process.env.PAGE_ACCESS_PASSWORD || "password";

    if (password === adminPassword) {
      const response = NextResponse.json({ success: true, message: "Authenticated" }, { status: 200 });

      response.headers.set(
        "Set-Cookie",
        cookie.serialize("authToken", "authenticated", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24 * 7, // 7 days
          sameSite: "lax",
          path: "/",
        }),
      );

      return response;
    } else {
      return NextResponse.json({ success: false, message: "Invalid password" }, { status: 401 });
    }
  } catch (err) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
