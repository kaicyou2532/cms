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
    <div className="flex min-h-screen bg-[#1F2937]">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded bg-[#007B63]/10 p-2">
                  <div className="h-full w-full rounded-sm bg-[#007B63]" />
                </div>
                <h1 className="text-2xl font-semibold text-white">OptimusCMS</h1>
              </div>
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-white">アカウントにログイン</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-gray-200">
                  ユーザー名
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-gray-800 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-200">
                  パスワード
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-800 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-[#007B63] focus:ring-[#007B63]"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-200">
                    ログイン状態を保持
                  </label>
                </div>

                <Link href="/forgot-password" className="text-sm text-[#007B63] hover:text-[#007B63]/90">
                  パスワードをお忘れの方
                </Link>
              </div>

              <Button type="submit" className="w-full bg-[#007B63] hover:bg-[#007B63]/90">
                ログイン
              </Button>
            </form>

            <div className="text-center text-sm text-gray-400">
              <Link href="/help" className="hover:text-gray-300">
                ヘルプ
              </Link>
              {" · "}
              <Link href="/terms" className="hover:text-gray-300">
                利用規約
              </Link>
              {" · "}
              <Link href="/privacy" className="hover:text-gray-300">
                プライバシーポリシー
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="/placeholder.svg?height=1080&width=1920"
          alt="Background"
        />
      </div>
    </div>
  )
}

