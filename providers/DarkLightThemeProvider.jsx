"use client";

import { ThemeProvider } from "next-themes";

export default function DarkLightThemeProvider({ children }) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
