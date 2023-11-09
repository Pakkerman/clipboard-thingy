import React from "react"
import toast from "react-hot-toast"

import { api } from "~/trpc/react"

import { useClipboardContext } from "../context/ClipboardContext"
import { useBoardId } from "../hooks/useBoardId"

import { IoCloseOutline } from "react-icons/io5"
import { HiExternalLink } from "react-icons/hi"

export function TextList() {
  const { setContent, selected, setSelected } = useClipboardContext()
  const boardId = useBoardId()
  const { data } = api.text.getAll.useQuery({ boardId })

  async function handleCopy(id: number, content: string) {
    await navigator.clipboard.writeText(content!)
    if (content) setContent(content)
    setSelected(id)

    toast.dismiss("copy success")
    toast.success("coped!", { id: "copy success" })
  }

  if (data && data.length === 0)
    return (
      <div className="flex h-full flex-col justify-center">
        <h1 className="text-center font-chakraPetch text-slate-900/30">
          so empty...
        </h1>
      </div>
    )

  return (
    <>
      {data?.map((item) => (
        <li
          key={item.id}
          className={`flex min-h-min w-full cursor-pointer items-center justify-between gap-2 rounded-xl border p-4 shadow-black/20 transition hover:shadow-md active:shadow-inner ${
            selected === item.id
              ? "shadow-inner hover:shadow-inner"
              : "shadow-none"
          }`}
          onClick={() => handleCopy(item.id, item.content || "")}
        >
          <p className="break-all">{item.content}</p>
          <div className="flex flex-col gap-2">
            <DeleteButton id={item.id} />
            <LinkButton url={item.content} />
          </div>
        </li>
      ))}
    </>
  )
}

type LinkButtonProps = { url: string | null }
function LinkButton({ url }: LinkButtonProps) {
  if (!url) return
  if (!url.startsWith("http")) return

  return (
    <button
      className="h-6 w-6 rounded-lg border hover:border-black/60"
      onClick={(event) => {
        event.stopPropagation()
        window.open(url, "_blank")
      }}
    >
      <HiExternalLink size={20} className="mx-auto" />
    </button>
  )
}

type DeleteButtonProps = { id: number }
function DeleteButton({ id }: DeleteButtonProps) {
  const utils = api.useUtils()
  const { mutate } = api.text.deleteById.useMutation({
    onSuccess: () => {
      utils.text.getAll.invalidate()
      toast.success("Deleted!")
    },
  })

  return (
    <button
      className="h-6 w-6 rounded-lg border hover:border-black/60"
      onClick={(event) => {
        event.stopPropagation()
        mutate({ id })
      }}
    >
      <IoCloseOutline size={22} className="mx-auto" />
    </button>
  )
}
