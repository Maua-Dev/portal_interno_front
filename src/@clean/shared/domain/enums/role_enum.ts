export enum ROLE {
  DIRECTOR = 'DIRECTOR',
  DEV = 'DEV',
  HEAD = 'HEAD',
  INTERNAL = 'INTERNAL',
  PO = 'PO',
  SCRUM = 'SCRUM',
  DESIGNER = 'DESIGNER'
}

export function roleToEnum(value: string): ROLE {
  switch (value) {
    case 'DIRECTOR':
      return ROLE.DIRECTOR
    case 'DEV':
      return ROLE.DEV
    case 'HEAD':
      return ROLE.HEAD
    case 'INTERNAL':
      return ROLE.INTERNAL
    case 'PO':
      return ROLE.PO
    case 'SCRUM':
      return ROLE.SCRUM
    case 'DESIGNER':
      return ROLE.DESIGNER
    default:
      throw new Error('Invalid value')
  }
}

export function translateRole(value: string): string {
  switch (value) {
    case 'DIRECTOR':
      return 'Diretor'
    case 'DEV':
      return 'Desenvolvedor'
    case 'HEAD':
      return 'Head'
    case 'INTERNAL':
      return 'Interno'
    case 'PO':
      return 'Product Owner'
    case 'SCRUM':
      return 'Scrum Master'
    case 'DESIGNER':
      return 'Designer'
    default:
      return 'Invalid value'
  }
}
