import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import IconButton from '@mui/material/IconButton'
import { ReactNode } from 'react'

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-16 w-48 items-center justify-between rounded-xl border-2 border-gray-400 px-4 sm:w-52">
      {children}
    </div>
  )
}

export default function ActivitiesButton() {
  return (
    <Container>
      <p className="text-xl">Atividades</p>
      <IconButton>
        <AddCircleOutlineIcon />
      </IconButton>
    </Container>
  )
}