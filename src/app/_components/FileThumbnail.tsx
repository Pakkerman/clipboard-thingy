import React, { useState } from "react"
import Image from "next/image"

import { HiOutlineDocumentText } from "react-icons/hi"
import { isImageFile } from "~/app/lib/helpers"

type FileThumbnailProps = { url: string | null }
export function FileThumbnail(props: FileThumbnailProps) {
  const [show, setShow] = useState(false)
  const isImage = isImageFile(props.url)

  return (
    <div className="group" onClick={() => setShow(true)}>
      {isImage && show && (
        <div
          onClick={(event) => {
            event.stopPropagation()
            setShow(false)
          }}
          className={`fixed left-0 top-0 z-10 flex h-[100vh] w-[100vw] flex-col items-center justify-center bg-black/40 transition ${
            show ? "block" : "hidden"
          }`}
        >
          <Image
            className="z-10"
            src={props.url!}
            alt="file preview"
            width={300}
            height={300}
            onLoad={() => console.log("loading", props.url)}
          />
          <div className="flex w-[200px] justify-between gap-2"></div>
        </div>
      )}
      {isImage ? (
        <div className="h-[72px] w-[72px] ">
          <Image
            className="h-full w-full rounded-lg border  object-cover "
            width={72}
            height={72}
            src={props.url && isImage ? props.url : "/images/file_icon.png"}
            alt="file thumbnail"
            placeholder={`data:image/${"/images/file_icon.png"}`}
          />
        </div>
      ) : (
        <HiOutlineDocumentText
          size={72}
          className="rounded-lg border text-slate-600"
        />
      )}
    </div>
  )
}
