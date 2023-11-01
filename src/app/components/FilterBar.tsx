import { SlidersHorizontal } from 'lucide-react'
import Button from './little_components/Button'
import Card from './little_components/Card'
import TextField from './little_components/TextField'
import Text from './little_components/Text'
import { History } from 'lucide-react'

export default function FilterBar() {
  return (
    <Card
      variant="lg"
      className="flex h-fit flex-row items-center justify-between opacity-80 shadow-sm shadow-gray-500 duration-150 ease-in hover:opacity-100"
    >
      <div className="flex flex-row items-center gap-5">
        <div className="flex flex-row items-center gap-2">
          <History className="h-10 w-10" />
          <Text size="2xl">Histórico</Text>
        </div>
        <TextField placeholder="Digite o titulo da atividade..." />
      </div>
      <div className="flex h-full flex-row gap-5">
        <Button variant="default">
          <SlidersHorizontal className="h-5 w-5" />
          Filtrar
        </Button>
      </div>
    </Card>
  )
}
