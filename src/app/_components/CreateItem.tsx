"use client"

import React, { useEffect, useRef, useState } from "react"
import { api } from "~/trpc/react"

import { useClipboardContext } from "../context/ClipboardContext"
import { useNavContext } from "../context/NavContext"
import { useBoardId } from "../hooks/useBoardId"
import Uploadthing from "./Uploadthing"
import ClearAllButton from "./buttons/ClearAllButton"

import { useAutoAnimate } from "@formkit/auto-animate/react"

export default function CreatItem() {
  // const { content } = useClipboardContext()
  const { tab, setTab } = useNavContext()
  const utils = api.useUtils()
  const boardId = useBoardId()
  const [text, setText] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [animationParent] = useAutoAnimate()

  const { mutate, isLoading } = api.text.create.useMutation({
    onMutate: () => {
      if (text.length === 0 && textareaRef.current) textareaRef.current.focus()
    },
    onSettled: () => {
      utils.text.getAll.invalidate()
      setText("")
      setTab("text")
      window.scrollTo({ behavior: "smooth", top: 0 })
      // reset text area rows
      if (textareaRef.current) textareaRef.current.rows = 2
    },
  })

  return (
    <section
      className="h-min min-h-[150px] w-[350px] font-chakraPetch"
      ref={animationParent}
    >
      {tab === "text" && (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              mutate({ text, boardId })
            }}
            className="flex flex-col gap-4 px-4"
          >
            {text.length > 255 && (
              <div className="text-red-400">too long, </div>
            )}
            <textarea
              ref={textareaRef}
              className="w-full rounded-lg px-4 py-2 text-black shadow-md"
              onChange={(e) => setText(e.target.value)}
              placeholder="Type Something"
              value={text}
              cols={30}
              rows={
                textareaRef.current?.scrollHeight
                  ? 1 + (textareaRef.current?.scrollHeight! - 40) / 24
                  : 2
              }
              onFocus={() =>
                textareaRef.current?.scrollIntoView({ behavior: "smooth" })
              }
            />
            <button
              type="submit"
              className="select-none rounded-xl border-[0.5px] border-orange-400 border-slate-900/20 bg-orange-400 p-2 text-lg text-orange-950 shadow-md shadow-orange-950/30  transition hover:bg-orange-500 hover:shadow-none hover:shadow-orange-950 active:shadow-inner active:shadow-orange-950"
              disabled={isLoading || text.length === 0}
            >
              {isLoading ? "Pasting..." : "Paste"}
            </button>
          </form>
        </>
      )}
      {tab === "file" && <Uploadthing />}
      <ClearAllButton />
    </section>
  )
}
