import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import IconButton from '@mui/material/IconButton'
import { ReactNode } from 'react'
import activityIcon from '@/app/assets/activities_image_button.png'

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mb-5 flex h-28 w-64 items-center justify-between rounded-xl border-2 border-gray-400 px-4 sm:w-80">
      {children}
    </div>
  )
}

export default function ActivitiesButton({ onClick }: { onClick: () => void }) {
  return (
    <Container>
      <img src={activityIcon} alt="Activity Icon" className="w-36 sm:w-48" />
      <IconButton onClick={onClick}>
        <AddCircleOutlineIcon />
      </IconButton>
    </Container>
  )
}
