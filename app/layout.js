import { Inter } from "next/font/google";
import "./globals.css";

import DarkLightThemeProvider from "@/providers/DarkLightThemeProvider";
import DarkLightThemeButton from "@/components/DarkLightThemeButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Success",
  description: "Save all your succeses in one place",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DarkLightThemeProvider>
          {/* Header */}
          <header className="py-6">
            <nav className="container flex items-center justify-between">
              <DarkLightThemeButton />
            </nav>
          </header>

          {/* Page */}
          <main>{children}</main>

          {/* Footer */}
          <footer></footer>
        </DarkLightThemeProvider>
      </body>
    </html>
  );
}
