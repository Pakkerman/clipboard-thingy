"use client"

import { useAutoAnimate } from "@formkit/auto-animate/react"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { api } from "~/trpc/react"
import { MdCancel, MdCheckCircle } from "react-icons/md"
import { useNavContext } from "~/app/context/NavContext"
import { useBoardId } from "~/app/hooks/useBoardId"

export default function ClearAllButton() {
  const utils = api.useUtils()
  const { tab } = useNavContext()
  const [pending, setPending] = useState(false)
  const boardId = useBoardId()
  const [animationParent] = useAutoAnimate()

  const { mutate: deleteAllText } = api.text.deleteAll.useMutation({
    onSuccess: () => {
      utils.text.getAll.invalidate()
      toast.success("Cleared all texts!", { id: "clear all" })
      setPending(false)
    },
    onMutate: () => {
      toast.loading("Deleting all", { id: "clear all" })
    },
  })

  const { mutate: deleteAllFile } = api.file.deleteAll.useMutation({
    onSuccess: () => {
      utils.file.getAll.invalidate()
      toast.success("Cleared all files!", { id: "clear all" })
      setPending(false)
    },
    onMutate: () => {
      toast.loading("Deleting all", { id: "clear all" })
    },
  })

  useEffect(() => {
    setPending(false)
  }, [tab])

  const mutate = tab === "text" ? deleteAllText : deleteAllFile

  return (
    <div ref={animationParent} className="flex w-full justify-center gap-2 p-4">
      {!pending && (
        <button
          className="grow select-none rounded-xl border border-red-500 p-2 transition hover:bg-red-500 active:translate-y-[2px] disabled:opacity-50"
          onClick={() => setPending(true)}
        >
          Clear All
        </button>
      )}
      {pending && (
        <>
          <button
            className="flex grow select-none items-center justify-center gap-1 rounded-xl border border-blue-500 p-2 transition hover:bg-blue-500 active:translate-y-[2px]"
            onClick={() => setPending(false)}
          >
            Cancel <MdCancel size={20} />
          </button>
          <button
            className="flex grow items-center justify-center gap-1 rounded-xl border border-red-500 p-2 transition hover:bg-red-500 active:translate-y-[2px]"
            onClick={() => mutate({ boardId })}
          >
            Delete <MdCheckCircle size={20} />
          </button>
        </>
      )}
    </div>
  )
}
