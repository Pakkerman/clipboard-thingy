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
}

const ClipboardContext = createContext<ClipboardContext | null>(null)
export function ClipboardContextProvider(props: ClipboardContextProviderProps) {
  const [content, setContent] = useState("")

  useEffect(() => {
    navigator.clipboard.readText().then((text) => {
      setContent(text)
    })
  }, [])

  return (
    <ClipboardContext.Provider value={{ content, setContent }}>
      {props.children}
    </ClipboardContext.Provider>
  )
}

export function useClipboardContext() {
  const context = useContext(ClipboardContext)
  if (!context) {
    throw new Error(
      "useClipboardContext can only be used inside ClipboardContext.Providers",
    )
  }
  return context
}
