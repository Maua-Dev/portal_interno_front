import { IconButton } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { ReactNode, useState } from 'react'

interface DefaultIconButtonProps {
  children: ReactNode
  style: string
  onClick?: () => void
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
        <DefaultIconButton
          onClick={() => {}}
          style={HoveredButtonIndex == linkId ? 'text-blue-900 ' : 'text-white'}
        >
          <KeyboardArrowDownIcon />
        </DefaultIconButton>
      </p>
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

export { DefaultIconButton, NavBarButton, CancelAndSaveButtons }
