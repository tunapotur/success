import "@/styles/globals.css";
import { Inter as FontSans, Roboto, Montserrat } from "next/font/google";

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

export const roboto = Roboto({
  weight: ["300", "400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const montserrat = Montserrat({
  weight: ["300", "400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Success",
  description: "Save all your success in one place",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${roboto.variable} ${montserrat.variable}`}
    >
      <head>
        <title></title>
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <AuthProvider>
          <NextUIProvider>
            <NextThemeProvider>
              <div className="flex h-screen w-full flex-col items-center justify-center">
                <div className="relative flex h-screen w-full flex-col items-center rounded-lg border-2 border-gray-400/50 sm:h-[53rem] sm:w-[25rem]">
                  <main className="w-full overflow-y-auto p-[1rem] pb-[10rem]">
                    {children}
                  </main>

                  <Navbar
                    style={
                      "z-50 rounded-lg flex h-[5.25rem] w-[calc(100%-2rem)] flex-row items-center justify-around absolute bottom-[1rem] border backdrop-blur-sm backdrop-contrast-125 bg-slate-400/20"
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
