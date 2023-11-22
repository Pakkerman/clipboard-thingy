"use client"

import React from "react"
import Link from "next/link"

import Clipboard from "~/app/_components/Clipboard"
import CreateItem from "../_components/CreateItem"
import Footer from "../_components/Footer"
import Nav from "../_components/Nav"

import toast from "react-hot-toast"
import { FiCopy, FiHome } from "react-icons/fi"
import QRCode from "../_components/QRCode"
import { useBoardContext } from "../context/BoardContext"
import { PasscodeInput } from "../_components/PinInput"
import { LoadingSpinner } from "../_components/LoadingSpinner"
import PinManager from "../_components/PinManager"

export default function Page() {
  const { loading, pin, setPin, locked } = useBoardContext()

  if (loading) return <LoadingSpinner />
  if (locked) return <PasscodeInput pin={pin} setPin={setPin} />

  return (
    <>
      <div className="flex h-[max(400px,100svh)] w-[clamp(300px,90%,375px)] flex-col items-center justify-center pt-5">
        <Clipboard />
        <Nav />
        <CreateItem />
      </div>
      <div className="flex h-[max(400px,100vh)] w-[clamp(300px,90%,375px)] flex-col  items-center justify-center gap-2 py-4 text-center text-sm text-gray-600 transition-all">
        <PinManager />
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

        <QRCode />
        <br />
        <Footer />
      </div>
    </>
  )
}
