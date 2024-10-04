export enum ACTIVE {
  ACTIVE = 'ACTIVE',
  FREEZE = 'FREEZE',
  DISCONNECTED = 'DISCONNECTED',
  ON_HOLD = 'ON_HOLD'
}

export function activeToEnum(value: string): ACTIVE {
  switch (value) {
    case 'ACTIVE':
      return ACTIVE.ACTIVE
    case 'FREEZE':
      return ACTIVE.FREEZE
    case 'ON_HOLD':
      return ACTIVE.ON_HOLD
    case 'DISCONNECTED':
      return ACTIVE.DISCONNECTED
    default:
      throw new Error('Invalid value')
  }
}
