import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";

// Providers
import { AuthProvider } from "@/providers/AuthProvider";
import NextThemeProvider from "@/providers/ThemeProvider";
import { NextUIProvider } from "@/providers/NextUIProvider";

// Components
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Success",
  description: "Save all your succeses in one place",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <AuthProvider>
          <NextUIProvider>
            <NextThemeProvider>
              <div className="static flex h-screen flex-col items-center sm:w-[40rem]">
                <main className="w-full overflow-y-auto p-4">
                  {children}
                  <div className="mt-8"></div>
                </main>

                <Navbar
                  style={
                    "rounded-lg flex h-[5.25rem] w-[94%] flex-row items-center justify-around fixed bottom-3 border-2 border-foreground backdrop-blur-md shadow-xl"
                  }
                />
              </div>
            </NextThemeProvider>
          </NextUIProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
