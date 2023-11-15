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
  isLoadingBoard: boolean
}
const BoardContext = createContext<BoardContext | null>(null)

type BoardContextProvider = { children: React.ReactNode }
export function BoardContextProvider(props: BoardContextProvider) {
  console.log("you run")
  const [locked, setLocked] = useState(true)
  const [pin, setPin] = useState("")
  const id = useParamId()
  const { data: boardData, isLoading: isLoadingBoard } =
    api.board.getBoard.useQuery({
      id: id as string,
    })
  const { mutate: createBoard } = api.board.createBoard.useMutation()

  useEffect(() => {
    if (isLoadingBoard) return
    if (!boardData) {
      setLocked(false)
      createBoard({ id: id as string, pin: null })
    } else if (boardData.pin === pin || boardData.pin == null) setLocked(false)
  }, [pin, isLoadingBoard])

  return (
    <BoardContext.Provider
      value={{
        locked,
        setLocked,
        pin,
        setPin,
        boardData,
        isLoadingBoard,
      }}
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
