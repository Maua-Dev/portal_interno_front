import { Action } from '@/@clean/shared/domain/entities/action'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import IconButton from '@mui/material/IconButton'
import { ReactNode } from 'react'
import historyIcon from '@/app/assets/history_image_button.png'

const Container = ({
  children,
  isOpen
}: {
  children: ReactNode
  isOpen: boolean
}) => {
  return (
    <div
      className={`flex ${
        isOpen ? 'h-auto' : 'h-28'
      } w-64 transform flex-col items-start justify-between rounded-xl border-2 border-gray-400 px-4 py-3 transition-all duration-500 sm:w-80`}
    >
      {children}
    </div>
  )
}

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mt-1 flex w-full flex-row items-center justify-between">
      {children}
    </div>
  )
}

const ActionDisplay = ({
  children,
  key
}: {
  children: ReactNode
  key: number
}) => {
  return (
    <ul
      key={key}
      className="flex w-full flex-row items-center justify-center py-2 sm:grid-cols-2"
    >
      {children}
    </ul>
  )
}

const ActionContainer = ({
  children,
  isOpen
}: {
  children: ReactNode
  isOpen: boolean
}) => {
  return (
    <div
      className={`w-full transform flex-col transition-all delay-500 duration-500 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {children}
    </div>
  )
}

const ActionButton = ({ text, color }: { text: string; color: string }) => {
  return (
    <button
      className={`${
        color === 'blue'
          ? 'h-6 rounded-full border-2 border-blue-600 px-4 text-xs text-blue-600 transition-all duration-500 hover:bg-blue-600 hover:text-white xl:h-8 xl:px-7 xl:text-base'
          : 'h-6 rounded-full border-2 border-red-600 px-4 text-xs text-red-600 transition-all duration-500 hover:bg-red-600 hover:text-white xl:h-8 xl:px-7 xl:text-base'
      }`}
    >
      {text}
    </button>
  )
}

const Line = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full flex-col items-center gap-4">{children}</div>
  )
}

const hoursFormatter = (duration: number): string => {
  const hours = Math.floor(duration / 3600000)
  const mins = ((duration / 3600000) % 1) * 60
  return `${hours.toString.length !== 2 ? `${'0' + hours}` : hours}:${
    mins.toFixed(0).length !== 2 ? `${'0' + mins.toFixed(0)}` : mins.toFixed(0)
  }`
}

export default function HistoryButton({
  onClick,
  isOpen,
  activities
}: {
  onClick: () => void
  isOpen: boolean
  activities: Action[]
}) {
  return (
    <Container isOpen={isOpen}>
      <Header>
        <img src={historyIcon} alt="History Icon" className="w-36 sm:w-48" />
        <IconButton onClick={onClick}>
          <ExpandMoreIcon className="place-items-center text-2xl" />
        </IconButton>
      </Header>
      <ActionContainer isOpen={isOpen}>
        {isOpen &&
          activities.map((activity, index) => {
            return (
              <ActionDisplay key={index}>
                <Line>
                  <p className="w-20 overflow-hidden text-ellipsis whitespace-nowrap text-center text-sm font-bold sm:w-36">
                    {activity.title}
                  </p>
                  <ActionButton text="Abrir" color="blue" />
                </Line>
                <Line>
                  <span className="font-bold">
                    {hoursFormatter(activity.duration)}
                  </span>
                  <ActionButton text="Excluir" color="red" />
                </Line>
              </ActionDisplay>
            )
          })}
      </ActionContainer>
    </Container>
  )
}
