import { IconButton } from '@mui/material'
import { ReactNode } from 'react'

interface DefaultIconButtonProps {
  children: ReactNode
  color: string
}

const DefaultIconButton = ({ children, color }: DefaultIconButtonProps) => {
  return (
    <IconButton className={'hover:bg-transparent ' + color}>
      {children}
    </IconButton>
  )
}

export { DefaultIconButton }
