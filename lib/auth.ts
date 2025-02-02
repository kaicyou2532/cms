import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

// ハードコードされたrootユーザー
const ROOT_USER = {
  username: "root",
  password: "root",
}

export async function validateApiKey(apiKey: string | null): Promise<boolean> {
  if (!apiKey) return false
  const key = await prisma.apiKey.findUnique({ where: { key: apiKey } })
  return !!key
}

export async function generateApiKey(): Promise<string> {
  const key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  await prisma.apiKey.create({ data: { key } })
  return key
}

export async function validateCredentials(username: string, password: string): Promise<boolean> {
  if (username === ROOT_USER.username && password === ROOT_USER.password) {
    return true
  }

  const user = await prisma.user.findUnique({ where: { username } })
  if (!user) return false
  return await bcrypt.compare(password, user.password)
}

