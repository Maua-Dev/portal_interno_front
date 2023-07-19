import { IconButton } from '@mui/material'
import { ReactNode } from 'react'

interface DefaultIconButtonProps {
  children: ReactNode
  style: string
}

const DefaultIconButton = ({ children, style }: DefaultIconButtonProps) => {
  return (
    <IconButton disableRipple className={'hover:bg-transparent p-0 ' + style}>
      {children}
    </IconButton>
  )
}

export { DefaultIconButton }
