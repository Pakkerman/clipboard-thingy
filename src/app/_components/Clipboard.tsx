"use client"

import { inferRouterOutputs } from "@trpc/server"
import React, { useEffect } from "react"
import toast from "react-hot-toast"
import { PostRouter } from "~/server/api/routers/post"
import { api } from "~/trpc/react"
import { useClipboardContext } from "../context/ClipboardContext"

export default function Clipboard() {
  const utils = api.useUtils()
  const { data } = api.post.getAll.useQuery()

  // Refetching
  // useEffect(() => {
  //   const id = setInterval(() => utils.post.getAll.refetch(), 10000)
  //   return () => clearInterval(id)
  // }, [])

  return (
    <section className="min-w-[300px] rounded-xl shadow-inner shadow-black/30">
      <div className="rounded-xl border-orange-400 p-4">
        <ul className="flex flex-col gap-2 h-[500px] overflow-y-scroll ">
          {data?.map((item) => (
            <React.Fragment key={item.id}>
              <ItemCard item={item} />
            </React.Fragment>
          ))}
        </ul>
      </div>
    </section>
  )
}

type PostOutput = inferRouterOutputs<PostRouter>
type ItemCardProps = { item: PostOutput["getAll"][0] }

function ItemCard({ item }: ItemCardProps) {
  const { content, setContent } = useClipboardContext()

  async function handleClick() {
    await navigator.clipboard.writeText(item.name!)
    if (item.name) setContent(item.name)
    toast.dismiss("copy success")
    toast.success("coped!", { id: "copy success" })
  }

  return (
    <li
      className={`relative flex min-h-[80px] w-full cursor-pointer flex-col items-center justify-center rounded-xl  border  hover:shadow-md transition active:shadow-inner shadow-black/20 ${
        content === item.name ? "shadow-inner" : "shadow-none"
      }`}
      onClick={handleClick}
    >
      <DeleteButton id={item.id} />
      <p>{item.name}</p>
    </li>
  )
}
type DeleteButtonProps = { id: number }
function DeleteButton({ id }: DeleteButtonProps) {
  const utils = api.useUtils()
  const { mutate } = api.post.deleteById.useMutation({
    onSuccess: () => {
      utils.post.getAll.invalidate()
      toast.success("Deleted!")
    },
  })
  return (
    <button
      className="absolute right-2 top-2 h-6 w-6 z-10 border rounded-lg"
      onClick={(event) => {
        event.stopPropagation()
        mutate({ id: id })
      }}
    >
      X
    </button>
  )
}
