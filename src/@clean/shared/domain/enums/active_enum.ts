export enum ACTIVE {
  ACTIVE = 'ACTIVE',
  FREEZE = 'FREEZE',
  DISCONNECTED = 'DISCONNECTED'
}

export function activeToEnum(value: string): ACTIVE {
  switch (value) {
    case 'ACTIVE':
      return ACTIVE.ACTIVE
    case 'FREEZE':
      return ACTIVE.FREEZE
    case 'DISCONNECTED':
      return ACTIVE.DISCONNECTED
    default:
      throw new Error('Invalid value')
  }
}
