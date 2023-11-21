"use client"

import React, { useEffect, useRef } from "react"
import { useBoardContext } from "../context/BoardContext"
import { isDesktop } from "react-device-detect"

import { BsBackspace } from "react-icons/bs"
import { CiRedo } from "react-icons/ci"
import { SlLock, SlLockOpen } from "react-icons/sl"

type PinPadProps = {
  pin: string
  setPin: React.Dispatch<React.SetStateAction<string>>
}
export function PasscodeInput(props: PinPadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { locked } = useBoardContext()
  const { pin, setPin } = props

  useEffect(() => {
    if (!isDesktop) return
    if (inputRef.current) inputRef.current.focus()
  }, [inputRef.current])

  return (
    <section className="flex h-[90vh] w-[min(90vw,500px)] flex-col items-center justify-around gap-2 rounded-xl text-orange-950 shadow-inner shadow-orange-950/40">
      <div className="flex h-[50%] w-[70%] flex-col items-center justify-center gap-6">
        <div className="flex h-44 w-44 items-center justify-center rounded-full shadow-md shadow-orange-950/40 ">
          <SlLock
            className="text-orange-800 shadow-orange-950/40 drop-shadow-md"
            size={100}
          />
        </div>
        <p className="text-center text-sm">
          This board is protected, please input the correct pin if you are the
          owner of this board.
        </p>
      </div>
      <input
        ref={inputRef}
        className={`w-[232px] rounded-xl border border-black/20 bg-orange-50 p-1 text-center text-3xl caret-transparent accent-orange-500 shadow-inner shadow-orange-950/40 transition dark:text-orange-950 ${
          locked && pin.length === 4 && "border-red-400 bg-red-200"
        }`}
        type="text"
        placeholder="_ _ _ _"
        value={pin}
        maxLength={4}
        minLength={4}
        onChange={(event) => setPin(event.target.value)}
      />
      <div className="flex h-[50%] flex-col items-center justify-center">
        <div className="flex flex-col justify-center gap-2 rounded-xl border border-black/10 bg-orange-50 p-4 shadow-md shadow-orange-950/40 ">
          <h3>Please Enter Pin</h3>
          <NumberPad setPin={setPin} />
        </div>
      </div>
    </section>
  )
}

type NumberPadProps = { setPin: React.Dispatch<React.SetStateAction<string>> }
function NumberPad(props: NumberPadProps) {
  const { setPin } = props

  const handleClick = (number: string) =>
    setPin((prev) => (prev + number).slice(0, 4))
  const handleDelete = () => setPin((prev) => prev.slice(0, prev.length - 1))
  const handleReset = () => setPin("")

  return (
    <div className="flex w-[200px] flex-col gap-2">
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
        <NumberPadButton number="" handleClick={handleReset}>
          <CiRedo size={24} />
        </NumberPadButton>
        <NumberPadButton number="0" handleClick={handleClick} />
        <NumberPadButton number="" handleClick={handleDelete}>
          <BsBackspace size={20} />
        </NumberPadButton>
      </div>
    </div>
  )
}

type NumberPadButtonProps = {
  children?: React.ReactNode
  number: string
  handleClick: (number: string) => void
}

function NumberPadButton(props: NumberPadButtonProps) {
  return (
    <button
      onClick={() => props.handleClick(props.number)}
      className="flex basis-1/3 items-center justify-center rounded-md border-[0.5px] border-orange-400 p-2 text-orange-950/80 shadow-orange-950/60 transition hover:bg-orange-400 active:border-orange-500 active:bg-orange-500 "
    >
      {props.number || props.children}
    </button>
  )
}
