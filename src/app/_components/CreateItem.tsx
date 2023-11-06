"use client"

import React, { useRef, useState } from "react"
import { api } from "~/trpc/react"
import { useClipboardContext } from "../context/ClipboardContext"
import { useNavContext } from "../context/NavContext"
import Uploadthing from "./Uploadthing"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import ClearAllButton from "./buttons/ClearAllButton"

export default function CreatItem() {
  const { content } = useClipboardContext()
  const { tab, setTab } = useNavContext()
  const utils = api.useUtils()
  const [text, setText] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [animationParent] = useAutoAnimate()

  const { mutate, isLoading } = api.text.create.useMutation({
    onSettled: () => {
      utils.text.getAll.invalidate()
      setText("")
      setTab("text")
      window.scrollTo({ behavior: "smooth", top: 0 })
    },
  })

  return (
    <section
      className="h-min min-h-[150px] w-[350px] font-chakraPetch"
      ref={animationParent}
    >
      {tab === "text" && (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            mutate({ content: text })
          }}
          className="flex flex-col gap-4 px-4"
        >
          {text.length > 255 && <div className="text-red-400">too long, </div>}
          <textarea
            ref={textareaRef}
            className="w-full rounded-lg px-4 py-2 text-black shadow-md"
            onChange={(e) => setText(e.target.value)}
            placeholder="Type Something"
            value={text}
            cols={30}
            rows={1 + (textareaRef.current?.scrollHeight! - 40) / 24}
            onFocus={() =>
              textareaRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          />
          <button
            type="submit"
            className="rounded-lg border-[0.5px] border-slate-900/20 bg-orange-500/70 px-10 py-3 font-semibold text-gray-800 drop-shadow-md transition hover:bg-orange-300 "
            disabled={isLoading || text.length === 0}
          >
            {isLoading ? "Pasting..." : "Paste"}
          </button>
          <ClearAllButton />
        </form>
      )}
      {tab === "file" && <Uploadthing />}
    </section>
  )
}
