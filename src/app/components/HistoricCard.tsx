import Card from './little_components/Card'
import { History, SlidersHorizontal } from 'lucide-react'
import TextField from './little_components/TextField'
import Text from './little_components/Text'
import Button from './little_components/Button'

export default function HistoricCard() {
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
        <TextField />
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
