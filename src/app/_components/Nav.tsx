"use client"

import React from "react"
import { useNavContext } from "../context/NavContext"

export default function Nav() {
  const { tab, setTab } = useNavContext()

  return (
    <nav className="py-4">
      <ul className="flex w-[325px]   justify-between gap-2">
        <li className="grow">
          <button
            className={`w-full select-none rounded-xl border border-slate-900/20 px-4 py-2
            transition hover:shadow-md
            ${
              tab === "text" ? "shadow-inner shadow-black/25 " : ""
            } active:shadow-inner`}
            onClick={() => setTab("text")}
          >
            <span className="font-chakraPetch tracking-wider">texts</span>
          </button>
        </li>
        <li className="grow">
          <button
            className={`w-full select-none rounded-xl border border-slate-900/20 px-4 
            py-2 transition hover:shadow-md active:shadow-inner
            ${tab === "file" ? "shadow-inner shadow-black/25 " : ""}`}
            onClick={() => setTab("file")}
          >
            <span className="font-chakraPetch tracking-wider">files</span>
          </button>
        </li>
      </ul>
    </nav>
  )
}
