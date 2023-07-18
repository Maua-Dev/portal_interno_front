// import { UserProvider } from '@/contexts/user_provider'
import './globals.css'
import React from 'react'

export const metadata = {
  title: 'Portal Interno',
  description: 'PI - Portal Interno Dev Community'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}
