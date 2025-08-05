import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Yeşil Gelecek - Ağaçlandırma Bağış Platformu',
  description: 'Geleceğimiz için ağaç dikin. Yeşil Gelecek ile doğaya katkıda bulunun.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={`${inter.className} bg-green-50`}>
        {children}
      </body>
    </html>
  )
}
