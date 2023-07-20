import { IconButton } from '@mui/material'
import { ReactNode } from 'react'

interface DefaultIconButtonProps {
  children: ReactNode
  style: string
}

const DefaultIconButton = ({ children, style }: DefaultIconButtonProps) => {
  return (
    <IconButton disableRipple className={'p-0 hover:bg-transparent ' + style}>
      {children}
    </IconButton>
  )
}

export { DefaultIconButton }
