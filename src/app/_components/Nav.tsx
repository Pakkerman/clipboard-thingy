"use client"

import React from "react"
import { useNavContext } from "../context/NavContext"

export default function Nav() {
  const { tab, setTab } = useNavContext()

  return (
    <nav className="py-4">
      <ul className="flex w-[80vw] justify-around">
        <li className="">
          <button
            className={`border rounded-xl border-slate-900/20 py-2 px-4 transition ${
              tab === "text" ? "bg-slate-400" : ""
            }`}
            onClick={() => setTab("text")}
          >
            Text
          </button>
        </li>
        <li className="">
          <button
            className={`border rounded-xl border-slate-900/20 py-2 px-4 transition ${
              tab === "file" ? "bg-slate-400" : ""
            }`}
            onClick={() => setTab("file")}
          >
            File
          </button>
        </li>
      </ul>
      <pre>current tab: {tab}</pre>
    </nav>
  )
}
