import { url } from 'inspector'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MenuIcon from '@mui/icons-material/Menu'
import { DefaultIconButton, NavBarButton } from './little_components/Buttons'
import { ReactNode, useState } from 'react'

// const Container = ({ children }: { children: ReactNode }) => {
//   return (
//     <div className="flex h-full w-3/4 flex-col rounded-xl border-2 border-gray-400 px-4">
//       {children}
//     </div>
//   )
// }

const NavBarContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-full items-center justify-between bg-gradient-to-t from-blue-900 to-blue-800/90 pl-3 pr-3 text-white lg:pl-11">
      {children}
    </div>
  )
}

const DevLogo = () => {
  return (
    <div className="flex pb-2 pt-2">
      <h1 className="text-5xl">D</h1>
      <div className="flex-col">
        <h2 className="mt-3 leading-none">
          <strong>EV</strong>
        </h2>
        <h3 className="text-xs leading-none">COMMUNITY</h3>
      </div>
    </div>
  )
}

interface LinkListProps {
  id: number
  text: string
  url: string
}

const ButtonListWeb = ({ linkList }: { linkList: LinkListProps[] }) => {
  return (
    <div className="m-0 flex gap-5  max-[950px]:hidden">
      {linkList.map((link, index) => {
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
  )
}

const LeftSide = ({ children }: { children: ReactNode }) => {
  return <div className="flex gap-12">{children}</div>
}

interface IconListProps {
  id: number
  icon_name: ReactNode
  url: string
}

const RightSideIcons = ({
  handleHamburguerClick,
  iconList
}: {
  handleHamburguerClick: () => void
  iconList: IconListProps[]
}) => {
  return (
    <div className="flex gap-1 ">
      {iconList.map((icon, index) => {
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
  )
}

const ButtonListMoblie = ({
  linkList,
  isOpen
}: {
  linkList: LinkListProps[]
  isOpen: boolean
}) => {
  return (
    <div>
      {linkList.map((link, index) => {
        return (
          <NavBarButton
            key={index}
            link_id={link.id}
            link_text={link.text}
            button_style={
              isOpen
                ? 'w-full flex justify-center py-3 min-[950px]:hidden'
                : 'hidden'
            }
            p_style="text-white"
          />
        )
      })}
    </div>
  )
}

const IconsListMoblie = ({
  isOpen,
  iconList
}: {
  iconList: IconListProps[]
  isOpen: boolean
}) => {
  return (
    <div
      className={
        isOpen ? 'mt-6 flex items-center justify-center gap-2' : 'hidden'
      }
    >
      {iconList.map((icon, index) => {
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
    </div>
  )
}

const MobileDropDown = ({
  isOpen,
  children
}: {
  isOpen: boolean
  children: ReactNode
}) => {
  return (
    <div
      className={
        isOpen
          ? 'h-fit flex-col justify-evenly gap-3 bg-blue-950 py-3 duration-500 min-[950px]:hidden'
          : 'relative h-0 duration-700'
      }
    >
      {children}
    </div>
  )
}

export default function NavBar() {
  const [isOpen, setOpen] = useState(false)

  const linksList = [
    {
      id: 1,
      text: 'Contatos',
      url: '/contatos'
    },
    {
      id: 2,
      text: 'Abrir denuncia',
      url: '/denuncia'
    },
    {
      id: 3,
      text: 'Planilha excel',
      url: '/planilha'
    },
    {
      id: 4,
      text: 'Projetos',
      url: '/projetos'
    }
  ]

  const iconsList = [
    {
      id: 1,
      icon_name: <NotificationsNoneIcon className="h-6 w-6 rotate-12" />,
      url: '/notifications'
    },
    {
      id: 2,
      icon_name: <HelpOutlineIcon className="h-6 w-6" />,
      url: '/help'
    },
    {
      id: 3,
      icon_name: <AccountCircleIcon className=" h-8 w-8" />,
      url: '/account'
    }
  ]

  const handleHamburguerClick = () => {
    setOpen(!isOpen)
  }

  return (
    <div className="flex-col">
      <NavBarContainer>
        <LeftSide>
          <DevLogo />
          <ButtonListWeb linkList={linksList} />
        </LeftSide>
        <RightSideIcons
          handleHamburguerClick={handleHamburguerClick}
          iconList={iconsList}
        />
      </NavBarContainer>
      <MobileDropDown isOpen={isOpen}>
        <ButtonListMoblie isOpen={isOpen} linkList={linksList} />
        <IconsListMoblie isOpen={isOpen} iconList={iconsList} />
      </MobileDropDown>
    </div>
  )
}
