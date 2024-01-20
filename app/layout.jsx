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
          <div className="flex flex-col items-center">
            <div className="h-screen w-full sm:w-[40rem]">
              <main className="h-[calc(100%-theme(space.16))] overflow-y-auto border border-red-500 p-[1rem]">
                {children}
              </main>

              <nav className="h-16 w-full border border-green-400">
                <Navbar />
              </nav>
            </div>
          </div>
        </DarkLightThemeProvider>
      </body>
    </html>
  );
}
