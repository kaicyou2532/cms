"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, Image, Key, Users, Star, Plus, Cog } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-[#1F2937] text-white h-screen flex flex-col">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded bg-[#007B63]/10 p-2">
            <div className="h-full w-full rounded-sm bg-[#007B63]" />
          </div>
          <span className="font-semibold">OptimusCMS</span>
        </div>
      </div>

      <div className="p-4">
        <button className="w-full rounded-md bg-white/10 p-2 text-sm flex items-center justify-center">
          <Plus className="h-4 w-4 mr-2" />
          新規作成
        </button>
      </div>

      <nav className="space-y-1 p-4 flex-grow">
        <div className="space-y-1">
          <div className="flex items-center justify-between px-2 py-1 text-sm text-white/60">
            <span>管理</span>
          </div>
          <Link
            href="/services"
            className={`flex items-center space-x-2 px-2 py-1 text-sm rounded-md ${
              pathname === "/services" ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
            }`}
          >
            <Cog className="h-4 w-4" />
            <span>サービス管理</span>
          </Link>
          <Link
            href="/dashboard"
            className={`flex items-center space-x-2 px-2 py-1 text-sm rounded-md ${
              pathname === "/dashboard" ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>コンテンツ</span>
          </Link>
        </div>

        <div className="space-y-1 pt-4">
          <div className="px-2 py-1 text-sm font-medium">メディア</div>
          <Link
            href="/media"
            className={`flex items-center space-x-2 px-2 py-1 text-sm rounded-md ${
              pathname === "/media" ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
            }`}
          >
            <Image className="h-4 w-4" />
            <span>メディア管理</span>
          </Link>
        </div>

        <div className="space-y-1 pt-4">
          <div className="px-2 py-1 text-sm font-medium">レビュー</div>
          <Link href="#" className="flex items-center space-x-2 px-2 py-1 text-sm text-white/60 hover:text-white">
            <Star className="h-4 w-4" />
            <span>0件の申請</span>
          </Link>
        </div>

        <div className="space-y-1 pt-4">
          <div className="px-2 py-1 text-sm font-medium">権限管理</div>
          <Link href="#" className="flex items-center space-x-2 px-2 py-1 text-sm text-white/60 hover:text-white">
            <Users className="h-4 w-4" />
            <span>1人のメンバー</span>
          </Link>
          <Link href="#" className="flex items-center space-x-2 px-2 py-1 text-sm text-white/60 hover:text-white">
            <Users className="h-4 w-4" />
            <span>1個のロール</span>
          </Link>
          <Link href="#" className="flex items-center space-x-2 px-2 py-1 text-sm text-white/60 hover:text-white">
            <Key className="h-4 w-4" />
            <span>1個のAPIキー</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}

