import Card from './little_components/Card'
import Switch from './little_components/Switch'
import Text from './little_components/Text'
import { Filter } from 'lucide-react'

export default function HistoricCard() {
  return (
    <Card
      variant="lg"
      className="flex h-fit flex-row items-center justify-between opacity-80 shadow-sm shadow-gray-500 duration-150 ease-in hover:opacity-100"
    >
      <div className="flex flex-row items-center gap-3">
        <Filter className="h-10 w-10" />
        <Text size="lg">Filtros</Text>
        <Switch variant="regular" />
        <input
          type="text"
          className="h-10 w-64 rounded-full border border-skin-muted bg-skin-fill pl-3"
          placeholder="Digite o titulo da atividade..."
        />
      </div>
      <div className=""></div>
    </Card>
  )
}
