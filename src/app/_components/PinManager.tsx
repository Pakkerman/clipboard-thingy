import React, { useState } from "react"
import { useParams } from "next/navigation"

import { useBoardContext } from "../context/BoardContext"

import ButtonWrapper from "./wrappers/ButtonWrapper"

export default function PinManager() {
  const { id } = useParams()
  const { boardData, handleUpdatePin } = useBoardContext()

  const [changePinInput, setChangePinInput] = useState("")
  const [showPinInput, setShowPinInput] = useState(false)

  return (
    <div className="flex min-h-[100px] w-full flex-col items-center  justify-center">
      <p>
        This is board <i className="font-bold">{id}</i>
      </p>
      {}
      <br />

      {showPinInput ? (
        <input
          className="h-[35px] w-[232px] rounded-xl border border-black/20 border-red-400 p-1 text-center text-xl accent-orange-500 shadow-inner shadow-orange-950/40
            transition dark:text-orange-950"
          value={changePinInput}
          minLength={4}
          maxLength={4}
          placeholder={boardData?.pin ? boardData.pin : "----"}
          onChange={(event) => setChangePinInput(event.target.value)}
        />
      ) : !boardData.pin ? (
        <p>Set a pin to claim this board</p>
      ) : (
        <p className="leading-[35px]">This board is protected by pin code</p>
      )}

      <br />
      <button
        className="w-[90%]"
        onClick={() => {
          setShowPinInput(!showPinInput)
          if (showPinInput) handleUpdatePin(changePinInput)
        }}
      >
        <ButtonWrapper>
          {boardData?.pin
            ? showPinInput
              ? "Confirm"
              : "Change pin"
            : "Set pin"}
        </ButtonWrapper>
      </button>

      {/* <p>
        If you don't see your content, make sure your devices are on the same
        board number
      </p> */}
    </div>
  )
}
