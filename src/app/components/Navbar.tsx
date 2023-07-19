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
      icon_name: <NotificationsNoneIcon />,
      url: ''
    },
    {
      id: 2,
      icon_name: <HelpOutlineIcon />,
      url: ''
    },
    {
      id: 3,
      icon_name: <AccountCircleIcon />,
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
    <div className="flex justify-between bg-blue-900 text-white">
      <div className="flex gap-4">
        <div className="flex pb-2 pl-2 pt-2">
          <h1 className="text-4xl">D</h1>
          <div className="flex-col">
            <h2>ev</h2>
            <h3>community</h3>
          </div>
        </div>
        <div className="h-max">
          {linksList.map((link, index) => {
            return (
              <button
                key={index}
                className="h-max p-2 hover:bg-white hover:text-blue-900"
                onMouseEnter={() => {
                  handleButtonHovered(link.id)
                }}
                onMouseLeave={handleButtonLeave}
              >
                <p>
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
      <div>
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
