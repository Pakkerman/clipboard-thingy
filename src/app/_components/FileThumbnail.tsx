import React from "react"
import Image from "next/image"
import { HiOutlineDocumentText } from "react-icons/hi"

type FileThumbnailProps = { url: string | null }
export function FileThumbnail(props: FileThumbnailProps) {
  const isImage = isImageFile(props.url)

  return (
    <div className="group">
      {/* {isImage && (
        <div className="group-hover:block fixed z-10 hidden top-0 left-0 bg-black/20 h-[100vh] w-[100vw]">
          <Image src={props.url!} alt="file preview" width={300} height={300} />
        </div>
      )} */}
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

function isImageFile(name: string | null): boolean {
  if (!name) return false
  if (
    name.endsWith(".png") ||
    name.endsWith(".jpg") ||
    name.endsWith(".jpeg") ||
    name.endsWith(".webp")
  )
    return true
  else return false
}
