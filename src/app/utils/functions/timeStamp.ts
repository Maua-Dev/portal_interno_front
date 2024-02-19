export function timeStampToDate(timestamp: number): string {
  const date = new Date(timestamp * 1000)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // O mês é base 0, então adiciona 1
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

export function millisecondsToHours(milliseconds: number): number {
  return Math.floor(milliseconds / Math.pow(3.6, 6))
}

export function hoursToMilliseconds(hours: number): number {
  return Math.floor(hours * Math.pow(3.6, 6))
}

export function dateToMilliseconds(data: string): number {
  const [day, month, year] = data.split('/')

  const newData = new Date(`${day}-${month}-${year}`)

  return newData.getTime()
}
