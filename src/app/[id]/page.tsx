"use client"

import React, { useEffect } from "react"
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

  useEffect(() => {
    // window.scrollTo({ behavior: "smooth", top: 800 })
  }, [])

  return (
    <>
      <section className="h-[max(400px,100vh)] w-full">
        <div className="flex h-[100dvh] w-full flex-col items-center justify-center py-4 transition-all">
          <Clipboard />
          <Nav />
          <CreateItem />
        </div>
      </section>
      <section className="flex h-[max(400px,100vh)] w-full flex-col  items-center gap-2 pt-4 text-center text-sm text-gray-600 transition-all">
        <div className="flex h-[100dvh] flex-col items-center gap-2 py-4 transition-all">
          <QRCode />
          <PinManager />
          <div className="flex w-[90%] grow items-end gap-2">
            <Link
              className="text-md flex w-[50%] select-none items-center justify-center gap-1 rounded-lg border border-orange-400/80 p-2 text-center transition hover:bg-orange-400 hover:text-orange-950 active:translate-y-[2px]"
              href="/"
            >
              Go home <FiHome />
            </Link>
            <button
              className="text-md flex w-[50%] select-none items-center justify-center gap-1 rounded-lg border border-orange-400/80 p-2 transition hover:bg-orange-400 hover:text-orange-950 active:translate-y-[2px]"
              onClick={async () => {
                await navigator.clipboard.writeText(window.location.toString())
                toast.success("Board Id copied!")
              }}
            >
              Copy board link <FiCopy />
            </button>
          </div>
          <Footer />
        </div>
      </section>
    </>
  )
}
