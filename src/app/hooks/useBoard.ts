"use client"

import React, { useEffect, useState } from "react"

export function useBoard() {
  const [boardId, setBoardId] = useState<string>("")
  useEffect(() => {
    let id = localStorage.getItem("clipbroker_boardId")
    if (!id) {
      const newId = generateRandomTable()
      localStorage.setItem("clipbroker_boardId", newId)
      setBoardId(newId)
    } else {
      setBoardId(id)
    }
  }, [])

  return boardId
}

function generateRandomTable(): string {
  return Math.floor(Math.random() * 9999)
    .toString()
    .padStart(5, "0")
}
