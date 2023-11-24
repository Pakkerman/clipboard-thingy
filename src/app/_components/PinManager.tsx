import React, { useState } from "react"
import { useParams } from "next/navigation"
import { useBoardContext } from "../context/BoardContext"
import { useAutoAnimate } from "@formkit/auto-animate/react"

export default function PinManager() {
  const [animationParent] = useAutoAnimate()
  const { id } = useParams()
  const [changePinInput, setChangePinInput] = useState("")
  const [showPinInput, setShowPinInput] = useState(false)
  const { boardData, handleUpdatePin } = useBoardContext()

  return (
    <div className=" flex min-h-[100px] flex-col items-center justify-center">
      <p>
        This is board <i className="font-bold">{id}</i>
      </p>
      {!boardData.pin ?? <p>Set a pin to lock this board</p>}
      <br />
      {/* <div className="pre h-[50px] w-[232px]" ref={animationParent}> */}
      <input
        className="w-[232px] rounded-xl border border-black/20 border-red-400 p-1 text-center text-xl accent-orange-500 shadow-inner shadow-orange-950/40 
            transition dark:text-orange-950"
        value={changePinInput}
        minLength={4}
        maxLength={4}
        placeholder={boardData?.pin ? boardData.pin : "----"}
        onChange={(event) => setChangePinInput(event.target.value)}
      />
      {/* {showPinInput && (
        )} */}
      {/* </div> */}
      {!boardData?.pin && <p>Set pin to claim this board</p>}
      <br />
      <button
        className="w-[90%] rounded-md border-[0.5px] border-black/20 px-4 py-2"
        onClick={() => {
          setShowPinInput(!showPinInput)
          if (showPinInput) handleUpdatePin(changePinInput)
        }}
      >
        {boardData?.pin ? "Change pin" : "Set pin"}
      </button>

      {/* <p>
        If you don't see your content, make sure your devices are on the same
        board number
      </p> */}
    </div>
  )
}
