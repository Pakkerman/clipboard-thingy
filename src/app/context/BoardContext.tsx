"use client"

import { createContext, useContext, useEffect, useState } from "react"

type BoardContext = {
  boardId: string
  setBoardId: React.Dispatch<React.SetStateAction<string>>
}
const BoardContext = createContext<BoardContext | null>(null)

type BoardContextProvider = { children: React.ReactNode }
export function BoardContextProvider(props: BoardContextProvider) {
  const [boardId, setBoardId] = useState("")

  useEffect(() => {
    let id = localStorage.getItem("boardVisited")
    if (!id) {
      id = Math.floor(Math.random() * 9999).toString()
      localStorage.setItem("boardVisited", id)
    }

    setBoardId(id)
  }, [])

  return (
    <BoardContext.Provider value={{ boardId, setBoardId }}>
      {props.children}
    </BoardContext.Provider>
  )
}

export function useBoardContext() {
  const context = useContext(BoardContext)
  if (!context)
    throw new Error(
      "useBoardContext can only be used inside BoardContext.Provider",
    )

  return context
}
