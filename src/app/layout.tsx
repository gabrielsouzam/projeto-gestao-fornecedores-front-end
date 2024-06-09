import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/header'
import { SuppliersContextProvider } from '@/context/SuppliersContext'

export const metadata: Metadata = {
  title: 'Gestão de fornecedores',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <SuppliersContextProvider>
          <Header />
          {children}
        </SuppliersContextProvider>
      </body>
    </html>
  )
}
