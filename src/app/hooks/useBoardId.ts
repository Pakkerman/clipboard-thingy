"use client"

import { useParams } from "next/navigation"

export function useBoardId() {
  const { id } = useParams()
  return id!.toString().padStart(6, "0")
}
