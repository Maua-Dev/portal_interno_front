import { FilterOptions } from '../FilterBar'

export const actionsFilterOptions: FilterOptions[] = [
  {
    name: 'searchText',
    label: 'Pesquisar',
    type: 'text'
  },
  {
    name: 'project',
    label: 'Projetos',
    type: 'select',
    options: [
      { label: 'Portal Interno', value: 'PI' },
      { label: 'Mauá Food', value: 'MF' },
      { label: 'Portifólio', value: 'PT' },
      { label: 'Selfie Mauá', value: 'SF' },
      { label: 'SMILE', value: 'SM' },
      { label: 'Gameficação', value: 'GM' }
    ]
  },
  {
    name: 'area',
    label: 'Área',
    type: 'select',
    options: [
      { label: 'FRONT', value: 'FRONTEND' },
      { label: 'BACK', value: 'BACKEND' },
      { label: 'INFRA', value: 'INFRA' },
      { label: 'UX/UI', value: 'UX_UI' },
      { label: 'INTERNAL', value: 'INTERNAL' }
    ]
  },
  {
    name: 'orderBy',
    label: 'Ordenar Por',
    type: 'select',
    options: [
      { label: 'Mais Recente', value: 'NEW' },
      { label: 'Mais Antigo', value: 'OLD' },
      { label: 'Maior Duração', value: 'BIGGER' },
      { label: 'Menor Duração', value: 'SMALLER' }
    ]
  }
]
