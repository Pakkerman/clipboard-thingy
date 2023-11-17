"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { api } from "~/trpc/react"
import { useParamId } from "../hooks/useParamId"
import toast from "react-hot-toast"
import usePinParams from "../hooks/usePinParams"

type BoardContext = {
  pin: string
  setPin: React.Dispatch<React.SetStateAction<string>>
  locked: boolean
  setLocked: React.Dispatch<React.SetStateAction<boolean>>
  boardData: any
  handleUpdatePin: (inputPin: string) => void
  loading: boolean
}
const BoardContext = createContext<BoardContext | null>(null)

type BoardContextProvider = { children: React.ReactNode }
export function BoardContextProvider(props: BoardContextProvider) {
  const { getPinParams, setPinParams } = usePinParams()
  const [locked, setLocked] = useState(true)
  const [loading, setLoading] = useState(true)
  const [pin, setPin] = useState(getPinParams())
  const id = useParamId()
  const utils = api.useUtils()
  const { data: boardData, isLoading: isLoadingBoard } =
    api.board.getBoard.useQuery({
      id: id as string,
    })
  const { mutate: createBoard } = api.board.createBoard.useMutation({
    onSuccess: () => utils.board.getBoard.invalidate(),
  })
  const { mutate: updateBoardPin } = api.board.updateBoardPin.useMutation({
    onSuccess: () => {
      toast.success("Pin updated!", { id: "pin" })
    },
    onMutate: () => toast.loading("Updating pin", { id: "pin" }),
  })

  function handleUpdatePin(inputPin: string): void {
    if (boardData && boardData.pin !== inputPin && inputPin.length === 4) {
      updateBoardPin({ id, pin: inputPin })
      setPinParams(inputPin)
    }
  }

  // try to only output one loading state
  useEffect(() => {
    if (isLoadingBoard) return
    if (!boardData) {
      createBoard({ id: id as string, pin: null })
      setLocked(false)
    } else if (boardData.pin === pin || boardData.pin == null) {
      setPinParams(pin)
      setLocked(false)
      setLoading(false)
    } else setLoading(false)
  }, [pin, isLoadingBoard])

  return (
    <BoardContext.Provider
      value={{
        locked,
        setLocked,
        pin,
        setPin,
        boardData,
        loading,
        handleUpdatePin,
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
