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
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createPost.isLoading || name.length === 0}
      >
        {createPost.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  )
}
