"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      data-test-id="theme-selector"
    >
      <option value="system">System</option>
      {mounted && (
        <>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </>
      )}
    </select>
  );
};

export default ThemeSwitcher;
