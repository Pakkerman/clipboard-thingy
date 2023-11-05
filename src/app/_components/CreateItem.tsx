"use client"

import React, { useEffect, useState } from "react"
import { api } from "~/trpc/react"
import { useClipboardContext } from "../context/ClipboardContext"

export default function CreatItem() {
  const { content } = useClipboardContext()
  const utils = api.useUtils()
  const [text, setText] = useState("")

  const { mutate, isLoading } = api.text.create.useMutation({
    onSettled: () => {
      utils.text.getAll.invalidate()
      setText("")
    },

    // onMutate: (input) => {
    //   const prev = utils.text.getAll.getData()
    //   if (!prev) return
    //   utils.text.getAll.setData(undefined, [
    //     {
    //       id: 99999,
    //       content: input.content,
    //       createdAt: new Date(),
    //       updatedAt: null,
    //       userId: null,
    //     },
    //     ...prev,
    //   ])
    // },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        mutate({ content: text })
      }}
      className="flex flex-col gap-2 p-4"
    >
      <input
        type="text"
        placeholder="Type Something"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black drop-shadow-md"
      />
      <button
        type="submit"
        className="rounded-full bg-slate-500/10 drop-shadow-md border-[0.5px] border-slate-900/20 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={isLoading || text.length === 0}
      >
        {isLoading ? "Pasting..." : "Paste"}
      </button>
    </form>
  )
}
