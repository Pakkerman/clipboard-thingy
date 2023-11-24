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
    // To prevent ul grow beyond the size of 100svh and push buttons out of the screen, that is listed items exceed original given space, depending on the grow property of the parent section tag. Here give a property of h-[100px] to section, let ul have a h-full (h-full will depending on the parent's height) to set to.
    <div className="h-[100px] w-full grow rounded-xl bg-stone-50 shadow-inner shadow-orange-950/40">
      <ul
        ref={animationParent}
        className="flex h-full flex-col items-center gap-2 overflow-y-scroll rounded-xl border-orange-400 p-4"
      >
        {tab === "text" ? <TextList /> : <FileList />}
      </ul>
    </div>
  )
}
