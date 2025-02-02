import "./globals.css"
import Nav from "@/components/nav"
import type { Metadata } from "next"
import type React from "react" // Import React

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
        <Nav />
        {children}
      </body>
    </html>
  )
}

