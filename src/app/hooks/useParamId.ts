"use client"

import { useParams } from "next/navigation"

export function useParamId() {
  const { id } = useParams()
  return id!.toString().padStart(6, "0")
}
