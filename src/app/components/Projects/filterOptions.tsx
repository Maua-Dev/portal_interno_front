import { FilterOptions } from '../FilterBar'

export const projectFilterOptions: FilterOptions[] = [
  {
    name: 'searchText',
    label: 'Pesquisar',
    type: 'text'
  },
  {
    name: 'active',
    label: 'Atividade',
    type: 'select',
    options: [
      { label: 'Ativo', value: 'active' },
      { label: 'Desativado', value: 'inactive' }
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
