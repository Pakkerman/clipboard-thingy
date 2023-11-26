import React, { useEffect, useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import usePinParams from "../hooks/usePinParams"

export default function QRCode() {
  const { setPinParams } = usePinParams()
  const [url, setUrl] = useState("")

  useEffect(() => {
    if (!window) return
    setUrl(window.location.href)
  }, [setPinParams])

  if (url === "") return <></>
  return (
    <div className="flex w-full flex-[0_0_400px] flex-col items-center justify-center">
      <QRCodeSVG
        value={url}
        size={200}
        className="mx-auto rounded-xl border border-orange-800/20 p-2 shadow-inner shadow-orange-950/40"
      />
      <p className="p-2 text-slate-700">
        Scan to open this board on other devices
      </p>
      {/* <p>{url}</p> */}
    </div>
  )
}
