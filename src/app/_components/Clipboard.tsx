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
    <section className="w-[332px] rounded-xl shadow-inner shadow-black/30 bg-slate-200/20">
      {/* <p>current {window.location.href}</p> */}
      <div className="rounded-xl border-orange-400 py-2">
        <ul
          ref={animationParent}
          className="flex flex-col gap-2 h-[500px] overflow-y-scroll px-4 py-2"
        >
          {tab === "text" && <TextList />}
          {tab === "file" && <FileList />}
        </ul>
      </div>
    </section>
  )
}
