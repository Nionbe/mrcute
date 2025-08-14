export function generateUserId(role: string): string {
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")

  switch (role) {
    case "student":
      return `ST${timestamp}${random}`.slice(0, 8)
    case "teacher":
      return `TC${timestamp}${random}`.slice(0, 8)
    case "parent":
      return `PR${timestamp}${random}`.slice(0, 8)
    case "admin":
      return `AD${timestamp}${random}`.slice(0, 8)
    default:
      return `US${timestamp}${random}`.slice(0, 8)
  }
}

export function formatUserId(id: string, role: string): string {
  if (id && id.length >= 6) {
    return id
  }
  return generateUserId(role)
}
