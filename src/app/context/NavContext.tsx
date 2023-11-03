"use client"

import React, {
  SetStateAction,
  createContext,
  useContext,
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
  const [tab, setTab] = useState<Tab>("file")

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
