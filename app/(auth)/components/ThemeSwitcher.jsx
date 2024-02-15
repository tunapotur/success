"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Select, SelectItem } from "@nextui-org/react";
import { FileSliders, Sun, Moon } from "lucide-react";
import { InputGeneralConfig } from "@/app/(auth)/components/InputGeneralConfig";
import InputSkeleton from "@/app/(auth)/components/InputSkeleton";

const items = [
  { key: "system", name: "System", icon: <FileSliders /> },
  { key: "light", name: "Light", icon: <Sun /> },
  { key: "dark", name: "Dark", icon: <Moon /> },
];

// TODO: Bu anında Theme değiştiren switch. Gerekirse kaldırılacak.
const ThemeSwitcher = ({ setUserThemeSelection }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setUserThemeSelection(theme);
  }, [setUserThemeSelection, theme]);

  function selectTheme(e) {
    const themeSelection = e.target.value;
    setTheme(themeSelection);
    setUserThemeSelection(themeSelection);
  }

  return (
    <div className="flex h-[5rem] flex-col justify-center gap-y-[0.5rem]">
      {!mounted ? (
        <InputSkeleton />
      ) : (
        <Select
          {...InputGeneralConfig}
          label="Theme Selection"
          placeholder="Select a theme"
          onChange={selectTheme}
          isLoading={!mounted}
          isDisabled={!mounted}
          selectionMode="single"
          items={items}
          defaultSelectedKeys={[theme]}
        >
          {(item) => (
            <SelectItem
              key={item.key}
              value={item.name}
              className="capitalize"
              startContent={item.icon}
            >
              {item.name}
            </SelectItem>
          )}
        </Select>
      )}
    </div>
  );
};

export default ThemeSwitcher;
