"use client"

import React, { useEffect, useState } from "react"
import useLocalBoardData from "../hooks/useLocalBoardData"
import { setLocalData } from "../lib/localStorageHelpers"
import { LoadingSpinner } from "./LoadingSpinner"
import { useRouter } from "next/navigation"

export default function BoardManager() {
  const router = useRouter()
  const { inputId, setInputId, loading } = useLocalBoardData()
  const [starting, setStarting] = useState(false)

  const handleKeyPress = (event: KeyboardEvent) => {
    if (loading) return
    if (inputId.length === 0) return
    if (event.key === "Enter") handleStart()
  }

  const handleStart = () => {
    router.push("/" + inputId)
    setLocalData("boardId", inputId)
    setStarting(true)
  }

  useEffect(() => {
    if (loading) return
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [loading])

  return (
    <section className="flex flex-col gap-4 py-6 font-chakraPetch">
      <button
        disabled={loading || starting}
        className="flex h-12 w-full items-center justify-center rounded-xl border border-orange-400 bg-orange-400 p-2 text-center text-lg text-orange-950  shadow-md shadow-orange-950/30 transition hover:border-orange-500 hover:bg-orange-500 hover:shadow-none hover:shadow-orange-950 active:shadow-inner active:shadow-orange-950 disabled:opacity-60 dark:shadow-orange-500/40"
        onClick={handleStart}
      >
        {loading || starting ? <LoadingSpinner size={4} /> : "Start"}
      </button>
      <br />
      <p className="text-center">Board ID</p>
      <input
        type="text"
        className="rounded-xl bg-orange-50 p-2 text-center accent-orange-500 shadow-inner shadow-orange-950/40 dark:text-orange-950"
        value={inputId}
        maxLength={6}
        onChange={(event) => setInputId(event.target.value)}
      />
      <button
        className="border-2 "
        onClick={() => localStorage.removeItem("clipboard")}
      >
        testing: clearn local boardId
      </button>
    </section>
  )
}
