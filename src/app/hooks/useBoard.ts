"use client"

import { api } from "~/trpc/react"
import { useParamId } from "./useParamId"
import { useEffect, useState } from "react"

export default function useBoard() {
  const [pin, setPin] = useState("")
  const id = useParamId()
  const { data: boardData, isLoading: loadingBoard } =
    api.board.getBoard.useQuery({
      id: id as string,
    })

  function updatePin(value: string) {
    setPin(value)
  }

  const locked = boardData?.pin !== pin

  return { boardData, loadingBoard, pin, setPin, locked, updatePin }
}
