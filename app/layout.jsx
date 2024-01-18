import { Inter } from "next/font/google";
import "./globals.css";

import DarkLightThemeProvider from "@/providers/DarkLightThemeProvider";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Success",
  description: "Save all your succeses in one place",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <DarkLightThemeProvider>
          {/* Page */}
          <main className="w-screen grow border border-red-500 sm:w-[40rem]">
            {children}
          </main>

          {/* Navbar */}
          <Navbar />
        </DarkLightThemeProvider>
      </body>
    </html>
  );
}
