"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
    if (res.ok) {
      router.push("/dashboard")
    } else {
      alert("Invalid credentials")
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">SimpleCMS</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/register">
              <Button variant="ghost" className="text-sm">
                無料ではじめる
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">ログイン</h2>
            <p className="mt-2 text-sm text-gray-600">
              または{" "}
              <Link href="/register" className="text-indigo-600 hover:text-indigo-500">
                無料アカウントを作成
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
              <div className="space-y-2">
                <Label htmlFor="username">ユーザー名</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    ログイン状態を保持
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
                  パスワードをお忘れの方
                </Link>
              </div>
            </div>

            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500">
              ログイン
            </Button>
          </form>

          <div className="text-center text-sm text-gray-600">
            <Link href="/help" className="hover:text-indigo-500">
              ヘルプ
            </Link>
            {" · "}
            <Link href="/terms" className="hover:text-indigo-500">
              利用規約
            </Link>
            {" · "}
            <Link href="/privacy" className="hover:text-indigo-500">
              プライバシーポリシー
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

