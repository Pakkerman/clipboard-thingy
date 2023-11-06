import React from "react"
import toast from "react-hot-toast"

import { api } from "~/trpc/react"

import { HiOutlineDocumentText, HiOutlinePhotograph } from "react-icons/hi"
import { FiDownload } from "react-icons/fi"
import { IoCloseOutline } from "react-icons/io5"

import { FileThumbnail } from "./FileThumbnail"
import { isImageFile } from "~/lib/helpers"

export function FileList() {
  const utils = api.useUtils()
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

  return (
    <>
      {fileData?.map((item) => (
        <li
          key={item.id}
          className="flex min-h-[90px] cursor-pointer  items-center justify-center rounded-xl  border hover:shadow-md transition active:shadow-inner shadow-black/20 w-[300px] gap-2"
        >
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
              <DeleteButton
                handleClick={() => deleteFile({ id: item.id, key: item.key })}
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
      className="h-6 border rounded-lg flex items-center pl-1 grow gap-1 hover:border-black justify-center"
      onClick={handleClick}
    >
      <span className="text-sm">Delete</span>
      <IoCloseOutline size={20} />
    </button>
  )
}

type DownloadFileButtonProps = { url: string }
export function DownloadButton(props: DownloadFileButtonProps) {
  return (
    <button
      className="h-6 border rounded-lg flex items-center grow gap-1 justify-center"
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
