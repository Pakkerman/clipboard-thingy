import React from "react"
import Clipboard from "~/app/_components/Clipboard"
import CreateItem from "~/app/_components/CreateItem"
import ClearAllButton from "./_components/buttons/ClearAllButton"
import Uploadthing from "./_components/Uploadthing"
import Nav from "./_components/Nav"
import { useNavContext } from "./context/NavContext"
// import { utapi } from "~/server/uploadthing"

export default async function Home() {
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  // const allContent = await api.post.getAll.query();

  // Get files list
  // const files = await utapi.listFiles()
  // console.log(files)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-200 text-slate-900 pb-20">
      <h1 className="text-4xl py-4">ClipBroker</h1>
      <Clipboard />
      <Nav />
      <CreateItem />
      <ClearAllButton />
      <Uploadthing />
    </main>
  )
}
