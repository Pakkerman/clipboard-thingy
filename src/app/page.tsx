import React from "react"

import BoardManager from "./_components/BoardManager"
import Footer from "./_components/Footer"

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-orange-50/50 to-gray-50 text-slate-900">
      <h1 className="py-20 font-chakraPetch text-6xl italic tracking-wider text-orange-950">
        Clipbroker
      </h1>
      <BoardManager />
      <Footer />
    </main>
  )
}
