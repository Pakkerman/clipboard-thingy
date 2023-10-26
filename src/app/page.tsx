import React from "react"
import Clipboard from "~/app/_components/Clipboard"
import CreateItem from "~/app/_components/CreateItem"
import ClearAllButton from "./_components/buttons/ClearAllButton"

export default async function Home() {
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  // const allContent = await api.post.getAll.query();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* <ClipboardItem /> */}
      {/* <CrudShowcase /> */}
      <Clipboard />
      {/* <button
        onClick={() => {
          api.post.deleteAll.mutate();
        }}
      >
        Delete All
      </button> */}
      <CreateItem />
      <ClearAllButton />
    </main>
  )
}
