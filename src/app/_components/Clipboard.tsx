"use client"

import { inferRouterOutputs } from "@trpc/server"
import React from "react"
import toast from "react-hot-toast"
import { TextRouter } from "~/server/api/routers/text"
import { api } from "~/trpc/react"
import { useClipboardContext } from "../context/ClipboardContext"
import { useNavContext } from "../context/NavContext"
import { DownloadButton } from "./buttons/DownloadButton"
import { FileThumbnail } from "./FileThumbnail"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import {
  HiExternalLink,
  HiOutlinePhotograph,
  HiOutlineDocumentText,
} from "react-icons/hi"
import { IoCloseOutline } from "react-icons/io5"
import { isImageFile } from "~/lib/helpers"

export default function Clipboard() {
  const utils = api.useUtils()
  const { tab } = useNavContext()
  const { data: textData } = api.text.getAll.useQuery()
  const { data: fileData } = api.file.getAll.useQuery()
  const { mutate: deleteFile } = api.file.deleteRecord.useMutation({
    onSuccess: () => {
      void utils.file.getAll.invalidate()
      toast.success("file deleted")
    },
    onMutate: async (input) => {
      const { id } = input
      const prev = utils.file.getAll.getData()?.filter((item) => item.id !== id)
      utils.file.getAll.setData(undefined, prev)
      return prev
    },
  })

  const { mutate: deleteAllFiles } = api.file.deleteAll.useMutation({
    onSuccess: async () => {
      try {
        await utils.file.getAll.reset()
        toast.success("delete all files")
      } catch (error) {
        console.log(error)
      }
    },
  })

  const [animationParent] = useAutoAnimate()

  // Refetching
  // useEffect(() => {
  //   const id = setInterval(() => utils.post.getAll.refetch(), 10000)
  //   return () => clearInterval(id)
  // }, [])

  return (
    <section className="w-[332px] rounded-xl shadow-inner shadow-black/30 bg-slate-200/20">
      <div className="rounded-xl border-orange-400 py-2">
        <ul
          ref={animationParent}
          className="flex flex-col gap-2 h-[500px] overflow-y-scroll px-4 py-2"
        >
          {tab === "text" &&
            textData?.map((item) => (
              <React.Fragment key={item.id}>
                <ItemCard item={item} />
              </React.Fragment>
            ))}
          {tab === "file" &&
            fileData?.map((item) => (
              <React.Fragment key={item.id}>
                <li className="relative flex min-h-[90px] cursor-pointer  items-center justify-center rounded-xl  border hover:shadow-md transition active:shadow-inner shadow-black/20 w-[300px] gap-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex border rounded-lg h-8 items-center">
                      <p className="w-[150px] line-clamp-1 pl-2">{item.name}</p>
                      <div className="w-[50px] flex pr-1">
                        <p className="text-sm uppercase">
                          {item.name.split(".").at(-1)}
                        </p>
                        {isImageFile(item.name) ? (
                          <HiOutlinePhotograph size={20} />
                        ) : (
                          <HiOutlineDocumentText size={18} />
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 w-[200px] justify-between">
                      <DownloadButton url={item.url} />
                      <button
                        className="h-6 z-10 border rounded-lg flex items-center pl-1 grow gap-1 hover:border-black justify-center"
                        onClick={() =>
                          deleteFile({ id: item.id, key: item.key! })
                        }
                      >
                        <span className="text-sm">Delete</span>
                        <IoCloseOutline size={20} />
                      </button>
                    </div>
                  </div>
                  <FileThumbnail url={item.url} />
                </li>
              </React.Fragment>
            ))}
        </ul>
      </div>
      <button onClick={() => deleteAllFiles()}>delete all files</button>
    </section>
  )
}

type TextOutput = inferRouterOutputs<TextRouter>
type ItemCardProps = { item: TextOutput["getAll"][0] }

function ItemCard({ item }: ItemCardProps) {
  const { content, setContent, selected, setSelected } = useClipboardContext()

  async function handleClick() {
    await navigator.clipboard.writeText(item.content!)
    if (item.content) setContent(item.content)
    setSelected(item.id)

    toast.dismiss("copy success")
    toast.success("coped!", { id: "copy success" })
  }

  return (
    <li
      className={`relative flex min-h-[80px] cursor-pointer flex-col items-center justify-center rounded-xl  border hover:shadow-md transition active:shadow-inner shadow-black/20 w-[300px] ${
        selected === item.id ? "shadow-inner hover:shadow-inner" : "shadow-none"
      }`}
      onClick={handleClick}
    >
      <DeleteButton id={item.id} />
      <LinkButton url={item.content} />
      <p className="w-[200px] truncate">{item.content}</p>
    </li>
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
