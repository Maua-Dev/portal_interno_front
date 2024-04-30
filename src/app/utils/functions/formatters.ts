function raFormatterToJson(input: string): string {
  const raFormated = input.replace(/[^\d]/g, '')
  // console.log(raFormated)
  return raFormated
}

function associatedMembersRaFormatter(raArray: string[]): string[] {
  const associatedMembersRaFormatted: string[] = []
  raArray.forEach((raMember) => {
    associatedMembersRaFormatted.push(raFormatterToJson(raMember))
  })
  // console.log(associatedMembersRaFormatted)
  return associatedMembersRaFormatted
}

function raFormatterFromJson(input: string): string {
  const raParts = input.split('')

  const finalRa =
    raParts.slice(0, 2).join('') +
    '.' +
    raParts.slice(2, 7).join('') +
    '-' +
    raParts[7]
  return finalRa
}

function plainTextToRa(text: string): string {
  const first = text.slice(0, 2)
  const second = text.slice(2, 7)
  const third = text.slice(7)

  return `${first}.${second}-${third}`
}

function ProjectCodeToProjectName(projectCode: string): string {
  switch (projectCode) {
    case 'PI':
      return 'Portal Interno'
    case 'SM':
      return 'Smile'
    case 'MF':
      return 'Mauá Food'
    default:
      return projectCode
  }
}

export {
  raFormatterToJson,
  raFormatterFromJson,
  associatedMembersRaFormatter,
  plainTextToRa,
  ProjectCodeToProjectName
}
