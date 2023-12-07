"use client"

import React, { useEffect, useRef, useState } from "react"
import { api } from "~/trpc/react"
import toast from "react-hot-toast"
import { useAutoAnimate } from "@formkit/auto-animate/react"

import { useNavContext } from "../context/NavContext"
import useParamId from "../hooks/useParamId"

import Uploadthing from "./Uploadthing"
import ClearAllButton from "./buttons/ClearAllButton"

import { IoReturnDownBackSharp } from "react-icons/io5"
import { BiCommand } from "react-icons/bi"
import ShortcutWrapper from "./wrappers/ShortcutWrapper"

export default function CreatItem() {
  const [animationParent] = useAutoAnimate()
  const { tab } = useNavContext()

  return (
    <section
      className="flex min-h-[200px] w-full flex-col justify-between font-chakraPetch transition-all"
      ref={animationParent}
    >
      {tab === "text" && <CreateTextWizard />}
      {tab === "file" && <Uploadthing />}
      <ClearAllButton />
    </section>
  )
}

function CreateTextWizard() {
  const boardId = useParamId()
  const { setTab } = useNavContext()

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [text, setText] = useState("")

  const utils = api.useUtils()
  const { mutate, isLoading } = api.text.create.useMutation({
    onMutate: () => {
      if (text.length === 0 && textareaRef.current) textareaRef.current.focus()
    },
    onSuccess: () => {
      utils.text.getAll.invalidate()
      setText("")
      setTab("text")
      window.scrollTo({ behavior: "smooth", top: 0 })
      // reset text area rows
      if (textareaRef.current) textareaRef.current.rows = 2
    },
    onError: (error) => {
      toast.error(
        error.data?.zodError?.fieldErrors?.text?.[0] || "Somthing went wrong",
      )
    },
  })

  function handleKeyPress(event: KeyboardEvent) {
    if (text.length === 0) return
    if (event.key === "Enter" && event.metaKey) mutate({ text, boardId })
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [text])

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          mutate({ text, boardId })
        }}
        className="flex flex-col gap-4 px-4"
      >
        {text.length > 3000 && <div className="text-red-400">too long</div>}
        <textarea
          ref={textareaRef}
          className="w-full rounded-lg px-4 py-2 text-black shadow-md"
          onChange={(e) => setText(e.target.value)}
          placeholder="Type Something"
          value={text}
          minLength={1}
          cols={30}
          rows={calculateTextAreaHeight(textareaRef.current?.scrollHeight)}
        />
        <button
          type="submit"
          className="relative select-none rounded-xl border-[0.5px] border-orange-400 border-slate-900/20 bg-orange-400 p-2 text-lg text-orange-950 shadow-md  shadow-orange-950/30 transition hover:bg-orange-500 hover:shadow-none hover:shadow-orange-950 active:shadow-inner active:shadow-orange-950"
          disabled={isLoading || text.length === 0}
        >
          {isLoading ? "Pasting..." : "Paste"}
          <ShortcutWrapper shortcuts={["cmd", "enter"]} />
        </button>
      </form>
    </>
  )
}

function calculateTextAreaHeight(scrollHeight: number | undefined): number {
  if (!scrollHeight) return 2

  const rows = Math.floor(1 + (scrollHeight - 40) / 24)
  if (rows > 7) return 7
  else return rows
}
