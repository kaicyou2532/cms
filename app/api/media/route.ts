import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { validateSession } from "@/lib/auth"
import { cookies } from "next/headers"
import sharp from "sharp"

const prisma = new PrismaClient()

async function authenticateRequest() {
  const cookieStore = cookies()
  const sessionId = cookieStore.get("sessionId")?.value

  if (!sessionId) {
    return null
  }

  return validateSession(sessionId)
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
      const media = await prisma.content.findUnique({
        where: {
          id,
          type: "media",
        },
        include: {
          tags: true,
        },
      })
      return NextResponse.json(media)
    } else {
      const media = await prisma.content.findMany({
        where: {
          type: "media",
        },
        include: {
          tags: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
      return NextResponse.json(media)
    }
  } catch (error) {
    console.error("Media fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const userId = await authenticateRequest()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const title = formData.get("title") as string
    const tags = (formData.get("tags") as string)?.split(",").filter(Boolean) || []

    if (!file || !title) {
      return NextResponse.json({ error: "File and title are required" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const image = sharp(buffer)
    const metadata = await image.metadata()

    const content = await prisma.content.create({
      data: {
        title,
        body: "", // For media files, body might be empty or contain metadata
        slug: title.toLowerCase().replace(/\s+/g, "-"),
        type: "media",
        fileType: file.type.split("/")[0],
        fileSize: file.size,
        mimeType: file.type,
        dimensions: metadata.width && metadata.height ? `${metadata.width} x ${metadata.height}` : null,
        tags: {
          connectOrCreate: tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
      include: {
        tags: true,
      },
    })

    return NextResponse.json(content)
  } catch (error) {
    console.error("Media upload error:", error)
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

    await prisma.content.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Media deletion error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

