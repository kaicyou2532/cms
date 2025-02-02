import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { validateApiKey } from "@/lib/auth"

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const apiKey = request.headers.get("x-api-key")
  if (!(await validateApiKey(apiKey))) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (id) {
    const content = await prisma.content.findUnique({ where: { id } })
    return NextResponse.json(content)
  } else {
    const contents = await prisma.content.findMany()
    return NextResponse.json(contents)
  }
}

export async function POST(request: Request) {
  const apiKey = request.headers.get("x-api-key")
  if (!(await validateApiKey(apiKey))) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 })
  }

  const { title, body, slug, status, type } = await request.json()
  const content = await prisma.content.create({
    data: { title, body, slug, status, type },
  })
  return NextResponse.json(content)
}

export async function PUT(request: Request) {
  const apiKey = request.headers.get("x-api-key")
  if (!(await validateApiKey(apiKey))) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 })
  }

  const { id, title, body, slug, status, type } = await request.json()
  const content = await prisma.content.update({
    where: { id },
    data: { title, body, slug, status, type },
  })
  return NextResponse.json(content)
}

export async function DELETE(request: Request) {
  const apiKey = request.headers.get("x-api-key")
  if (!(await validateApiKey(apiKey))) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 })
  }

  await prisma.content.delete({ where: { id } })
  return NextResponse.json({ success: true })
}