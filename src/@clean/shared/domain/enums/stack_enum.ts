export enum STACK {
  BACKEND = 'BACKEND',
  FRONTEND = 'FRONTEND',
  INFRA = 'INFRA',
  UX_UI = 'UX_UI',
  PO = 'PO',
  INTERNAL = 'INTERNAL',
  DATA_SCIENCE = 'DATA_SCIENCE'
}

export function stackToEnum(value: string): STACK {
  switch (value) {
    case 'BACKEND':
      return STACK.BACKEND
    case 'FRONTEND':
      return STACK.FRONTEND
    case 'INFRA':
      return STACK.INFRA
    case 'UX_UI':
      return STACK.UX_UI
    case 'PO':
      return STACK.PO
    case 'INTERNAL':
      return STACK.INTERNAL
    case 'DATA_SCIENCE':
      return STACK.DATA_SCIENCE
    default:
      throw new Error('Invalid value')
  }
}

export function stackFormatter(stackArray: STACK[]): string[] {
  const stackFormatted: string[] = []
  stackArray.forEach((stack) => {
    stackFormatted.push(stack.toString())
  })
  console.log(stackFormatted)
  return stackFormatted
}

export function stackFormatterFromJSON(stackArray: string[]): STACK[] {
  const stackFormatted: STACK[] = []
  stackArray.map((stack) => {
    stackFormatted.push(stackToEnum(stack))
  })
  return stackFormatted
}
