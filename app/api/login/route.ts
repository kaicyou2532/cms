import { NextResponse } from "next/server"
import { validateCredentials, createSession } from "@/lib/auth"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    // Special handling for root user
    if (username === "root" && password === "root") {
      const sessionId = `root-${Date.now()}`

      cookies().set("sessionId", sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60, // 24 hours
        path: "/",
      })

      return NextResponse.json({ message: "Logged in successfully" })
    }

    // Regular user authentication
    const userId = await validateCredentials(username, password)
    if (!userId) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const sessionId = await createSession(userId)

    cookies().set("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
      path: "/",
    })

    return NextResponse.json({ message: "Logged in successfully" })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

