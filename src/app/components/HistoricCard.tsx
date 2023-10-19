import Card from './little_components/Card'
import Switch from './little_components/Switch'
import Text from './little_components/Text'
import { Filter, ChevronDown } from 'lucide-react'
import * as Select from '@radix-ui/react-select'

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
      <div className="">
        <Select.Root>
          <Select.Trigger className="flex flex-row items-center gap-3 rounded-md bg-skin-fill p-2">
            <Select.Value placeholder="Projetos" />
            <Select.Icon>
              <ChevronDown className="h-5 w-5" />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              align="center"
              position="popper"
              className="bg-white"
            >
              <Select.Viewport className="bg-white">
                <Select.Item value="PI">
                  <Select.ItemText>Portal Interno</Select.ItemText>
                  <Select.ItemIndicator></Select.ItemIndicator>
                </Select.Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    </Card>
  )
}
