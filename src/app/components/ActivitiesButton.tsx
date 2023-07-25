import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import IconButton from '@mui/material/IconButton'
import { ReactNode } from 'react'

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mb-5 flex h-16 w-64 items-center justify-between rounded-xl border-2 border-gray-400 px-4 sm:w-80">
      {children}
    </div>
  )
}

export default function ActivitiesButton({ onClick }: { onClick: () => void }) {
  return (
    <Container>
      <p className="text-xl">Atividades</p>
      <IconButton onClick={onClick}>
        <AddCircleOutlineIcon />
      </IconButton>
    </Container>
  )
}
