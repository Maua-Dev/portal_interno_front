import { url } from 'inspector'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MenuIcon from '@mui/icons-material/Menu'
import { DefaultIconButton, NavBarButton } from './little_components/Buttons'
import { useState } from 'react'

export default function NavBar() {
  const [isOpen, setOpen] = useState(false)

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

  const handleHamburguerClick = () => {
    setOpen(!isOpen)
  }

  return (
    <div className="flex-col">
      <div className="flex h-full items-center justify-between bg-gradient-to-t from-blue-900 to-blue-800/90 pl-3 pr-3 text-white lg:pl-11">
        <div className="flex gap-12">
          <div className="flex pb-2 pt-2">
            <h1 className="text-5xl">D</h1>
            <div className="flex-col">
              <h2 className="mt-3 leading-none">
                <strong>EV</strong>
              </h2>
              <h3 className="text-xs leading-none">COMMUNITY</h3>
            </div>
          </div>
          <div className="m-0 flex gap-5  max-[950px]:hidden">
            {linksList.map((link, index) => {
              return (
                <NavBarButton
                  key={index}
                  link_id={link.id}
                  link_text={link.text}
                  button_style=""
                  p_style=""
                />
              )
            })}
          </div>
        </div>
        <div className="flex gap-1 ">
          {iconsList.map((icon, index) => {
            return (
              <DefaultIconButton
                onClick={() => {}}
                style="text-white max-[950px]:hidden"
                key={index}
              >
                {icon.icon_name}
              </DefaultIconButton>
            )
          })}
          <DefaultIconButton
            onClick={handleHamburguerClick}
            style="text-white min-[950px]:hidden"
            key={''}
          >
            <MenuIcon />
          </DefaultIconButton>
        </div>
      </div>
      <div
        className={
          isOpen
            ? 'relative h-0 duration-700'
            : 'h-fit flex-col justify-evenly gap-3 bg-blue-950 py-3 duration-500 min-[950px]:hidden'
        }
      >
        <div className="flex-col justify-center">
          {linksList.map((link, index) => {
            return (
              <NavBarButton
                key={index}
                link_id={link.id}
                link_text={link.text}
                button_style=""
                p_style=""
              />
            )
          })}
        </div>
        <div>
          <div
            className={
              isOpen ? 'hidden' : 'mt-6 flex items-center justify-center gap-2'
            }
          >
            {iconsList.map((icon, index) => {
              return (
                <DefaultIconButton
                  onClick={() => {}}
                  style="text-white min-[950px]:hidden"
                  key={index}
                >
                  {icon.icon_name}
                </DefaultIconButton>
              )
            })}
            <DefaultIconButton
              onClick={handleHamburguerClick}
              style="text-white max-[950px]:hidden"
              key={''}
            >
              <MenuIcon />
            </DefaultIconButton>
          </div>
        </div>
      </div>
    </div>
  )
}
