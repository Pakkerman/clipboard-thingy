"use client"

import React from "react"
import { useNavContext } from "../context/NavContext"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { TextList } from "./TextList"
import { FileList } from "./FileList"

export default function Clipboard() {
  const { tab } = useNavContext()
  const [animationParent] = useAutoAnimate()

  return (
    <section className=" w-[90%] max-w-[375px] rounded-xl bg-stone-50 shadow-inner shadow-black/50">
      <ul
        ref={animationParent}
        className="flex h-[450px] flex-col items-center gap-2 overflow-y-scroll rounded-xl border-orange-400 p-4"
      >
        {tab === "text" ? <TextList /> : <FileList />}
      </ul>
    </section>
  )
}
