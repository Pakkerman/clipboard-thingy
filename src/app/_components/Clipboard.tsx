"use client"

import React, { SetStateAction } from "react"
import { useNavContext } from "../context/NavContext"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { TextList } from "./TextList"
import { FileList } from "./FileList"
import { useBoardContext } from "../context/BoardContext"

export default function Clipboard() {
  const { tab } = useNavContext()
  const [animationParent] = useAutoAnimate()

  return (
    <section className="w-[90%] max-w-[375px] rounded-xl bg-slate-200/20 shadow-inner shadow-black/30">
      <ul
        ref={animationParent}
        className="flex h-[450px] flex-col items-center gap-2 overflow-y-scroll rounded-xl border-orange-400 p-4"
      >
        {/* {locked ? (
          <PinInput pin={pin} setPin={setPin} />
        ) : tab === "text" ? (
          <TextList />
        ) : (
          <FileList />
        )} */}
        {tab === "text" ? <TextList /> : <FileList />}
      </ul>
    </section>
  )
}
