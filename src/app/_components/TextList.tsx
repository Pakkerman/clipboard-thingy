import React from "react"
import toast from "react-hot-toast"

import { api } from "~/trpc/react"

import { useClipboardContext } from "../context/ClipboardContext"
import { IoCloseOutline } from "react-icons/io5"
import { HiExternalLink } from "react-icons/hi"

export function TextList() {
  const { setContent, selected, setSelected } = useClipboardContext()
  const { data } = api.text.getAll.useQuery()

  async function handleCopy(id: number, content: string) {
    await navigator.clipboard.writeText(content!)
    if (content) setContent(content)
    setSelected(id)

    toast.dismiss("copy success")
    toast.success("coped!", { id: "copy success" })
  }

  return (
    <>
      {data?.map((item) => (
        <li
          key={item.id}
          className={`relative flex min-h-[80px] cursor-pointer flex-col items-center justify-center rounded-xl  border hover:shadow-md transition active:shadow-inner shadow-black/20 w-[300px] ${
            selected === item.id
              ? "shadow-inner hover:shadow-inner"
              : "shadow-none"
          }`}
          onClick={() => handleCopy(item.id, item.content || "")}
        >
          <DeleteButton id={item.id} />
          <LinkButton url={item.content} />
          <p className="w-[200px] truncate">{item.content}</p>
        </li>
      ))}
    </>
  )
}

function LinkButton({ url }: any) {
  if (!url.startsWith("http")) return <></>

  return (
    <button
      className="absolute right-2 bottom-2 h-6 w-6 z-10 border rounded-lg "
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
      className="absolute right-2 top-2 h-6 w-6 z-10 border rounded-lg"
      onClick={(event) => {
        event.stopPropagation()
        mutate({ id })
      }}
    >
      <IoCloseOutline size={22} className="mx-auto" />
    </button>
  )
}
