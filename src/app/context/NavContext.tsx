"use client"

import React, {
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

type Tab = "text" | "file"
type NavContextProviderProps = { children: React.ReactNode }
type NavContext = {
  tab: Tab
  setTab: React.Dispatch<SetStateAction<Tab>>
}

const NavContext = createContext<NavContext | null>(null)
export function NavContextProvider(props: NavContextProviderProps) {
  const [tab, setTab] = useState<Tab>("text")

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [tab])

  return (
    <NavContext.Provider value={{ tab, setTab }}>
      {props.children}
    </NavContext.Provider>
  )
}

export function useNavContext() {
  const context = useContext(NavContext)
  if (!context)
    throw new Error("useNavContext can only be used inside NavContext.Provider")
  return context
}
