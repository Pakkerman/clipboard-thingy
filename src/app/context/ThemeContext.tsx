"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import {
  getLocalData,
  initLocalStorage,
  setLocalData,
} from "../lib/localStorageHelpers"

initLocalStorage()

type Theme = "light" | "dark"
type ThemeContext = {
  theme: Theme
  toggleTheme: () => void
  loading: boolean
}
const ThemeContext = createContext<ThemeContext | null>(null)

type ThemeContextProviderProps = { children: React.ReactNode }
export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [theme, setTheme] = useState<Theme>("light")
  const [loading, setLoading] = useState(true)

  function toggleTheme() {
    if (theme === "light") {
      setTheme("dark")
      setLocalData("theme", "dark")
      document.documentElement.classList.add("dark")
    } else {
      setTheme("light")
      setLocalData("theme", "light")
      document.documentElement.classList.remove("dark")
    }
  }

  useEffect(() => {
    const theme = getLocalData("theme") as Theme
    if (theme) {
      setTheme(theme)
      if (theme === "dark") document.documentElement.classList.add("dark")
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    }
    setLoading(true)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, loading }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeContext() {
  const context = useContext(ThemeContext)
  if (!context)
    throw new Error(
      "useThemeContext can only be used inside ThemeContextProvider",
    )

  return context
}
