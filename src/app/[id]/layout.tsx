import { BoardContextProvider } from "../context/BoardContext"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <BoardContextProvider>
      <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-orange-50 to-gray-50 pb-20 pt-5 font-chakraPetch text-slate-900 transition ">
        {children}
      </main>
    </BoardContextProvider>
  )
}
