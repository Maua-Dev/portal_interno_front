import { FilterOptions } from '../FilterBar'

export const projectFilterOptions: FilterOptions[] = [
  {
    name: 'searchText',
    label: 'Pesquisar',
    type: 'text'
  },
  // {
  //   name: 'activeStatus',
  //   label: 'Atividade',
  //   type: 'select',
  //   options: [
  //     { label: 'Ativo', value: 'ACTIVE' },
  //     { label: 'Desativado', value: 'INACTIVE' }
  //   ]
  // },
  {
    name: 'orderBy',
    label: 'Ordenar Por',
    type: 'select',
    options: [
      { label: 'Mais Recente', value: 'NEW' },
      { label: 'Mais Antigo', value: 'OLD' }
      // { label: 'Maior Duração', value: 'BIGGER' },
      // { label: 'Menor Duração', value: 'SMALLER' }
    ]
  }
]
