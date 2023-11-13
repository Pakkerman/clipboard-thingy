"use client"

import React, { useEffect } from "react"
import { useNavContext } from "../context/NavContext"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { TextList } from "./TextList"
import { FileList } from "./FileList"
import { useParams, useRouter } from "next/navigation"

export default function Clipboard() {
  const { tab } = useNavContext()
  const [animationParent] = useAutoAnimate()
  const { id } = useParams()
  const router = useRouter()

  useEffect(() => {
    const boardId = formatIdParam(id)
    localStorage.setItem("clipbroker_boardId", boardId)
    if (id !== boardId) router.replace("/" + boardId)
  }, [])

  // Refetching
  // useEffect(() => {
  //   const id = setInterval(() => utils.post.getAll.refetch(), 10000)
  //   return () => clearInterval(id)
  // }, [])

  return (
    <section className="w-[90%] max-w-[375px] rounded-xl bg-slate-200/20 shadow-inner shadow-black/30">
      <ul
        ref={animationParent}
        className="flex h-[450px] flex-col items-center gap-2 overflow-y-scroll rounded-xl border-orange-400 p-4"
      >
        {tab === "text" && <TextList />}
        {tab === "file" && <FileList />}
      </ul>
    </section>
  )
}

function formatIdParam(id: string | string[] | undefined): string {
  if (!id) return "000000"
  if (typeof id !== "string") id = id.join("")
  return id.padStart(6, "0")
}
