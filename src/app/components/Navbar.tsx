import { url } from 'inspector'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { DefaultIconButton } from './little-components/Buttons'
import { useState } from 'react'

export default function NavBar() {
  const [HoveredButtonIndex, setHoveredButtonIndex] = useState<number | null>(
    null
  )

  const linksList = [
    {
      id: 1,
      text: 'Contatos',
      url: ''
    },
    {
      id: 2,
      text: 'Abrir denuncia',
      url: ''
    },
    {
      id: 3,
      text: 'Planilha excel',
      url: ''
    },
    {
      id: 4,
      text: 'Projetos',
      url: ''
    }
  ]

  const iconsList = [
    {
      id: 1,
      icon_name: <NotificationsNoneIcon className="h-6 w-6 rotate-12" />,
      url: ''
    },
    {
      id: 2,
      icon_name: <HelpOutlineIcon className="h-6 w-6" />,
      url: ''
    },
    {
      id: 3,
      icon_name: <AccountCircleIcon className=" h-8 w-8" />,
      url: ''
    }
  ]

  const handleButtonHovered = (index: number) => {
    setHoveredButtonIndex(index)
  }

  const handleButtonLeave = () => {
    setHoveredButtonIndex(null)
  }

  return (
    <div className="flex h-full items-center justify-between bg-gradient-to-t from-blue-900 to-blue-800/90 px-2 text-white">
      <div className="flex gap-12">
        <div className="flex pb-2 pl-2 pt-2">
          <h1 className="text-5xl">D</h1>
          <div className="flex-col">
            <h2 className="mt-3 leading-none">
              <strong>EV</strong>
            </h2>
            <h3 className="text-xs leading-none">COMMUNITY</h3>
          </div>
        </div>
        <div className="m-0 flex gap-5">
          {linksList.map((link, index) => {
            return (
              <button
                key={index}
                className="flex px-2 pb-3 hover:bg-white hover:text-blue-900"
                onMouseEnter={() => {
                  handleButtonHovered(link.id)
                }}
                onMouseLeave={handleButtonLeave}
              >
                <p className="mt-auto flex items-center justify-center gap-2 text-lg font-light">
                  {link.text}
                  <DefaultIconButton
                    style={
                      HoveredButtonIndex == link.id
                        ? 'text-blue-900'
                        : 'text-white'
                    }
                    key={index}
                  >
                    <KeyboardArrowDownIcon />
                  </DefaultIconButton>
                </p>
              </button>
            )
          })}
        </div>
      </div>
      <div className="flex gap-1">
        {iconsList.map((icon, index) => {
          return (
            <DefaultIconButton style="text-white" key={index}>
              {icon.icon_name}
            </DefaultIconButton>
          )
        })}
      </div>
    </div>
  )
}
