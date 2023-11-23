export function isImageFile(name: string | null): boolean {
  if (!name) return false
  if (
    name.endsWith(".png") ||
    name.endsWith(".jpg") ||
    name.endsWith(".jpeg") ||
    name.endsWith(".webp")
  )
    return true
  else return false
}

export function isUrl(string: string): boolean {
  var pattern = new RegExp(
    "^(http(s)?://)?(([a-zd]([a-zd-]*[a-zd])*).)+[a-z]{2,}|/.*",
  )
  return pattern.test(string)
}

export function formatIdParam(id: string | string[] | undefined): string {
  if (!id) return "000000"
  if (typeof id !== "string") id = id.join("")
  return id.padStart(6, "0")
}

export function generateNewBoardId(): string {
  return Math.floor(Math.random() * 100000)
    .toString()
    .padStart(6, "0")
}
