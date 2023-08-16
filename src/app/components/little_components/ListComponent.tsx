import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { ReactNode } from 'react'
import { MainCard } from './MainCard'
import { DefaultIconButton } from './Buttons'

interface ListComponentProps {
  children: ReactNode
  label: string
}

const ListComponent = ({ children, label }: ListComponentProps) => {
  return (
    <MainCard width="w-full">
      <div className="flex justify-between">
        <h1 className="font-semibold">{label}</h1>
        <DefaultIconButton onClick={() => {}}>
          <ExpandMoreIcon className="text-2xl" />
        </DefaultIconButton>
      </div>
      <div className="mt-4 flex flex-col gap-5">{children}</div>
    </MainCard>
  )
}

export { ListComponent }
