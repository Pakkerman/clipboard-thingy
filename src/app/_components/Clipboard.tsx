"use client"

import React from "react"
import toast from "react-hot-toast"
import { api } from "~/trpc/react"

export default function Clipboard() {
  const { data } = api.post.getAll.useQuery()

  return (
    <div className="min-w-[300px]">
      <div className="rounded-xl border border-orange-400 p-4">
        <ul className="flex flex-col gap-2 h-[500px] overflow-y-scroll">
          {data?.map((item) => (
            <React.Fragment key={item.id}>
              <ItemCard item={item} />
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ItemCard(props: any) {
  function handleClick(event: any) {
    navigator.clipboard.writeText(event.target.innerText)
    toast.dismiss("copy success")
    toast.success("coped!", { id: "copy success" })
  }

  return (
    <li
      className="relative flex min-h-[80px] w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-slate-400"
      onClick={(event) => handleClick(event)}
    >
      <p>{props.item.name}</p>
      <DeleteButton id={props.item.id} />
    </li>
  )
}

function DeleteButton({ id }: any) {
  const utils = api.useUtils()
  const { mutate } = api.post.deleteById.useMutation({
    onSuccess: () => {
      utils.post.getAll.invalidate()
      toast.success("Deleted!")
    },
  })
  return (
    <button
      className="absolute right-2 top-2 h-4 w-4"
      onClick={() => mutate({ id: id })}
    >
      X
    </button>
  )
}
