import React, { useEffect, useState } from "react"
import { api } from "~/trpc/react"

export default function useLocalBoardData() {
  const { data: boardList, isLoading: isLoadingBoardList } =
    api.board.getAllBoard.useQuery()
  const [inputId, setInputId] = useState("Loading...")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isLoadingBoardList) return

    let localStorageJSON = localStorage.getItem("clipbroker")
    if (!localStorageJSON || localStorageJSON === "undefined") {
      const usedBoardIds = boardList?.map((item) => item.boardId)
      let newId = generateNewBoardId()
      while (usedBoardIds?.includes(newId)) newId = generateNewBoardId()

      const json = { boardId: newId }
      localStorage.setItem("clipbroker", JSON.stringify(json))
      localStorageJSON = localStorage.getItem("clipbroker")!
    }

    const boardId = JSON.parse(localStorageJSON)["boardId"]

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
