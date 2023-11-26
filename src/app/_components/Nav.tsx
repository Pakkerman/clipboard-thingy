"use client"

import React from "react"

import { useNavContext } from "../context/NavContext"

export default function Nav() {
  const { tab, setTab } = useNavContext()

  return (
    <nav className="w-[90%] py-3">
      <ul className="flex justify-between gap-2">
        <li className="grow">
          <button
            className={`w-full select-none rounded-xl border border-slate-900/20 px-4 
            py-2 transition 
            ${
              tab === "text"
                ? "shadow-inner shadow-black/25 "
                : "hover:shadow-md"
            } `}
            onClick={() => setTab("text")}
          >
            <span className="font-chakraPetch tracking-wider">texts</span>
          </button>
        </li>
        <li className="grow">
          <button
            className={`w-full select-none rounded-xl border border-slate-900/20 px-4 
            py-2 transition 
            ${
              tab === "file"
                ? "shadow-inner shadow-black/25 "
                : "hover:shadow-md"
            } `}
            onClick={() => setTab("file")}
          >
            <span className="font-chakraPetch tracking-wider">files</span>
          </button>
        </li>
      </ul>
    </nav>
  )
}
