import { SmoothScrollProvider } from "@/components/navigation/smooth-scroll";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { PreloaderProvider } from "@/components/ui/preloader-provider";
import { CursorTrail } from "@/components/ui/cursor-trail";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Uncial_Antiqua } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const uncialAntiqua = Uncial_Antiqua({
  variable: "--font-uncial-antiqua",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Your Portfolio",
  description: "Premium portfolio with Apple-like design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${uncialAntiqua.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PreloaderProvider duration={2000}>
            <CursorTrail color="rgba(59, 130, 246, 0.5)" size={30} duration={0.8} />
            <SmoothScrollProvider>{children}</SmoothScrollProvider>
          </PreloaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
