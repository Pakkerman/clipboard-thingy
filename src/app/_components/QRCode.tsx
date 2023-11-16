import React, { useEffect, useState } from "react"
import { QRCodeSVG } from "qrcode.react"

export default function QRCode() {
  const [url, setUrl] = useState("")

  useEffect(() => {
    if (!window) return
    setUrl(window.location.href)
  }, [window.location.href])

  if (url === "") return <></>
  return (
    <>
      <p className="p-2">Scan to open this board on other devices</p>
      <QRCodeSVG
        value={url}
        className="rounded-xl border border-orange-800/20 p-2 shadow-inner shadow-orange-950/20"
      />
      <p>{url}</p>
    </>
  )
}
