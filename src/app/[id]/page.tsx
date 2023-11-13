"use client"

import React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"

import Clipboard from "~/app/_components/Clipboard"
import CreateItem from "../_components/CreateItem"
import Footer from "../_components/Footer"
import Nav from "../_components/Nav"

import toast from "react-hot-toast"
import { FiCopy, FiHome } from "react-icons/fi"

export default function Page() {
  const { id } = useParams()

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-orange-50 to-gray-50 pb-20 pt-5 font-chakraPetch text-slate-900 transition">
      <Clipboard />
      <Nav />
      <CreateItem />
      <div className="flex w-[332px] flex-col  items-center justify-center gap-2 py-4 text-center text-sm text-gray-600">
        <p>This is board #{id}</p>
        <p>Set pin to claim this board</p>
        <p>
          If you don't see your content, make sure your devices are on the same
          board number
        </p>
        <div className="flex gap-2">
          <Link
            className="flex select-none items-center gap-1 rounded-md border border-orange-400/80 px-2 py-1 text-sm transition hover:bg-orange-400 hover:text-orange-950 active:translate-y-[2px]"
            href="/"
          >
            Go home <FiHome />
          </Link>
          <button
            className="flex select-none items-center gap-1 rounded-md border border-orange-400/80 px-2 py-1 text-sm transition hover:bg-orange-400 hover:text-orange-950 active:translate-y-[2px]"
            onClick={async () => {
              await navigator.clipboard.writeText(window.location.toString())
              toast.success("Board Id copied!")
            }}
          >
            Copy board link <FiCopy />
          </button>
        </div>
      </div>
      <Footer />
    </main>
  )
}
