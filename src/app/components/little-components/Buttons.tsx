import { IconButton } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { ReactNode } from 'react'

interface DefaultIconButtonProps {
  children: ReactNode
  style: string
  onClick: () => void
}

const DefaultIconButton = ({
  children,
  style,
  onClick
}: DefaultIconButtonProps) => {
  return (
    <IconButton
      onClick={onClick}
      disableRipple
      className={'p-0 hover:bg-transparent ' + style}
    >
      {children}
    </IconButton>
  )
}

interface NavbarButtonProps {
  key: number
  link_id: number
  hovered_button_id: number | null
  link_text: string
  onMouseEnter: (id: number) => {}
  onMouseLeave: () => {}
}

const NavBarButton = ({
  key,
  link_id,
  hovered_button_id,
  link_text,
  onMouseEnter,
  onMouseLeave
}: NavbarButtonProps) => {
  return (
    <button
      key={key}
      className="flex px-2 hover:bg-white hover:text-blue-900"
      onMouseEnter={() => {
        onMouseEnter(link_id)
      }}
      onMouseLeave={onMouseLeave}
    >
      <p className="mt-auto flex items-center justify-center gap-2 text-lg font-light">
        {link_text}
        <DefaultIconButton
          onClick={() => {}}
          style={hovered_button_id == link_id ? 'text-blue-900' : 'text-white'}
          key={key}
        >
          <KeyboardArrowDownIcon />
        </DefaultIconButton>
      </p>
    </button>
  )
}

export { DefaultIconButton, NavBarButton }
