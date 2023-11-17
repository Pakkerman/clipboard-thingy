import { generateNewBoardId } from "./helpers"

export function getLocalData(key: string): string {
  const storage = JSON.parse(localStorage.clipboard)
  return storage[key]
}

export function setLocalData(key: string, value: string): void {
  const storage = JSON.parse(localStorage.clipboard)
  storage[key] = value
  localStorage.clipboard = JSON.stringify(storage)
}

export function initLocalStorage(): void {
  const initLocalStorage = JSON.stringify({
    boardId: generateNewBoardId(),
    theme: "light",
  })

  if (!localStorage.getItem("clipboard"))
    localStorage.setItem("clipboard", initLocalStorage)
}
