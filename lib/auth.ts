import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"

const prisma = new PrismaClient()

// Root user configuration
const ROOT_USER = {
  id: "root",
  username: "root",
  password: "root",
}

export async function validateCredentials(username: string, password: string): Promise<string | null> {
  // Root user validation
  if (username === ROOT_USER.username && password === ROOT_USER.password) {
    return ROOT_USER.id
  }

  try {
    const user = await prisma.user.findUnique({ where: { username } })
    if (!user) return null
    const isValid = await bcrypt.compare(password, user.password)
    return isValid ? user.id : null
  } catch (error) {
    console.error("Validation error:", error)
    return null
  }
}

export async function createSession(userId: string): Promise<string> {
  const sessionId = uuidv4()
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

  // Don't create database session for root user
  if (userId === ROOT_USER.id) {
    return `root-${sessionId}`
  }

  try {
    await prisma.session.create({
      data: {
        id: sessionId,
        userId,
        expiresAt,
      },
    })
    return sessionId
  } catch (error) {
    console.error("Session creation error:", error)
    return sessionId // Return session ID even if DB fails
  }
}

export async function validateSession(sessionId: string): Promise<string | null> {
  // Root session validation
  if (sessionId.startsWith("root-")) {
    return ROOT_USER.id
  }

  try {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { user: true },
    })

    if (!session || session.expiresAt < new Date()) {
      return null
    }

    return session.user.id
  } catch (error) {
    console.error("Session validation error:", error)
    return null
  }
}

export async function deleteSession(sessionId: string): Promise<void> {
  if (sessionId.startsWith("root-")) {
    return // Don't attempt to delete root sessions from DB
  }

  try {
    await prisma.session.delete({
      where: { id: sessionId },
    })
  } catch (error) {
    console.error("Session deletion error:", error)
  }
}

