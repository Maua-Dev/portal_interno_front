import { FilterOptions } from '../FilterBar'

export const memberFilterOptions: FilterOptions[] = [
  {
    name: 'searchText',
    label: 'Pesquisar',
    type: 'text'
  },
  {
    name: 'project',
    label: 'Projetos',
    type: 'select',
    options: [] // FilterBar Component handle to fetch the updated options for projects
  },
  {
    name: 'stack',
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
    name: 'year',
    label: 'Ano',
    type: 'select',
    options: [
      { label: '1° ano', value: '1' },
      { label: '2° ano', value: '2' },
      { label: '3° ano', value: '3' },
      { label: '4° ano', value: '4' },
      { label: '5° ano', value: '5' }
    ]
  },
  {
    name: 'role',
    label: 'Cargo',
    type: 'select',
    options: [
      { label: 'DEV', value: 'DEV' },
      { label: 'HEAD', value: 'HEAD' },
      { label: 'DIRETOR', value: 'DIRECTOR' },
      { label: 'SCRUM', value: 'SCRUM' },
      { label: 'PO', value: 'PO' }
    ]
  },
  {
    name: 'orderBy',
    label: 'Ordenar Por',
    type: 'select',
    options: [
      { label: 'Maior Número de Horas Trabalhadas', value: 'MORE' },
      { label: 'Menor Número de Horas Trabalhadas', value: 'LESS' }
    ]
  },
  {
    name: 'situation',
    label: 'Situação',
    type: 'select',
    options: [
      { label: 'Ativo', value: 'ACTIVE' },
      { label: 'Desligado', value: 'DISCONNECTED' },
      { label: 'Em espera', value: 'ON_HOLD' },
      { label: 'Congelado', value: 'FREEZE' }
    ]
  }
]
