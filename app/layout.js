import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Requirements Analysis Bot",
  description: "AI-powered requirements analysis tool",
};

/**
 * Root Layout Component
 *
 * Root layout component that wraps all pages in the application.
 * It provides:
 * - Font configuration with Geist Sans and Geist Mono
 * - Theme provider for dark/light mode
 * - Authentication context
 * - Global styles and configuration
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to be wrapped
 * @returns {React.ReactElement} The root layout structure
 */
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
