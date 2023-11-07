"use client"

import React from "react"
import { useNavContext } from "../context/NavContext"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { TextList } from "./TextList"
import { FileList } from "./FileList"

export default function Clipboard() {
  const { tab } = useNavContext()

  const [animationParent] = useAutoAnimate()

  // Refetching
  // useEffect(() => {
  //   const id = setInterval(() => utils.post.getAll.refetch(), 10000)
  //   return () => clearInterval(id)
  // }, [])

  return (
    <section className="w-[332px] rounded-xl bg-slate-200/20 shadow-inner shadow-black/30">
      {/* <p>current {window.location.href}</p> */}
      <ul
        ref={animationParent}
        className="flex h-[500px] flex-col gap-2 overflow-y-scroll rounded-xl border-orange-400 p-4"
      >
        {tab === "text" && <TextList />}
        {tab === "file" && <FileList />}
      </ul>
    </section>
  )
}
