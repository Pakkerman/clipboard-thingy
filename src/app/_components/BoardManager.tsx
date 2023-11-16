"use client"

import React from "react"
import Link from "next/link"
import useLocalBoardData from "../hooks/useLocalBoardData"

export default function BoardManager() {
  const { inputId, setInputId, loading } = useLocalBoardData()

  return (
    <section className="flex flex-col gap-4 py-6 font-chakraPetch">
      <Link className="" href={"/" + inputId}>
        <button
          disabled={loading}
          className="w-full rounded-xl border border-orange-400 bg-orange-400 p-2 text-center text-lg text-orange-950 shadow-md shadow-orange-950/30 transition transition hover:border-orange-500 hover:bg-orange-500 hover:shadow-none hover:shadow-orange-950 active:shadow-inner active:shadow-orange-950 disabled:opacity-60 dark:shadow-orange-500/40"
          onClick={() => {
            // Set boardId after user click start, this will update correctly if use manual inputed a id
            const storage = JSON.parse(localStorage.clipboard)
            storage.boardId = inputId
            localStorage.clipboard = JSON.stringify(storage)
          }}
        >
          Start
        </button>
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
      <button
        className="border-2 "
        onClick={() => localStorage.removeItem("clipboard")}
      >
        testing: clearn local boardId
      </button>
    </section>
  )
}

function generateNewBoardId(): string {
  return Math.floor(Math.random() * 100000)
    .toString()
    .padStart(6, "0")
}
