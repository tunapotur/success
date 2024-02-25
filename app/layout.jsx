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
              <div className="flex flex-col items-center">
                <div className="static flex h-screen w-full flex-col items-center sm:block sm:w-[40rem]">
                  <main className="w-full overflow-y-auto p-[1rem]">
                    {children}
                  </main>

                  <Navbar
                    style={
                      "rounded-lg flex h-[5.25rem] w-[calc(100%-2rem)] sm:w-[40rem] flex-row items-center justify-around fixed bottom-[1rem] border backdrop-blur-sm backdrop-contrast-125"
                    }
                  />
                </div>
              </div>
            </NextThemeProvider>
          </NextUIProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
