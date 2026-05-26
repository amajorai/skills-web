import { Geist, Geist_Mono, Inter } from "next/font/google"
import { GlimmProvider } from "glimm/next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { GlimmIntro } from "@/components/glimm-intro"
import { cn } from "@/lib/utils";

const geistHeading = Geist({subsets:['latin'],variable:'--font-heading'});

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable, geistHeading.variable)}
    >
      <body>
        <ThemeProvider>
          <GlimmProvider>
            <GlimmIntro />
            {children}
          </GlimmProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
