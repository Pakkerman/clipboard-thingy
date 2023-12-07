"use client"

import React from "react"
import Link from "next/link"
import toast from "react-hot-toast"

import { useBoardContext } from "../context/BoardContext"

import Nav from "../_components/Nav"
import Clipboard from "~/app/_components/Clipboard"
import CreateItem from "../_components/CreateItem"
import Footer from "../_components/Footer"
import QRCode from "../_components/QRCode"
import PasscodeInput from "../_components/PinInput"
import LoadingSpinner from "../_components/LoadingSpinner"
import PinManager from "../_components/PinManager"
import ButtonWrapper from "../_components/wrappers/ButtonWrapper"

import { FiCopy, FiHome } from "react-icons/fi"

export default function Page() {
  const { loading, pin, setPin, locked } = useBoardContext()

  if (loading) return <LoadingSpinner />
  if (locked) return <PasscodeInput pin={pin} setPin={setPin} />

  // useEffect(() => {
  //   // window.scrollTo({ behavior: "smooth", top: 800 })
  // }, [])

  return (
    <>
      <section className="mx-auto h-[100vh] w-[min(90%,375px)] snap-start md:w-[380px]">
        <div className="flex h-[100dvh] w-full snap-always flex-col items-center justify-center py-4 transition-all duration-500">
          <Clipboard />
          <Nav />
          <CreateItem />
        </div>
      </section>

      <section className=" mx-auto flex h-[100vh] w-[min(90%,375px)] snap-start snap-always flex-col items-center gap-2 pt-4 text-center text-sm text-gray-600 md:w-[380px]">
        <div className="flex h-[95dvh] w-full flex-col items-center gap-2 pt-4 transition-all duration-500">
          <QRCode />
          <PinManager />
          <div className="flex w-[90%] grow items-end gap-2">
            <Link className="w-[50%]" href="/">
              <ButtonWrapper>
                Go home <FiHome />
              </ButtonWrapper>
            </Link>
            <button
              className="w-[50%] "
              onClick={async () => {
                await navigator.clipboard.writeText(window.location.toString())
                toast.success("Board Id copied!")
              }}
            >
              <ButtonWrapper>
                Copy board link <FiCopy />
              </ButtonWrapper>
            </button>
          </div>
          <Footer />
        </div>
      </section>
    </>
  )
}
