"use client"

import { useAutoAnimate } from "@formkit/auto-animate/react"
import React, { useState } from "react"
import toast from "react-hot-toast"
import { api } from "~/trpc/react"
import { MdCancel, MdCheckCircle } from "react-icons/md"

export default function ClearAllButton() {
  const utils = api.useUtils()
  const [pending, setPending] = useState(false)
  const [animationParent] = useAutoAnimate()
  const { mutate } = api.text.deleteAll.useMutation({
    onSuccess: () => {
      utils.text.getAll.invalidate()
      toast.success("Clear all!")
      setPending(false)
    },
  })
  return (
    <div ref={animationParent} className="flex w-full justify-center gap-2 p-4">
      {!pending && (
        <button
          className="grow rounded-xl border border-red-500 p-2 transition hover:bg-red-500 active:translate-y-[2px]"
          onClick={() => setPending(true)}
        >
          Clear All
        </button>
      )}
      {pending && (
        <>
          <button
            className="flex grow items-center justify-center gap-1 rounded-xl border border-blue-500 p-2 transition hover:bg-blue-500 active:translate-y-[2px]"
            onClick={() => setPending(false)}
          >
            Cancel <MdCancel size={20} />
          </button>
          <button
            className="flex grow items-center justify-center gap-1 rounded-xl border border-red-500 p-2 transition hover:bg-red-500 active:translate-y-[2px]"
            onClick={() => mutate()}
          >
            Confirm <MdCheckCircle size={20} />
          </button>
        </>
      )}
    </div>
  )
}
