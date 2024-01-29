import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";

//Providers
import { AuthProvider } from "@/providers/AuthProviders";
import NextThemeProvider from "@/providers/ThemeProvider";
import { NextUIProvider } from "@/providers/NextUIProvider";

import Navbar from "@/components/Navbar/Navbar";

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
                <div className="h-screen w-full sm:w-[40rem]">
                  <main className="h-[calc(100%-theme(space.20))] overflow-y-auto p-4">
                    {children}
                  </main>

                  <div className="h-20 w-full">
                    <Navbar />
                  </div>
                </div>
              </div>
            </NextThemeProvider>
          </NextUIProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
