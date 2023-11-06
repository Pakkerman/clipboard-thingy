import React from "react"
import Clipboard from "~/app/_components/Clipboard"
import CreateItem from "~/app/_components/CreateItem"
import Nav from "./_components/Nav"
import Footer from "./_components/Footer"

export default async function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-200 pb-20 text-slate-900">
      <h1 className="py-4 font-chakraPetch text-5xl italic tracking-wider">
        Clipbroker
      </h1>
      <Clipboard />
      <Nav />
      <CreateItem />
      <Footer />
    </main>
  )
}
