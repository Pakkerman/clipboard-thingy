import React from "react"
import Image from "next/image"

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
      <Image
        className="border rounded "
        width={40}
        height={40}
        src={props.url && isImage ? props.url : "/images/file_icon.png"}
        alt="file thumbnail"
      />
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
