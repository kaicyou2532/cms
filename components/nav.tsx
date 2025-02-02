"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, Image, Settings } from "lucide-react"

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className="flex h-14 items-center border-b bg-white px-4">
      <div className="flex items-center space-x-4">
        <Link
          href="/dashboard"
          className={`flex items-center space-x-2 rounded-lg px-3 py-2 hover:bg-sky-50 ${
            pathname === "/dashboard" ? "bg-sky-100 text-sky-600" : ""
          }`}
        >
          <FileText className="h-5 w-5" />
          <span>コンテンツ</span>
        </Link>
        <Link
          href="/media"
          className={`flex items-center space-x-2 rounded-lg px-3 py-2 hover:bg-sky-50 ${
            pathname === "/media" ? "bg-sky-100 text-sky-600" : ""
          }`}
        >
          <Image className="h-5 w-5" />
          <span>メディア</span>
        </Link>
        <Link
          href="/settings"
          className={`flex items-center space-x-2 rounded-lg px-3 py-2 hover:bg-sky-50 ${
            pathname === "/settings" ? "bg-sky-100 text-sky-600" : ""
          }`}
        >
          <Settings className="h-5 w-5" />
          <span>設定</span>
        </Link>
      </div>
    </nav>
  )
}

