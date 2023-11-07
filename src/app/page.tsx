import React from "react"
import BoardManager from "./_components/BoardManager"

export default async function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-orange-50/50 to-gray-50 pb-20 text-slate-900">
      <h1 className="py-4 font-chakraPetch text-5xl italic tracking-wider">
        Clipbroker
      </h1>
      <BoardManager />
    </main>
  )
}
