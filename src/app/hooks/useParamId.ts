"use client"

import { useParams } from "next/navigation"

export default function useParamId() {
  const { id } = useParams()
  return id!.toString().padStart(6, "0")
}
