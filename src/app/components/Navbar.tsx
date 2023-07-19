import { url } from 'inspector'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import IconButton from '@mui/material/IconButton'
import { DefaultIconButton } from './little-components/Buttons'

export default function NavBar() {
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

  return (
    <div className="bg-blue-900 text-white">
      <div>
        <h1>D</h1>
        <div>
          <h2>ev</h2>
          <h3>community</h3>
        </div>
      </div>
      <div>
        {linksList.map((link, index) => {
          return (
            <button key={index} className="hover:bg-blue-600">
              <p>
                {link.text}
                <DefaultIconButton color="text-white" key={index}>
                  <KeyboardArrowDownIcon />
                </DefaultIconButton>
              </p>
            </button>
          )
        })}
      </div>
      <div>
        {iconsList.map((icon, index) => {
          return (
            <DefaultIconButton color="text-white" key={index}>
              {icon.icon_name}
            </DefaultIconButton>
          )
        })}
      </div>
    </div>
  )
}
