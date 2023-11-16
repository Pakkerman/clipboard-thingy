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

export function isUrl(string: string) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i",
  ) // fragment locator
  return !!pattern.test(string)
}

export function formatIdParam(id: string | string[] | undefined): string {
  if (!id) return "000000"
  if (typeof id !== "string") id = id.join("")
  return id.padStart(6, "0")
}

export function getLocalData(key: string): string {
  const storage = JSON.parse(localStorage.clipboard)
  return storage[key]
}

export function setLocalData(key: string, value: string): void {
  const storage = JSON.parse(localStorage.clipboard)
  storage[key] = value
  localStorage.clipboard = JSON.stringify(storage)
}
