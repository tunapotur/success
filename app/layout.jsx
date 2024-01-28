import { Inter } from "next/font/google";
import "./globals.css";

//Providers
import { AuthProvider } from "@/providers/AuthProviders";
import NextThemeProvider from "@/providers/ThemeProvider";
import { NextUIProvider } from "@/providers/NextUIProvider";

import Navbar from "@/components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Success",
  description: "Save all your succeses in one place",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <NextUIProvider>
            <NextThemeProvider>
              <div className="flex flex-col items-center">
                <div className="h-screen w-full sm:w-[40rem]">
                  <main className="h-[calc(100%-theme(space.20))] overflow-y-auto border border-red-500 p-[1rem]">
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
