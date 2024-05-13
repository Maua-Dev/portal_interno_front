export enum STACK {
  BACKEND = 'BACKEND',
  FRONTEND = 'FRONTEND',
  INFRA = 'INFRA',
  UX_UI = 'UX_UI',
  INTERNAL = 'INTERNAL',
  BUSINESS = 'BUSINESS'
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
    case 'INTERNAL':
      return STACK.INTERNAL
    case 'BUSINESS':
      return STACK.BUSINESS
    default:
      throw new Error('Invalid value')
  }
}

export function translateStackTag(stack: string): string {
  switch (stack) {
    case 'BACKEND':
      return 'Back-End'
    case 'FRONTEND':
      return 'Front-End'
    case 'INFRA':
      return 'Infra'
    case 'UX_UI':
      return 'UX/UI'
    case 'INTERNAL':
      return 'Interno'
    case 'BUSINESS':
      return 'Business'
    default:
      return 'Invalid value'
  }
}

export function stackFormatter(stackArray: STACK[]): string[] {
  const stackFormatted: string[] = []
  stackArray.forEach((stack) => {
    stackFormatted.push(stack.toString())
  })
  return stackFormatted
}

export function stackFormatterFromJSON(stackArray: string[]): STACK[] {
  const stackFormatted: STACK[] = []
  stackArray.map((stack) => {
    stackFormatted.push(stackToEnum(stack))
  })
  return stackFormatted
}
