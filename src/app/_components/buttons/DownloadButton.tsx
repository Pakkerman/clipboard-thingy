import React from "react"
import { FiDownload } from "react-icons/fi"

type DownloadFileButtonProps = { url: string }
export function DownloadButton(props: DownloadFileButtonProps) {
  return (
    <button
      className="h-6 z-10 border rounded-lg flex items-center grow gap-1 justify-center"
      onClick={() =>
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
          })
      }
    >
      <span className="text-sm">Download</span>
      <FiDownload size={14} />
    </button>
  )
}
