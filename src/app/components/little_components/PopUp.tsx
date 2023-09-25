import { HTMLAttributes, ReactNode, useState } from 'react'

interface PopUpProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function PopUp({ children, ...rest }: PopUpProps) {
  const [open, setOpen] = useState(true)

  const handleClick = () => {
    setOpen(false)
  }

  if (!open) return null
  return (
    <div
      {...rest}
      className={
        'fixed z-30 flex h-screen w-screen items-center justify-center bg-black/30 '
      }
      onClick={handleClick}
    >
      {children}
    </div>
  )
}
