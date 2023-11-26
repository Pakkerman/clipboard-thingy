"use client"

import React from "react"

import { useThemeContext } from "~/app/context/ThemeContext"
import { useAutoAnimate } from "@formkit/auto-animate/react"

import { FiSun, FiMoon } from "react-icons/fi"

export function ThemeButton() {
  const [animationParent] = useAutoAnimate()
  const { theme, toggleTheme } = useThemeContext()

  return (
    <button
      className="fixed bottom-4 left-4 flex h-8 w-8 items-center justify-center rounded-full border-[0.5px] border-black/20 dark:border-orange-200 dark:bg-slate-950 dark:text-orange-200 "
      onClick={() => {
        toggleTheme()
      }}
    >
      <div ref={animationParent}>
        {theme === "light" ? <FiSun size={20} /> : <FiMoon size={20} />}
      </div>
    </button>
  )
}
