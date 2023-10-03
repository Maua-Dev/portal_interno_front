import { IconButton } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { ReactNode, useState } from 'react'

interface DefaultIconButtonProps {
  children: ReactNode
  onClick?: () => void
}

const DefaultIconButton = ({ children, onClick }: DefaultIconButtonProps) => {
  return (
    <IconButton onClick={onClick} disableRipple>
      {children}
    </IconButton>
  )
}

interface NavbarButtonProps {
  linkId: number
  linkText: string
  buttonStyle: string
  pStyle: string
}

const NavBarButton = ({
  linkId,
  linkText,
  buttonStyle,
  pStyle
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
      className={'flex px-2 hover:bg-white hover:text-blue-900  ' + buttonStyle}
      onMouseEnter={() => {
        handleButtonHovered(linkId)
      }}
      onMouseLeave={handleButtonLeave}
    >
      <p
        className={
          HoveredButtonIndex == linkId
            ? 'mt-auto flex items-center justify-center gap-2 text-lg font-light text-blue-950' +
              pStyle
            : 'mt-auto flex items-center justify-center gap-2 text-lg font-light text-white ' +
              pStyle
        }
      >
        {linkText}
        <KeyboardArrowDownIcon
          className={
            HoveredButtonIndex == linkId ? 'text-blue-950' : 'text-white'
          }
        />
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

const CancelAndSaveButtons = ({
  onClickSave,
  onClickCancel
}: {
  onClickSave: () => void
  onClickCancel: () => void
}) => {
  return (
    <div className={'mb-3 flex flex-row gap-4'}>
      <button
        onClick={onClickCancel}
        className="mr-2 rounded-md border-2 border-red-600 p-1 font-bold text-red-600"
      >
        CANCELAR
      </button>
      <button
        onClick={onClickSave}
        className="rounded-md border-2 border-blue-600 p-1 font-bold text-blue-600"
      >
        SALVAR
      </button>
    </div>
  )
}

const FilterButtons = ({
  children,
  onClick
}: {
  children: ReactNode
  onClick: () => void
}) => {
  return (
    <button
      onClick={onClick}
      className="mr-2 h-8 w-28 rounded-lg border-2 border-gray-500  text-xs text-gray-500 transition-all duration-500 hover:border-gray-800 hover:text-gray-800 hover:duration-500"
    >
      {children}
    </button>
  )
}

export {
  DefaultIconButton,
  CancelAndSaveButtons,
  NavBarButton,
  DefaultButton,
  FilterButtons
}
