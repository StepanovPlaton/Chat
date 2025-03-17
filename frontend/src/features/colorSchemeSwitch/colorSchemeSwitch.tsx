"use client";

import { SunIcon } from "@/shared/assets/icons";
import { useTheme } from "next-themes";

export const ColorSchemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <SunIcon
        className="h-10 min-w-10 max-w-10 cursor-pointer bg-bg3 p-1 rounded-lg hover:bg-bg4 transition"
        onClick={() => setTheme(theme == "light" ? "dark" : "light")}
      />
    </>
  );
};
