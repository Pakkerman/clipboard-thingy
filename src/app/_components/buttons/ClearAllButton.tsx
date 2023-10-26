"use client"

import React from "react"
import toast from "react-hot-toast"
import { api } from "~/trpc/react"

export default function ClearAllButton() {
  const utils = api.useUtils()
  const { mutate } = api.post.deleteAll.useMutation({
    onSuccess: () => {
      utils.post.getAll.invalidate()
      toast.success("Clear all!")
    },
  })
  return (
    <button className="rounded-xl border p-2" onClick={() => mutate()}>
      Delete All
    </button>
  )
}
