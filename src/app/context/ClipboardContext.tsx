"use client"

import React, {
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

type ClipboardContextProviderProps = { children: React.ReactNode }
type ClipboardContext = {
  content: string
  setContent: React.Dispatch<SetStateAction<string>>
  selected: number | null
  setSelected: React.Dispatch<SetStateAction<number | null>>
}

const ClipboardContext = createContext<ClipboardContext | null>(null)
export function ClipboardContextProvider(props: ClipboardContextProviderProps) {
  const [content, setContent] = useState("")
  const [selected, setSelected] = useState<number | null>(null)

  useEffect(() => {
    navigator.clipboard
      .readText()
      .then((text) => {
        setContent(text)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <ClipboardContext.Provider
      value={{ content, setContent, selected, setSelected }}
    >
      {props.children}
    </ClipboardContext.Provider>
  )
}

export function useClipboardContext() {
  const context = useContext(ClipboardContext)
  if (!context) {
    throw new Error(
      "useClipboardContext can only be used inside ClipboardContext.Provider",
    )
  }
  return context
}
