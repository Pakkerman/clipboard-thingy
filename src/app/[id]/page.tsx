"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"

import Clipboard from "~/app/_components/Clipboard"
import CreateItem from "../_components/CreateItem"
import Footer from "../_components/Footer"
import Nav from "../_components/Nav"

import toast from "react-hot-toast"
import { FiCopy, FiHome } from "react-icons/fi"
import QRCode from "../_components/QRCode"
import { useBoardContext } from "../context/BoardContext"
import { PasscodeInput } from "../_components/PasscodeInput"
import Loading from "../_components/Loading"

export default function Page() {
  const { id } = useParams()
  const [changePinInput, setChangePinInput] = useState("")
  const [showPinInput, setShowPinInput] = useState(false)
  const { boardData, loading, pin, setPin, locked, handleUpdatePin } =
    useBoardContext()

  if (loading) return <Loading />
  if (locked) return <PasscodeInput pin={pin} setPin={setPin} />

  return (
    <>
      <Clipboard />
      <Nav />
      <CreateItem />
      <div className="flex w-[332px] flex-col  items-center justify-center gap-2 py-4 text-center text-sm text-gray-600">
        <p>This is board #{id}</p>
        {!boardData?.pin && <p>Set pin to claim this board</p>}
        <button
          className="rounded-md border-[0.5px] border-black/20 px-4 py-2"
          onClick={() => {
            setShowPinInput(!showPinInput)
            if (showPinInput) handleUpdatePin(changePinInput)
          }}
        >
          {boardData?.pin ? "Change pin" : "Set pin"}
        </button>
        {showPinInput && (
          <input
            className="text-center"
            value={changePinInput}
            minLength={4}
            maxLength={4}
            placeholder={boardData?.pin ? boardData.pin : "----"}
            onChange={(event) => setChangePinInput(event.target.value)}
          />
        )}
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

      <QRCode />
      <Footer />
    </>
  )
}
