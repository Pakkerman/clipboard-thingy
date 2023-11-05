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
