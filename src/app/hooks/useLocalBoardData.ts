import { useEffect, useState } from "react"
import { api } from "~/trpc/react"
import { generateNewBoardId } from "../lib/helpers"
import { setLocalData } from "../lib/localStorageHelpers"

export default function useLocalBoardData() {
  const { data: boardIdList, isLoading: isLoadingBoardList } =
    api.board.getAllBoard.useQuery()
  const [inputId, setInputId] = useState("Loading...")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isLoadingBoardList) return
    // localStorage.removeItem("clipboard")
    const boardId = JSON.parse(localStorage.clipboard)["boardId"]
    while (boardIdList?.includes(boardId)) {
      setLocalData("boardId", generateNewBoardId())
    }

    setInputId(boardId)
    setLoading(false)
  }, [isLoadingBoardList, boardIdList])

  return { inputId, setInputId, loading }
}
