export enum COURSE {
  ECM = 'ECM',
  ECA = 'ECA',
  CIC = 'CIC',
  EMC = 'EMC',
  ADM = 'ADM',
  EET = 'EET',
  EEE = 'EEE',
  EQM = 'EQM',
  SIN = 'SIN',
  DSG = 'DSG',
  ETC = 'ETC',
  EAL = 'EAL',
  EPM = 'EPM'
}

export function courseToEnum(value: string): COURSE {
  switch (value) {
    case 'ECM':
      return COURSE.ECM
    case 'ECA':
      return COURSE.ECA
    case 'CIC':
      return COURSE.CIC
    case 'EMC':
      return COURSE.EMC
    case 'ADM':
      return COURSE.ADM
    case 'EET':
      return COURSE.EET
    case 'EEE':
      return COURSE.EEE
    case 'EQM':
      return COURSE.EQM
    case 'SIN':
      return COURSE.SIN
    case 'DSG':
      return COURSE.DSG
    case 'ETC':
      return COURSE.ETC
    case 'EAL':
      return COURSE.EAL
    case 'EPM':
      return COURSE.EPM
    default:
      throw new Error('Invalid value')
  }
}
