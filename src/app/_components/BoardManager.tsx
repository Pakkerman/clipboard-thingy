"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"

// getting board from localstorage, if there's no board, generate new

export default function BoardManager() {
  const [inputId, setInputId] = useState("Loading...")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const localStorageId = localStorage.getItem("clipbroker_boardId")
    if (!localStorageId || localStorageId === "undefined") {
      const newId = generateNewBoardId()

      localStorage.setItem("clipbroker_boardId", newId)
    }
    const boardId = localStorage.getItem("clipbroker_boardId")!

    setInputId(boardId)
    setLoading(false)
  }, [])

  return (
    <section className="flex flex-col gap-4 py-6 font-chakraPetch">
      <Link
        className="rounded-xl border border-orange-400 bg-orange-400 p-2 text-lg text-orange-950 shadow-md shadow-orange-950/30 transition hover:border-orange-500 hover:bg-orange-500 hover:shadow-none hover:shadow-orange-950 active:shadow-inner active:shadow-orange-950 dark:shadow-orange-500/40"
        href={"/" + inputId}
      >
        <div className="text-center">Start</div>
      </Link>
      <br />
      <p className="text-center">Board ID</p>
      <input
        type="text"
        className="rounded-xl bg-orange-50 p-2 text-center accent-orange-500 shadow-inner shadow-orange-950/40 dark:text-orange-950"
        value={inputId}
        maxLength={6}
        onChange={(event) => setInputId(event.target.value)}
      />
    </section>
  )
}

function generateNewBoardId(): string {
  return Math.floor(Math.random() * 100000)
    .toString()
    .padStart(6, "0")
}
