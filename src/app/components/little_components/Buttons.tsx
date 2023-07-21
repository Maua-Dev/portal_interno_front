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

const CancelAndSaveButtons = ({ className }: { className?: string }) => {
  return (
    <div className={'mb-3 flex flex-row gap-4' + className}>
      <button className="mr-2 rounded-md border-2 border-red-600 p-1 font-bold text-red-600">
        CANCELAR
      </button>
      <button className="rounded-md border-2 border-blue-600 p-1 font-bold text-blue-600">
        SALVAR
      </button>
    </div>
  )
}

export { DefaultIconButton, CancelAndSaveButtons }
