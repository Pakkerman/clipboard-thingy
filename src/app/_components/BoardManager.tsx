"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"

// getting board from localstorage, if there's no board, generate new
const localStorageId = localStorage.getItem("clipbroker_boardId")
console.log(typeof localStorageId)
if (!localStorageId || localStorageId === "undefined") {
  const newId = generateNewBoardId()
  localStorage.setItem("clipbroker_boardId", newId)
}
const boardId = localStorage.getItem("clipbroker_boardId")!

export default function BoardManager() {
  const [inputId, setInputId] = useState(boardId)

  useEffect(() => {
    setInputId(boardId)
  }, [])

  return (
    <section className="flex flex-col gap-4 py-6 font-chakraPetch">
      <Link
        className="rounded-xl border border-black/20 border-orange-400 bg-orange-400 p-2 text-lg text-orange-950 shadow-md shadow-orange-950/40 transition  hover:shadow-inner hover:shadow-orange-950 active:shadow-inner active:shadow-orange-950 "
        href={"/" + boardId?.padStart(6, "0")}
      >
        <p className="text-center">Start</p>
      </Link>
      <br />
      <p className="text-center">or enter id</p>
      <input
        type="text"
        className="rounded-md text-center"
        value={inputId}
        maxLength={6}
        onChange={(event) => setInputId(event.target.value)}
      />
      <Link
        className="rounded-xl border border-black/20 p-2 text-lg transition hover:border-orange-400 hover:bg-orange-400 active:translate-y-[2px] "
        href={"/" + inputId}
      >
        <p className="text-center">Go to board</p>
      </Link>
    </section>
  )
}

function generateNewBoardId(): string {
  return Math.floor(Math.random() * 100000)
    .toString()
    .padStart(6, "0")
}
