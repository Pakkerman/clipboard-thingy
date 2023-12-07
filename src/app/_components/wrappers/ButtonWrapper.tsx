import React from "react"

type ButtonWrappersProps = { children: React.ReactNode }
export default function ButtonWrapper({ children }: ButtonWrappersProps) {
  return (
    <div className="text-md flex select-none items-center justify-center gap-1 rounded-lg border  border-orange-400/80 p-2 transition hover:bg-orange-400 hover:text-orange-950 active:translate-y-[2px]">
      {children}
    </div>
  )
}
