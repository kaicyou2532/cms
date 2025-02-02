import "./globals.css"
import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Simple CMS",
  description: "A simple content management system",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-50">
        {/* Only show Nav on authenticated routes */}
        {children}
      </body>
    </html>
  )
}

