import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";

interface DarkModeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

interface DarkModeProviderProps {
  children: ReactNode;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    const isDarkFromStorage = localStorage.getItem("isdark") === "true";
    setIsDark(isDarkFromStorage);
  }, []);

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.setAttribute("data-theme", isDark ? "dark" : "light");

      // Directly set styles for dark and light modes
      if (isDark) {
        htmlElement.style.backgroundColor = "#000000";
        htmlElement.style.color = "#ffffff";
      } else {
        htmlElement.style.backgroundColor = "#ffffff";
        htmlElement.style.color = "#000000";
      }
    }
    localStorage.setItem("isdark", isDark.toString());
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <DarkModeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export function useDarkMode(): DarkModeContextType {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}
