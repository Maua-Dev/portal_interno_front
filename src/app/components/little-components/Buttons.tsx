import { IconButton } from '@mui/material'
import { ReactNode } from 'react'

const DefaultIconButton = ({ children }: { children: ReactNode }) => {
  return <IconButton className="hover:bg-transparent">{children}</IconButton>
}

export { DefaultIconButton }
