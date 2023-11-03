import React from "react"

type DownloadFileButtonProps = { url: string }
export function DownloadButton(props: DownloadFileButtonProps) {
  return (
    <button
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
      Download
    </button>
  )
}
