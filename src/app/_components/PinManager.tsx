import React, { useState } from "react"
import { useParams } from "next/navigation"
import { useBoardContext } from "../context/BoardContext"

export default function PinManager() {
  const { id } = useParams()
  const [changePinInput, setChangePinInput] = useState("")
  const [showPinInput, setShowPinInput] = useState(false)
  const { boardData, handleUpdatePin } = useBoardContext()

  return (
    <>
      <p>This is board #{id}</p>
      {!boardData?.pin && <p>Set pin to claim this board</p>}
      <button
        className="rounded-md border-[0.5px] border-black/20 px-4 py-2"
        onClick={() => {
          setShowPinInput(!showPinInput)
          if (showPinInput) handleUpdatePin(changePinInput)
        }}
      >
        {boardData?.pin ? "Change pin" : "Set pin"}
      </button>
      {showPinInput && (
        <input
          className="text-center"
          value={changePinInput}
          minLength={4}
          maxLength={4}
          placeholder={boardData?.pin ? boardData.pin : "----"}
          onChange={(event) => setChangePinInput(event.target.value)}
        />
      )}
      <p>
        If you don't see your content, make sure your devices are on the same
        board number
      </p>
    </>
  )
}
