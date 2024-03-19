export function timeStampToDate(timestamp: number): string {
  const date = new Date(timestamp)

  return date.toISOString().substring(0, date.toISOString().indexOf(':') + 3)
}

export function millisecondsToHours(milliseconds: number): number {
  return Math.floor(milliseconds / (3.6 * Math.pow(10, 6)))
}

export function hoursToMilliseconds(hours: number): number {
  return Math.floor(hours * 3.6 * Math.pow(10, 6))
}

export function dateToMilliseconds(date: string): number {
  const newDate = new Date(date)

  return newDate.getTime()
}
