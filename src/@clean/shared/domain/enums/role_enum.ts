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
