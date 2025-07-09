import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Walverha Network - WHA Coin Kazanma Platformu",
  description: "Walverha Network ile tıklayarak WHA coin kazanın. Gerçek zamanlı kazanç platformu.",
  icons: {
    icon: "/images/walverha-logo.png",
    shortcut: "/images/walverha-logo.png",
    apple: "/images/walverha-logo.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
