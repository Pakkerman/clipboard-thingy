import { BoardContextProvider } from "../context/BoardContext"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <BoardContextProvider>
      <main className="relative flex min-h-[100svh] flex-col items-center justify-center font-chakraPetch text-slate-900 transition-all ">
        {children}
      </main>
    </BoardContextProvider>
  )
}
