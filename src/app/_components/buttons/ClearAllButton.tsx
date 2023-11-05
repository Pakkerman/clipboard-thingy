"use client"

import React from "react"
import toast from "react-hot-toast"
import { api } from "~/trpc/react"

export default function ClearAllButton() {
  const utils = api.useUtils()
  const { mutate } = api.text.deleteAll.useMutation({
    onSuccess: () => {
      utils.text.getAll.invalidate()
      toast.success("Clear all!")
    },
  })
  return (
    <button className="rounded-xl border p-2" onClick={() => mutate()}>
      Clear All
    </button>
  )
}
