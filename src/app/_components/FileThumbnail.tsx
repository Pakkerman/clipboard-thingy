import React, { useState } from "react"
import Image from "next/image"

import { HiOutlineDocumentText } from "react-icons/hi"
import { isImageFile } from "~/lib/helpers"

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
          className={`fixed z-10 top-0 transition left-0 bg-black/40 h-[100vh] w-[100vw] flex flex-col justify-center items-center ${
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
          <div className="flex gap-2 w-[200px] justify-between"></div>
        </div>
      )}
      {isImage ? (
        <Image
          className="border rounded-lg w-[72px] h-[72px] object-cover"
          width={72}
          height={72}
          src={props.url && isImage ? props.url : "/images/file_icon.png"}
          alt="file thumbnail"
        />
      ) : (
        <HiOutlineDocumentText
          size={72}
          className="text-slate-600 border rounded-lg"
        />
      )}
    </div>
  )
}
