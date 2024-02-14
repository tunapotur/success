"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { FileSliders, Sun, Moon } from "lucide-react";
import { InputGeneralConfig } from "@/app/(auth)/components/InputGeneralConfig";
import InputSkeleton from "@/app/(auth)/components/InputSkeleton";

const items = [
  { key: "system", name: "System", icon: <FileSliders /> },
  { key: "light", name: "Light", icon: <Sun /> },
  { key: "dark", name: "Dark", icon: <Moon /> },
];

const ThemeSwitch = ({ isLoading = false, theme, setTheme }) => {
  function selectTheme(e) {
    const themeSelection = e.target.value;
    setTheme(themeSelection);
  }

  return (
    <div className="flex h-[5rem] flex-col justify-center gap-y-[0.5rem]">
      {isLoading ? (
        <InputSkeleton />
      ) : (
        <Select
          {...InputGeneralConfig}
          label="Theme Selection"
          placeholder="Select a theme"
          onChange={selectTheme}
          selectionMode="single"
          items={items}
          isLoading={isLoading}
          isDisabled={isLoading}
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

export default ThemeSwitch;

/*
      {!mounted ? (
        <InputSkeleton />
      ) : (

      )}
 */
