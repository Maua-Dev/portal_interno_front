import { STACK } from '../../../@clean/shared/domain/enums/stack_enum'

function raFormatter(input: string): string {
  const raFormated = input.replace(/[^\d]/g, '')
  // console.log(raFormated)
  return raFormated
}

function associatedMembersRaFormatter(raArray: string[]): string[] {
  const associatedMembersRaFormatted: string[] = []
  raArray.forEach((raMember) => {
    associatedMembersRaFormatted.push(raFormatter(raMember))
  })
  // console.log(associatedMembersRaFormatted)
  return associatedMembersRaFormatted
}

function stackFormatter(stackArray: STACK[]): string[] {
  const stackFormatted: string[] = []
  stackArray.forEach((stack) => {
    stackFormatted.push(stack.toString())
  })
  console.log(stackFormatted)
  return stackFormatted
}

export { raFormatter, associatedMembersRaFormatter, stackFormatter }
