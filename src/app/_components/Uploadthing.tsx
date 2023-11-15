"use client"

import { generateComponents } from "@uploadthing/react"
import type { OurFileRouter } from "~/app/api/uploadthing/core"
import React from "react"
import toast from "react-hot-toast"
import { api } from "~/trpc/react"
import { useNavContext } from "../context/NavContext"
import { useParamId } from "../hooks/useParamId"

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>()

export default function uploadthing() {
  const utils = api.useUtils()
  const boardId = useParamId()
  const { setTab } = useNavContext()
  const { mutate } = api.file.createRecord.useMutation({
    onSuccess: async () => {
      utils.file.getAll.invalidate()
      toast.success("Upload Completed", { id: "upload file" })
      setTab("file")
      window.scrollTo({ behavior: "smooth", top: 0 })
    },
  })

  return (
    <UploadButton
      className="cursor-pointer select-none font-chakraPetch ut-button:w-[325px] ut-button:rounded-lg ut-button:border-[0.5px] ut-button:border-slate-900/20 ut-button:bg-orange-500/70 ut-button:px-10 ut-button:py-3 ut-button:font-semibold ut-button:text-gray-800 ut-button:drop-shadow-md ut-button:transition ut-button:focus-within:ring-0 ut-button:focus-within:ring-offset-0 ut-button:hover:bg-orange-500 ut-button:ut-uploading:after:bg-orange-600"
      endpoint="fileUploader"
      onClientUploadComplete={(res) => {
        // console.log("Files: ", res)

        if (!res) return
        for (const item of res) {
          const { name, url, size, key } = item
          mutate({ boardId, name, url, size, key })
        }
      }}
      onUploadError={(error: Error) => {
        toast.error(`ERROR! ${error.message}`)
      }}
    />
  )
}
