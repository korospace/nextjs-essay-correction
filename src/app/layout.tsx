// next
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// external lib
import { Toaster } from "react-hot-toast";
// assets
import '@/assets/css/globals.css'
import BudiluhurJpg from "@/assets/images/budiluhur.jpg"
// provider
import { NextAuthProvider, NextUiProvider } from '@/lib/context';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Koreksi Essay",
  description: "Koreksi Essay",
  icons: {
    icon: BudiluhurJpg.src,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUiProvider>
          <NextAuthProvider>
            {children}
            <Toaster position="top-right" />
          </NextAuthProvider>
        </NextUiProvider>
      </body>
    </html>
  )
}
