/* eslint-disable indent */
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import IconButton from '@mui/material/IconButton'
import { ReactNode, useContext, useEffect, useState } from 'react'
import historyIcon from '../assets/history_image_button.png'
import { Action } from '../../@clean/shared/domain/entities/action'
import { ActionContext } from '../contexts/action_context'

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={
        'flex h-fit w-full transform flex-col items-start justify-between rounded-xl border-2 border-gray-400 px-4 py-3 transition-all duration-500 xl:w-80'
      }
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
  index
}: {
  children: ReactNode
  index: string
}) => {
  return (
    <ul
      key={index}
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

const ActionButton = ({
  text,
  color,
  onClick
}: {
  text: string
  color: string
  onClick: () => void
}) => {
  return (
    <button
      onClick={onClick}
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
  const date = new Date(duration)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const timeFormated = `${hours}:${minutes}`
  return timeFormated
}

interface HistoricListUnitProps {
  action: Action
  openHistoric: (activity: Action) => void
}

const HistoricListUnit = ({ action, openHistoric }: HistoricListUnitProps) => {
  return (
    <ActionDisplay index={action.actionId}>
      <Line>
        <p className="w-20 overflow-hidden text-ellipsis whitespace-nowrap text-center text-sm font-bold sm:w-36">
          {action.title}
        </p>
        <ActionButton
          text="Abrir"
          color="blue"
          onClick={() => {
            openHistoric(action)
          }}
        />
      </Line>
      <Line>
        <span className="font-bold">{hoursFormatter(action.duration)}</span>
        <ActionButton text="Excluir" color="red" onClick={() => {}} />
      </Line>
    </ActionDisplay>
  )
}

export default function HistoryButton({
  openHistoric
}: {
  openHistoric: (activity: Action) => void
}) {
  const [isOpen, setOpen] = useState<boolean>(false)
  const [history, setHistory] = useState<Action[] | undefined>(undefined)

  const { getHistory } = useContext(ActionContext)

  const loadHistoricData = async () => {
    try {
      const response = await getHistory('19017310', 20)
      setHistory(response)
    } catch (error) {
      console.error('Error loading historic data:', error)
    }
  }
  const handleIconClick = () => {
    loadHistoricData()
    if (history) {
      setOpen((prev) => !prev)
    }
  }

  useEffect(() => {
    loadHistoricData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Container>
      <Header>
        <img
          src={historyIcon}
          alt="History Icon"
          className="mt-2 w-40 xl:mt-0 xl:w-48"
        />
        <IconButton onClick={handleIconClick}>
          <ExpandMoreIcon className="place-items-center text-2xl" />
        </IconButton>
      </Header>
      <ActionContainer isOpen={isOpen}>
        {isOpen && history
          ? history.map((activity, index) => {
              return (
                <HistoricListUnit
                  key={index}
                  action={activity}
                  openHistoric={openHistoric}
                />
              )
            })
          : null}
      </ActionContainer>
    </Container>
  )
}
