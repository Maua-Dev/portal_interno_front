export enum STRIKE_CATEGORY {
  MISCONDUCT = 'MISCONDUCT',
  OTHER = 'OTHER'
}

export function strikeCategoryToPortuguese(category: STRIKE_CATEGORY): string {
  switch (category) {
    case STRIKE_CATEGORY.MISCONDUCT:
      return 'Conduta Inadequada'
    case STRIKE_CATEGORY.OTHER:
      return 'Outro'
    default:
      return 'Outro'
  }
}

export function strikeCategoryToEnum(category: string): STRIKE_CATEGORY {
  switch (category.toUpperCase()) {
    case 'MISCONDUCT':
      return STRIKE_CATEGORY.MISCONDUCT
    case 'OTHER':
      return STRIKE_CATEGORY.OTHER
    default:
      return STRIKE_CATEGORY.OTHER
  }
}
