import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import IconButton from '@mui/material/IconButton'
import { ReactNode } from 'react'

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-16 w-48 items-center justify-between rounded-xl border-2 border-gray-400 px-4 sm:w-52">
      {children}
    </div>
  )
}

export default function HistoryButton() {
  return (
    <Container>
      <p className="text-xl">Histórico</p>
      <IconButton>
        <ExpandMoreIcon className="text-2xl" />
      </IconButton>
    </Container>
  )
}
