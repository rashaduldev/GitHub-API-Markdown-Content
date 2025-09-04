"use client"
import { createContext, useContext, useState, ReactNode } from "react";
import themeData from "./theme.json";

type Theme = typeof themeData;

type ThemeContextType = Theme & {
  updateTheme: <K extends keyof Theme>(key: K, value: Theme[K]) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  ...themeData,
  updateTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(themeData);

  const updateTheme = <K extends keyof Theme>(key: K, value: Theme[K]) => {
    setTheme(prev => ({ ...prev, [key]: value }));
  };

  return (
    <ThemeContext.Provider value={{ ...theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
