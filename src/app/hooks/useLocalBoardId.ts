import React, { useEffect, useState } from "react"
import { api } from "~/trpc/react"

export default function useLocalBoardId() {
  const { data: boardList, isLoading: isLoadingBoardList } =
    api.board.getAllBoard.useQuery()
  const [inputId, setInputId] = useState("Loading...")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isLoadingBoardList) return

    const localStorageId = localStorage.getItem("clipbroker_boardId")
    if (!localStorageId || localStorageId === "undefined") {
      const usedBoardIds = boardList?.map((item) => item.boardId)
      let newId = generateNewBoardId()
      while (usedBoardIds?.includes(newId)) newId = generateNewBoardId()

      localStorage.setItem("clipbroker_boardId", newId)
    }
    const boardId = localStorage.getItem("clipbroker_boardId")!

    setInputId(boardId)
    setLoading(false)
  }, [isLoadingBoardList])
  return { inputId, setInputId, loading }
}

function generateNewBoardId(): string {
  return Math.floor(Math.random() * 100000)
    .toString()
    .padStart(6, "0")
}
