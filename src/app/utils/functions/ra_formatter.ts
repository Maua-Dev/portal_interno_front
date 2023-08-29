function raFormatter(input: string): string {
  return input.replace(/[^\d]/g, '')
}

function associatedMembersRaFormatter(raArray: string[]): string[] {
  const associatedMembersRaFormatted: string[] = []
  raArray.forEach((raMember) => {
    associatedMembersRaFormatted.push(raFormatter(raMember))
  })
  console.log(associatedMembersRaFormatted)
  return associatedMembersRaFormatted
}

export { raFormatter, associatedMembersRaFormatter }
