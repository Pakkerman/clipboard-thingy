import React from "react"
import { isMobile } from "react-device-detect"

import { BsArrowReturnLeft } from "react-icons/bs"
import { ImCommand } from "react-icons/im"
const ButtonIcon = {
  cmd: <ImCommand />,
  enter: <BsArrowReturnLeft />,
}

// Parent needs to have relative class
type ShortcutWrapperProps = { shortcuts: Array<string> }
export default function ShortcutWrapper({ shortcuts }: ShortcutWrapperProps) {
  if (isMobile) return <></>
  return (
    <ul className="absolute right-4 top-[50%] flex h-full translate-y-[-50%] items-center justify-center gap-2 opacity-70">
      {shortcuts.map((item, idx) => (
        <div key={idx}>{ButtonIcon[item]}</div>
      ))}
    </ul>
  )
}
