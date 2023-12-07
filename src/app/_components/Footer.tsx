import Link from "next/link"
import React from "react"

import { AiOutlineGithub } from "react-icons/ai"

export default function Footer() {
  return (
    <footer className="flex w-full items-center justify-center gap-2 p-2 font-chakraPetch text-xs text-gray-600 dark:text-orange-200/90">
      <p className="">A project by Pakerman</p>
      <Link
        href="https://github.com/Pakkerman/clipboard-thingy"
        target="_blank"
      >
        <AiOutlineGithub size={24} className="hover:text-orange-500 " />
      </Link>
    </footer>
  )
}
