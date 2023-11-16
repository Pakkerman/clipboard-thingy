import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useCallback } from "react"

export default function usePinParams() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const getPinParams = useCallback((): string => {
    return searchParams.get("p") || ""
  }, [searchParams])

  const setPinParams = useCallback(
    (pin: string) => {
      if (pin === "") return
      const params = new URLSearchParams(searchParams)
      params.set("p", pin)
      params.toString()
      router.push(pathname + "?" + params)
    },
    [searchParams],
  )

  return { getPinParams, setPinParams }
}
