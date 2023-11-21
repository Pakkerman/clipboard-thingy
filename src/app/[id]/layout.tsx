import { BoardContextProvider } from "../context/BoardContext"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <BoardContextProvider>
      <main className="relative flex min-h-screen flex-col items-center justify-center py-5 font-chakraPetch text-slate-900 transition ">
        {children}
      </main>
    </BoardContextProvider>
  )
}
