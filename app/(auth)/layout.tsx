import Nav from "@/components/nav"
import type React from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Nav />
      {children}
    </>
  )
}

