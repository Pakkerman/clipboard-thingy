import React, { useEffect, useState } from "react"
import { QRCodeSVG } from "qrcode.react"

export default function QRCode() {
  const [url, setUrl] = useState("")

  useEffect(() => {
    setUrl(window.location.href)
  }, [window.location.href])

  if (url === "") return <></>
  return <QRCodeSVG value={url} />
}
