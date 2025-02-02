import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { validateSession } from "@/lib/auth"
import { cookies } from "next/headers"

const prisma = new PrismaClient()

async function authenticateRequest(): Promise<string | null> {
  try {
    const cookieStore = cookies()
    const sessionId = cookieStore.get("sessionId")?.value

    if (!sessionId) {
      return null
    }

    return validateSession(sessionId)
  } catch (error) {
    console.error("Authentication error:", error)
    return null
  }
}

export async function GET(request: Request) {
  const userId = await authenticateRequest()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (id) {
      const content = await prisma.content.findUnique({ where: { id } })
      return NextResponse.json(content)
    } else {
      const contents = await prisma.content.findMany()
      return NextResponse.json(contents)
    }
  } catch (error) {
    console.error("Content fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const userId = await authenticateRequest()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { title, body, slug, status, type } = await request.json()
    const content = await prisma.content.create({
      data: { title, body, slug, status, type },
    })
    return NextResponse.json(content)
  } catch (error) {
    console.error("Content creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const userId = await authenticateRequest()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id, title, body, slug, status, type } = await request.json()
    const content = await prisma.content.update({
      where: { id },
      data: { title, body, slug, status, type },
    })
    return NextResponse.json(content)
  } catch (error) {
    console.error("Content update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const userId = await authenticateRequest()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    await prisma.content.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Content deletion error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

