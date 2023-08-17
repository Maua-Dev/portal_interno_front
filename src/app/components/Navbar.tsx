import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MenuIcon from '@mui/icons-material/Menu'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import ErrorIcon from '@mui/icons-material/Error'
import TableChartIcon from '@mui/icons-material/TableChart'
import PollIcon from '@mui/icons-material/Poll'
import { DefaultIconButton, NavBarButton } from './little_components/Buttons'
import { ReactNode, useState } from 'react'
import { IconButton } from '@mui/material'

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
  icon: ReactNode
}

const ButtonListWeb = ({ linkList }: { linkList: LinkListProps[] }) => {
  return (
    <div className="m-0 flex gap-5  max-[1100px]:hidden">
      {linkList.map((link, index) => {
        return (
          <NavBarButton
            key={index}
            linkId={link.id}
            linkText={link.text}
            buttonStyle=""
            pStyle=""
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
      <div className="max-[950px]:hidden">
        {iconList.map((icon, index) => {
          return (
            <DefaultIconButton onClick={() => {}} key={index}>
              {icon.icon_name}
            </DefaultIconButton>
          )
        })}
      </div>
      <div className="min-[950px]:hidden">
        <DefaultIconButton onClick={handleHamburguerClick} key={''}>
          <MenuIcon className="text-white" />
        </DefaultIconButton>
      </div>
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
  const [hoveredButtonIndex, setHoveredButtonIndex] = useState<number | null>(
    null
  )

  const handleHovered = (index: number) => {
    setHoveredButtonIndex(index)
  }

  const handleLeave = () => {
    setHoveredButtonIndex(null)
  }

  return (
    <div className={isOpen ? 'flex flex-col gap-5' : 'hidden'}>
      {linkList.map((link, index) => {
        return (
          <button
            onMouseEnter={() => {
              handleHovered(index)
            }}
            onMouseLeave={handleLeave}
            key={index}
            className="flex items-center gap-4 py-3 pl-7 text-left text-xl text-slate-600 hover:bg-blue-900 hover:text-white"
          >
            <IconButton
              disableRipple
              style={{
                color: hoveredButtonIndex === index ? 'white' : '#6B7280'
              }}
            >
              {link.icon}
            </IconButton>
            <p>{link.text}</p>
          </button>
        )
      })}
    </div>
  )
}

const MobileNavbar = ({
  isOpen,
  children
}: {
  isOpen: boolean
  children: ReactNode
}) => {
  return (
    <div className=" absolute flex h-screen w-full">
      <div
        className={
          isOpen
            ? 'z-10  w-96 justify-evenly bg-blue-100 pt-12 duration-500 min-[950px]:hidden'
            : 'w-0 duration-700'
        }
      >
        {children}
      </div>
      <div
        className={
          isOpen
            ? 'absolute h-full w-full bg-black opacity-60 min-[950px]:hidden'
            : 'hidden'
        }
      />
    </div>
  )
}

export default function NavBar() {
  const [isOpen, setOpen] = useState(false)

  const linksList = [
    {
      id: 1,
      text: 'Contatos',
      icon: <PhoneIphoneIcon className="h-7 w-7"></PhoneIphoneIcon>,
      url: '/contatos'
    },
    {
      id: 2,
      text: 'Abrir denuncia',
      icon: <ErrorIcon className="h-7 w-7"></ErrorIcon>,
      url: '/denuncia'
    },
    {
      id: 3,
      text: 'Planilha excel',
      icon: <TableChartIcon className="h-7 w-7"></TableChartIcon>,
      url: '/planilha'
    },
    {
      id: 4,
      text: 'Projetos',
      icon: <PollIcon className="h-7 w-7"></PollIcon>,
      url: '/projetos'
    }
  ]

  const iconsList = [
    {
      id: 1,
      icon_name: (
        <NotificationsNoneIcon className="h-6 w-6 rotate-12 text-white" />
      ),
      url: '/notifications'
    },
    {
      id: 2,
      icon_name: <HelpOutlineIcon className="h-6 w-6 text-white" />,
      url: '/help'
    },
    {
      id: 3,
      icon_name: <AccountCircleIcon className=" h-8 w-8 text-white" />,
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
      <MobileNavbar isOpen={isOpen}>
        <ButtonListMoblie isOpen={isOpen} linkList={linksList} />
      </MobileNavbar>
    </div>
  )
}
