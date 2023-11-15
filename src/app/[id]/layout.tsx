import { BoardContextProvider } from "../context/BoardContext"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <BoardContextProvider>{children}</BoardContextProvider>
}
