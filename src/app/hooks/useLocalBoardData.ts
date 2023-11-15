import { useEffect, useState } from "react"
import { api } from "~/trpc/react"

localStorage.removeItem("clipboard")
initLocalStorage()

export default function useLocalBoardData() {
  const { data: boardIdList, isLoading: isLoadingBoardList } =
    api.board.getAllBoard.useQuery()
  const [inputId, setInputId] = useState("Loading...")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isLoadingBoardList) return
    const boardId = JSON.parse(localStorage.getItem("clipboard")!)["boardId"]
    while (boardIdList?.includes(boardId)) {
      setItem("boardId", generateNewBoardId())
    }

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

function setItem(key: string, value: string): void {
  const local = localStorage.getItem("clipboard")
  let json = {}
  if (local) json = JSON.parse(local)

  localStorage.setItem("clipboard", JSON.stringify({ ...json, [key]: value }))
}

function getItem(key: string): string {
  const json = localStorage.getItem("clipboard")
  if (!json) setItem(key, generateNewBoardId())
  return JSON.parse(json!).key
}

function initLocalStorage(): void {
  const initLocalStorage = JSON.stringify({
    boardId: generateNewBoardId(),
    theme: "light",
  })

  if (!localStorage.getItem("clipboard"))
    localStorage.setItem("clipboard", initLocalStorage)
}
