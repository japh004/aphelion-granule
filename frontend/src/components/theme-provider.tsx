"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

// Default context value for SSR
const defaultContext: ThemeContextType = {
    theme: "dark",
    toggleTheme: () => { },
    setTheme: () => { },
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>("dark");
    const [mounted, setMounted] = useState(false);

    // Load theme from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("theme") as Theme | null;
        if (stored) {
            setThemeState(stored);
        } else {
            // Check system preference
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setThemeState(prefersDark ? "dark" : "light");
        }
        setMounted(true);
    }, []);

    // Apply theme class to document
    useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;
        if (theme === "light") {
            root.classList.add("light");
        } else {
            root.classList.remove("light");
        }
        localStorage.setItem("theme", theme);
    }, [theme, mounted]);

    const toggleTheme = () => {
        setThemeState(prev => prev === "dark" ? "light" : "dark");
    };

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
    };

    const value: ThemeContextType = {
        theme,
        toggleTheme,
        setTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
