import { NextResponse } from "next/server";
import * as cookie from "cookie";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out" }, { status: 200 });

  response.headers.set(
    "Set-Cookie",
    cookie.serialize("authToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
      sameSite: "lax",
      path: "/",
    }),
  );

  return response;
}
