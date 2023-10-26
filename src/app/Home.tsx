import React from "react";
import { ClipboardItem, CrudShowcase } from "./page";

export default async function Home() {
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <ClipboardItem />
      <CrudShowcase />
      <Clipboard />
    </main>
  );
}
