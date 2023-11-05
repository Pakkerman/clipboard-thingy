"use client"

import { generateComponents } from "@uploadthing/react"
import type { OurFileRouter } from "~/app/api/uploadthing/core"
import React from "react"
import toast from "react-hot-toast"
import { api } from "~/trpc/react"

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>()

export default function uploadthing() {
  const utils = api.useUtils()
  const { mutate } = api.file.createRecord.useMutation({
    onSuccess: async () => {
      utils.file.getAll.invalidate()
      toast.success("Upload Completed")
    },
  })

  return (
    <UploadDropzone
      className="cursor-pointer"
      endpoint="uploader"
      onClientUploadComplete={(res) => {
        // console.log("Files: ", res)

        if (!res) return
        for (const item of res) {
          const { name, url, size, key } = item
          mutate({ name, url, size, key })
        }
      }}
      onUploadError={(error: Error) => {
        toast.error(`ERROR! ${error.message}`)
      }}
    />
  )
}
