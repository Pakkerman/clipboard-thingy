"use client"

import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { isDesktop } from "react-device-detect"

import useLocalBoardData from "../hooks/useLocalBoardData"
import { setLocalData } from "../lib/localStorageHelpers"

import LoadingSpinner from "./LoadingSpinner"

export default function BoardManager() {
  const router = useRouter()
  const { inputId, setInputId, loading } = useLocalBoardData()

  const inputRef = useRef<HTMLInputElement>(null)
  const [starting, setStarting] = useState(false)

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key !== "Enter") return
    const startButton: HTMLButtonElement | null =
      document.querySelector("#start")
    if (startButton) startButton.click()
  }

  const handleStart = () => {
    router.push("/" + inputId)
    setLocalData("boardId", inputId)
    setStarting(true)
  }

  useEffect(() => {
    if (loading) return
    window.addEventListener("keydown", handleKeyPress)

    if (!inputRef.current || !isDesktop) return
    inputRef.current.focus()

    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [loading])

  return (
    <section className="flex w-[clamp(300px,90%,375px)] flex-col items-center gap-4 py-6 font-chakraPetch">
      <button
        id="start"
        disabled={loading || starting}
        className="flex h-12 w-[70%] items-center justify-center rounded-xl border border-orange-400 bg-orange-400 p-2 text-center text-lg text-orange-950  shadow-md shadow-orange-950/30 transition hover:border-orange-500 hover:bg-orange-500 hover:shadow-none hover:shadow-orange-950 active:shadow-inner active:shadow-orange-950 disabled:opacity-60 dark:shadow-orange-500/40"
        onClick={handleStart}
      >
        {loading || starting ? <LoadingSpinner /> : "Start"}
      </button>
      <br />
      <p className="text-center">Board ID</p>
      <input
        ref={inputRef}
        type="text"
        className="w-[70%] rounded-xl bg-orange-50 p-2 text-center accent-orange-500 shadow-inner shadow-orange-950/40 dark:text-orange-950"
        value={inputId}
        maxLength={6}
        onChange={(event) => setInputId(event.target.value)}
      />
      {/* dev testing button to reset localStorage */}
      {/* <button
        className="border-2"
        onClick={() => localStorage.removeItem("clipboard")}
      >
        testing: clearn local boardId
      </button> */}
    </section>
  )
}
