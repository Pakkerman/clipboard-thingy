"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import React, { useEffect } from "react"
import Clipboard from "~/app/_components/Clipboard"
import CreateItem from "../_components/CreateItem"
import Footer from "../_components/Footer"
import Nav from "../_components/Nav"

export default function Page() {
  const { id } = useParams()

  // const { setBoardId } = useBoardContext()

  // useEffect(() => {
  //   setBoardId(id)
  // }, [id])

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-orange-50/50 to-gray-50 pb-20 pt-5 font-chakraPetch text-slate-900">
      <Clipboard />
      <Nav />
      <CreateItem />
      <div className="w-[332px] py-4 text-center  text-sm text-gray-600">
        <p>This is board #{id}</p>
        <p>
          If you don't see your content, make sure your devices are on the same
          board number
        </p>
      </div>
      <Link href="/">Go home</Link>
      <Footer />
    </main>
  )
}
