import Card from './little_components/Card'
import Switch from './little_components/Switch'
import Text from './little_components/Text'
import { Filter } from 'lucide-react'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/theme_context'
import * as Select from './little_components/Select'
import TextField from './little_components/TextField'

interface ProjectProp {
  name: string
  code: string
}

const projectsMock: ProjectProp[] = [
  {
    name: 'Portal Interno',
    code: 'PI'
  },
  {
    name: 'Maua Food',
    code: 'MF'
  },
  {
    name: 'Selfie Maua',
    code: 'SF'
  }
]

export default function HistoricCard() {
  const theme = useContext(ThemeContext)

  return (
    <Card
      variant="lg"
      className="flex h-fit flex-row items-center justify-between opacity-80 shadow-sm shadow-gray-500 duration-150 ease-in hover:opacity-100"
    >
      <div className="flex flex-row items-center gap-5">
        <Filter className="h-10 w-10" />
        <Text size="lg">Filtros</Text>
        <Switch variant="regular" />
        <TextField />
      </div>
      <div className="flex flex-row gap-5">
        <Select.Root label="Projetos">
          <Select.Content value="PI">Portal Interno</Select.Content>
          <Select.Content value="PI">Portal Interno</Select.Content>
          <Select.Content value="PI">Portal Interno</Select.Content>
        </Select.Root>
        <Select.Root label="Área" className="w-fit">
          <Select.Content value="PI">Portal Interno</Select.Content>
          <Select.Content value="PI">Portal Interno</Select.Content>
          <Select.Content value="PI">Portal Interno</Select.Content>
        </Select.Root>
        <Select.Root label="Ação">
          <Select.Content value="PI">Portal Interno</Select.Content>
          <Select.Content value="PI">Portal Interno</Select.Content>
          <Select.Content value="PI">Portal Interno</Select.Content>
        </Select.Root>
      </div>
    </Card>
  )
}
