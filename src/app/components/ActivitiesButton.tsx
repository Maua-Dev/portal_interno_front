import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import IconButton from '@mui/material/IconButton'
import { ReactNode } from 'react'
import activityIcon from '../assets/activities_image_button.png'

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mb-5 flex h-28 w-full items-center justify-between rounded-xl border-2 border-gray-400 px-4 xl:w-80">
      {children}
    </div>
  )
}

export default function ActivitiesButton({ onClick }: { onClick: () => void }) {
  return (
    <Container>
      <img src={activityIcon} alt="Activity Icon" className="w-40 xl:w-48" />
      <IconButton onClick={onClick}>
        <AddCircleOutlineIcon />
      </IconButton>
    </Container>
  )
}
