import React from "react"
import Image from "next/image"

import BoardManager from "./_components/BoardManager"
import Footer from "./_components/Footer"
import { ThemeButton } from "./_components/buttons/ThemeButton"

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-orange-100 to-gray-50 text-orange-950 dark:from-orange-950 dark:to-slate-950 dark:text-orange-50">
      <h1 className="relative select-none bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text py-20 font-chakraPetch text-[min(3.75rem,15vw)] font-bold uppercase italic tracking-tight text-transparent ">
        Clipbroker
      </h1>
      <BoardManager />
      <Footer />
      <ThemeButton />
    </main>
  )
}
