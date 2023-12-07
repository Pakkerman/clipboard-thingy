import { BoardContextProvider } from "../context/BoardContext"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <BoardContextProvider>
      <main className="scrollbar-hidden relative h-[100vh] w-[min(100vw,768px)] snap-y snap-mandatory overflow-y-scroll font-chakraPetch text-slate-900 md:mx-auto md:flex md:justify-center">
        {children}
      </main>
    </BoardContextProvider>
  )
}
