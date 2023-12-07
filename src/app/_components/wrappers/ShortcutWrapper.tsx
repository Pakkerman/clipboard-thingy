import React from "react"
import { isMobile } from "react-device-detect"

// Parent needs to have relative class
type ShortcutWrapperProps = { shortcuts: Array<string> }
export default function ShortcutWrapper({ shortcuts }: ShortcutWrapperProps) {
  if (isMobile) return <></>
  return (
    <ul className="absolute right-3 top-[50%] flex translate-y-[-50%] items-center gap-2 opacity-80">
      {shortcuts.map((item) => (
        <div className="rounded-md border-[0.5px] border-gray-800 px-2 py-1 text-xs text-gray-800">
          {item}
        </div>
      ))}
    </ul>
  )
}
