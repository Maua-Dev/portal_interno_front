export enum COURSE {
  ADM = 'ADM',
  DSG = 'DSG',
  EAL = 'EAL',
  ETC = 'ETC',
  ECM = 'ECM',
  ECA = 'ECA',
  EET = 'EET',
  EEE = 'EEE',
  EMC = 'EMC',
  EPM = 'EPM',
  EQM = 'EQM',
  CIC = 'CIC',
  SIN = 'SIN'
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

export function translateCourse(value: string): string {
  switch (value) {
    case 'ADM':
      return 'Administração'
    case 'DSG':
      return 'Design'

    case 'EAL':
      return 'Engenharia de Alimentos'
    case 'ETC':
      return 'Engenharia Civil'
    case 'ECA':
      return 'Engenharia de Controle e Automação'
    case 'ECM':
      return 'Engenharia de Computação'
    case 'EET':
      return 'Engenharia Elétrica'
    case 'EEE':
      return 'Engenharia Eletrônica'
    case 'EMC':
      return 'Engenharia Mecânica'
    case 'EPM':
      return 'Engenharia de Produção'
    case 'EQM':
      return 'Engenharia Química'

    case 'SIN':
      return 'Sistemas de Informação'
    case 'CIC':
      return 'Ciências da Computação'
    default:
      return 'Invalid value'
  }
}
