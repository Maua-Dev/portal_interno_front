import { IconButton, colors } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { ReactNode, useEffect, useState } from 'react'
import style from 'styled-jsx/style'

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
  link_id: number
  link_text: string
  button_style: string
  p_style: string
}

const NavBarButton = ({
  link_id,
  link_text,
  button_style,
  p_style
}: NavbarButtonProps) => {
  const [HoveredButtonIndex, setHoveredButtonIndex] = useState<number | null>(
    null
  )

  const handleButtonHovered = (index: number) => {
    setHoveredButtonIndex(index)
  }

  const handleButtonLeave = () => {
    setHoveredButtonIndex(null)
  }

  return (
    <button
      className={
        'flex px-2 hover:bg-white hover:text-blue-900  ' + button_style
      }
      onMouseEnter={() => {
        handleButtonHovered(link_id)
      }}
      onMouseLeave={handleButtonLeave}
    >
      <p
        className={
          HoveredButtonIndex == link_id
            ? 'mt-auto flex items-center justify-center gap-2 text-lg font-light text-blue-950' +
              p_style
            : 'mt-auto flex items-center justify-center gap-2 text-lg font-light text-white ' +
              p_style
        }
      >
        {link_text}
        <DefaultIconButton
          onClick={() => {}}
          style={
            HoveredButtonIndex == link_id ? 'text-blue-900 ' : 'text-white'
          }
        >
          <KeyboardArrowDownIcon />
        </DefaultIconButton>
      </p>
    </button>
  )
}

interface DefaultButtonProps {
  label: string
  color: string
}

interface borderColorClasses {
  [key: string]: string
}

const DefaultButton = ({ label, color }: DefaultButtonProps) => {
  const borderColorClasses: borderColorClasses = {
    blue: 'border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white',
    red: 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
  }

  const border =
    borderColorClasses[color] ||
    'border-black text-black hover:bg-black hover:text-white'
  return (
    <button
      className={`hidden h-6 rounded-full border-2 px-4 text-xs lg:block xl:h-8 xl:px-7 xl:text-base ${border}`}
    >
      {label}
    </button>
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

export { DefaultIconButton, CancelAndSaveButtons, NavBarButton, DefaultButton }
