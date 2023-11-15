"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { api } from "~/trpc/react"
import { useParamId } from "../hooks/useParamId"

type BoardContext = {
  pin: string
  setPin: React.Dispatch<React.SetStateAction<string>>
  locked: boolean
  setLocked: React.Dispatch<React.SetStateAction<boolean>>
  boardData: any
  loadingBoard: boolean
}
const BoardContext = createContext<BoardContext | null>(null)

type BoardContextProvider = { children: React.ReactNode }
export function BoardContextProvider(props: BoardContextProvider) {
  const [locked, setLocked] = useState(true)
  const [pin, setPin] = useState("")
  const id = useParamId()
  const { data: boardData, isLoading: loadingBoard } =
    api.board.getBoard.useQuery({
      id: id as string,
    })

  useEffect(() => {
    if (loadingBoard) return
    if (!boardData) {
      setLocked(false)
      return
    } else if (boardData.pin === pin) {
      setLocked(false)
    }
  }, [pin, loadingBoard])

  return (
    <BoardContext.Provider
      value={{ locked, setLocked, pin, setPin, boardData, loadingBoard }}
    >
      {props.children}
    </BoardContext.Provider>
  )
}

export function useBoardContext() {
  const context = useContext(BoardContext)
  if (!context)
    throw new Error(
      "useBoardContext can only be used inside BoardContextProvider",
    )

  return context
}
