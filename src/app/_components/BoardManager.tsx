"use client"

import React from "react"
import Link from "next/link"
import { useBoard } from "../hooks/useBoard"

export default function BoardManager() {
  // const { boardId, setBoardId } = useBoardContext()
  const boardId = useBoard()

  return (
    <section className="flex flex-col gap-4 py-6 font-chakraPetch">
      <Link
        className="rounded-xl border border-black/20 p-4"
        href={"/" + boardId}
      >
        <p className="text-center">Go to board #{boardId}</p>
      </Link>
      <Link className="rounded-xl border border-black/20 p-4" href={"/"}>
        <p className="text-center">Start a new board</p>
      </Link>
    </section>
  )
}
