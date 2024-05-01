export enum ROLE {
  DIRECTOR = 'DIRECTOR',
  DEV = 'DEV',
  HEAD = 'HEAD',
  INTERNAL = 'INTERNAL',
  PO = 'PO'
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
    default:
      return 'Invalid value'
  }
}
