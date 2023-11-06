import React from "react"
import { AiOutlineGithub } from "react-icons/ai"

export default function Footer() {
  return (
    <footer className="text-grey-800 absolute bottom-0 left-0 flex w-full items-center justify-center gap-2 p-2 text-xs">
      <p className="">A project by Pakerman.</p>
      <AiOutlineGithub size={20} />
    </footer>
  )
}
