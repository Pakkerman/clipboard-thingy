"use client"

import React, { SetStateAction, useEffect, useState } from "react"
import { useNavContext } from "../context/NavContext"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { TextList } from "./TextList"
import { FileList } from "./FileList"
import { useParams, useRouter } from "next/navigation"
import { api } from "~/trpc/react"
import { formatIdParam } from "../lib/helpers"
import useBoard from "../hooks/useBoard"
import { useBoardContext } from "../context/BoardContext"

export default function Clipboard() {
  const { tab } = useNavContext()
  const [animationParent] = useAutoAnimate()
  const { id } = useParams()
  const router = useRouter()
  const { boardData, pin, setPin, locked } = useBoardContext()

  useEffect(() => {
    const boardId = formatIdParam(id)
    localStorage.setItem("clipbroker_boardId", boardId)
    if (id !== boardId) router.replace("/" + boardId)
  }, [])

  // Refetching
  // useEffect(() => {
  //   const id = setInterval(() => utils.post.getAll.refetch(), 10000)
  //   return () => clearInterval(id)
  // }, [])

  return (
    <section className="w-[90%] max-w-[375px] rounded-xl bg-slate-200/20 shadow-inner shadow-black/30">
      <ul
        ref={animationParent}
        className="flex h-[450px] flex-col items-center gap-2 overflow-y-scroll rounded-xl border-orange-400 p-4"
      >
        {locked ? (
          <PinInput pin={pin} setPin={setPin} />
        ) : tab === "text" ? (
          <TextList />
        ) : (
          <FileList />
        )}
      </ul>
    </section>
  )
}
type PinPadProps = {
  pin: string
  setPin: React.Dispatch<SetStateAction<string>>
}
function PinInput(props: PinPadProps) {
  const { pin, setPin } = props

  return (
    <div className="flex h-full flex-col justify-center gap-2">
      <div className=" flex flex-col justify-center gap-2 rounded-xl border border-black/10 p-4 shadow-inner shadow-black/20">
        <h3>Please Enter Pin</h3>
        <input
          className="rounded-xl bg-orange-50 p-1 text-center accent-orange-500 shadow-inner shadow-orange-950/40 dark:text-orange-950"
          type="text"
          placeholder="####"
          value={pin}
          maxLength={4}
          minLength={4}
          onChange={(event) => setPin(event.target.value)}
        />
        <NumberPad setPin={setPin} />
      </div>
    </div>
  )
}

type NumberPadProps = { setPin: React.Dispatch<SetStateAction<string>> }
function NumberPad(props: NumberPadProps) {
  const { setPin } = props

  function handleClick(number: string) {
    setPin((prev) => (prev + number).slice(0, 4))
  }

  function handleDelete() {
    setPin((prev) => prev.slice(0, prev.length - 1))
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 ">
        <NumberPadButton number="1" handleClick={handleClick} />
        <NumberPadButton number="2" handleClick={handleClick} />
        <NumberPadButton number="3" handleClick={handleClick} />
      </div>
      <div className="flex gap-2 ">
        <NumberPadButton number="4" handleClick={handleClick} />
        <NumberPadButton number="5" handleClick={handleClick} />
        <NumberPadButton number="6" handleClick={handleClick} />
      </div>
      <div className="flex gap-2 ">
        <NumberPadButton number="7" handleClick={handleClick} />
        <NumberPadButton number="8" handleClick={handleClick} />
        <NumberPadButton number="9" handleClick={handleClick} />
      </div>
      <div className="flex gap-2 ">
        <NumberPadButton number="" handleClick={handleClick} />
        <NumberPadButton number="0" handleClick={handleClick} />
        <NumberPadButton number="<" handleClick={handleDelete} />
      </div>
    </div>
  )
}

type NumberPadButtonProps = {
  number: string
  handleClick: (number: string) => void
}

function NumberPadButton(props: NumberPadButtonProps) {
  return (
    <button
      onClick={() => props.handleClick(props.number)}
      className=" basis-1/3 rounded-md border border-orange-400 p-2"
    >
      {props.number}
    </button>
  )
}
