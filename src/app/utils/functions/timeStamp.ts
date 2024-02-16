function timeStampToDate(timestamp: number): string {
  const date = new Date(timestamp * 1000)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // O mês é base 0, então adiciona 1
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

function secondsToDays(seconds: number): number {
  const secondsPerDay = 60 * 60 * 24
  return Math.floor(seconds / secondsPerDay)
}
