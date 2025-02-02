import { NextResponse } from "next/server"
import { validateCredentials, generateApiKey } from "@/lib/auth"

export async function POST(request: Request) {
  const { username, password } = await request.json()
  if (await validateCredentials(username, password)) {
    const apiKey = await generateApiKey()
    return NextResponse.json({ apiKey })
  } else {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }
}

