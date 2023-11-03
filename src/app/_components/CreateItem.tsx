"use client"

import React, { useEffect, useState } from "react"
import { api } from "~/trpc/react"
import { useClipboardContext } from "../context/ClipboardContext"

export default function CreatItem() {
  const { content } = useClipboardContext()
  const utils = api.useUtils()
  const [name, setName] = useState("")

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      utils.post.getAll.invalidate()
      setName("")
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        createPost.mutate({ name })
      }}
      className="flex flex-col gap-2 p-4"
    >
      <input
        type="text"
        placeholder="Type Something"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black drop-shadow-md"
      />
      <button
        type="submit"
        className="rounded-full bg-slate-500/10 drop-shadow-md border-[0.5px] border-slate-900/20 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createPost.isLoading || name.length === 0}
      >
        {createPost.isLoading ? "Saving..." : "Save"}
      </button>
    </form>
  )
}
