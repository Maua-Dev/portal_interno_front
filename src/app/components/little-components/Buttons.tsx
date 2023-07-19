import { IconButton } from '@mui/material'
import { ReactNode } from 'react'

interface DefaultIconButtonProps {
  children: ReactNode
  style: string
}

const DefaultIconButton = ({ children, style }: DefaultIconButtonProps) => {
  return (
    <IconButton className={'hover:bg-transparent ' + style}>
      {children}
    </IconButton>
  )
}

export { DefaultIconButton }
