import React from "react"
import toast from "react-hot-toast"

import { api } from "~/trpc/react"

import { FileThumbnail } from "./FileThumbnail"
import { isImageFile } from "~/app/lib/helpers"
import { useBoardId } from "../hooks/useBoardId"

import { HiOutlineDocumentText, HiOutlinePhotograph } from "react-icons/hi"
import { FiDownload } from "react-icons/fi"
import { FiTrash2 } from "react-icons/fi"

export function FileList() {
  const utils = api.useUtils()
  const boardId = useBoardId()

  const { data } = api.file.getAll.useQuery({ boardId })
  const { mutate } = api.file.deleteRecord.useMutation({
    onSuccess: () => {
      void utils.file.getAll.invalidate()
      toast.success("Deleted", { id: "file deleted" })
    },
    onMutate: async (input) => {
      const { id } = input
      const prev = utils.file.getAll.getData()?.filter((item) => item.id !== id)
      utils.file.getAll.setData({ boardId }, prev) // smt weird with first param
      return prev
    },
  })

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
          className="flex min-h-[90px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl border p-4 shadow-black/20 transition hover:shadow-md active:shadow-inner"
        >
          <div className="flex grow flex-col gap-2">
            <div className="flex h-8 items-center justify-between rounded-lg border">
              <p className="w-10 grow truncate pl-2">{item.name}</p>
              <div className="flex pr-1">
                <p className="text-sm uppercase">
                  {"| "}
                  {item.name.split(".").at(-1)}
                </p>
                {isImageFile(item.name) ? (
                  <HiOutlinePhotograph size={20} />
                ) : (
                  <HiOutlineDocumentText size={18} />
                )}
              </div>
            </div>
            <div className="flex grow justify-between gap-2">
              <DownloadButton url={item.url} />
              <DeleteButton
                handleClick={() => mutate({ id: item.id, key: item.key })}
              />
            </div>
          </div>
          <FileThumbnail url={item.url} />
        </li>
      ))}
    </>
  )
}

type DeleteButtonProps = { handleClick: () => void }
export function DeleteButton(props: DeleteButtonProps) {
  const { handleClick } = props

  return (
    <button
      className="flex h-6 grow items-center justify-center gap-1 rounded-lg border pl-1 pt-[1px] hover:border-black/60"
      onClick={handleClick}
    >
      <span className="text-sm ">Delete</span>
      <FiTrash2 size={14} />
    </button>
  )
}

type DownloadFileButtonProps = { url: string }
export function DownloadButton(props: DownloadFileButtonProps) {
  return (
    <button
      className="flex h-6 grow items-center justify-center gap-1 rounded-lg border pt-[1px] hover:border-black/60"
      onClick={() => {
        toast.loading("Getting file...", { id: "fetching file" })
        fetch(props.url, {
          method: "GET",
        })
          .then((response) => response.blob())
          .then((blob) => {
            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([blob]))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `FileName.pdf`)

            // Append to html link element page
            document.body.appendChild(link)
            // Start download
            link.click()
            // Clean up and remove the link
            link.parentNode?.removeChild(link)

            toast.success("File downloaded", { id: "fetching file" })
          })
      }}
    >
      <span className="text-sm">Download</span>
      <FiDownload size={14} />
    </button>
  )
}
