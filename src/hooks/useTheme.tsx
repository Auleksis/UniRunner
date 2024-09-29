import React, { useEffect, useState } from "react";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

type Theme = "dark" | "light";

type useThemeReturn = [string, (e: ChangeEvent) => void];

export const useTheme = (initialState: Theme): useThemeReturn => {
  const [theme, setTheme] = useState<Theme>(initialState);

  const handleChange = (e: ChangeEvent) =>
    setTheme(e.target.checked ? "dark" : "light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return [theme, handleChange];
};
