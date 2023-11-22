import React from "react"

import BoardManager from "./_components/BoardManager"
import Footer from "./_components/Footer"
import { ThemeButton } from "./_components/buttons/ThemeButton"

export default async function Home() {
  return (
    <main className="flex h-[max(100dvh,650px)] flex-col items-center justify-center transition-all">
      <div className="flex grow flex-col items-center justify-center">
        <h1 className="relative select-none bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text py-20 font-chakraPetch text-[min(3.75rem,15vw)] font-bold uppercase italic tracking-tight text-transparent ">
          Clipbroker
        </h1>
        <BoardManager />
      </div>
      <Footer />
      <ThemeButton />
    </main>
  )
}
