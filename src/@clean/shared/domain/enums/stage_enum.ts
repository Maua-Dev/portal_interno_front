export enum STAGE {
  TEST = 'test',
  DEV = 'dev',
  HOMOLOG = 'homolog',
  PROD = 'prod'
}

export function toEnum(value: string): STAGE {
  switch (value) {
    case 'test':
      return STAGE.TEST
    case 'dev':
      return STAGE.DEV
    case 'homolog':
      return STAGE.HOMOLOG
    case 'prod':
      return STAGE.PROD
    default:
      throw new Error('Invalid value')
  }
}
