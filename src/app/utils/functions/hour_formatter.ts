export const hoursFormatter = (duration: number): string => {
  const hours = Math.floor(duration / 3600000)
  const mins = ((duration / 3600000) % 1) * 60
  return `${hours.toString.length !== 2 ? `${'0' + hours}` : hours}:${
    mins.toFixed(0).length !== 2 ? `${'0' + mins.toFixed(0)}` : mins.toFixed(0)
  }`
}
