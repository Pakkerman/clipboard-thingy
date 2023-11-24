import { BoardContextProvider } from "../context/BoardContext"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <BoardContextProvider>
      <main className="relative mx-auto flex min-h-[100svh] w-[clamp(300px,90%,375px)] flex-col items-center justify-center font-chakraPetch text-slate-900">
        {children}
      </main>
    </BoardContextProvider>
  )
}
