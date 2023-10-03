import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import IconButton from '@mui/material/IconButton'
import { ReactNode } from 'react'
import historyIcon from '../assets/history_image_button.png'
import { Action } from '../../@clean/shared/domain/entities/action'
import { FilterButtons } from './little_components/Buttons'
import { Pagination } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import React from 'react'
import { ActionContext } from '../contexts/action_context'

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
      } w-full transform flex-col items-start justify-between rounded-xl border-2 border-gray-400 px-4 py-3 transition-all duration-500 xl:w-80`}
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
      className={`flex w-full transform flex-col items-center justify-center transition-all delay-500 duration-500 ${
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

export default function HistoryButton({
  onClick,
  isOpen,
  activities,
  openHistoric,
  onClickFilterAdd,
  onClickFilterRemove,
  handleNextPageHistory,
  handleBackPageHistory
}: {
  onClick: () => void
  isOpen: boolean
  activities: Action[]
  openHistoric: () => void
  onClickFilterAdd: () => void
  onClickFilterRemove: () => void
  handleNextPageHistory: () => void
  handleBackPageHistory: () => void
}) {
  const { activitiesPaginationCounter, setActivitiesPaginationCounter } =
    React.useContext(ActionContext)

  return (
    <Container isOpen={isOpen}>
      <Header>
        <img
          src={historyIcon}
          alt="History Icon"
          className="mt-2 w-40 xl:mt-0 xl:w-48"
        />
        <IconButton onClick={onClick}>
          <ExpandMoreIcon className="place-items-center text-2xl" />
        </IconButton>
      </Header>
      <ActionContainer isOpen={isOpen}>
        {isOpen && (
          <div className="mb-3 mt-6 flex flex-row">
            <FilterButtons onClick={onClickFilterAdd}>
              Adicionar filtro
            </FilterButtons>
            <FilterButtons onClick={onClickFilterRemove}>
              Limpar filtro
            </FilterButtons>
          </div>
        )}
        {isOpen &&
          activities &&
          activities.map((activity, index) => {
            return (
              <ActionDisplay key={index} index={activity.actionId}>
                <Line>
                  <p className="w-20 overflow-hidden text-ellipsis whitespace-nowrap text-center text-sm font-bold sm:w-36">
                    {activity.title}
                  </p>
                  <ActionButton
                    text="Abrir"
                    color="blue"
                    onClick={openHistoric}
                  />
                </Line>
                <Line>
                  <span className="font-bold">
                    {hoursFormatter(activity.duration)}
                  </span>
                  <ActionButton text="Excluir" color="red" onClick={() => {}} />
                </Line>
              </ActionDisplay>
            )
          })}
        {isOpen && (
          <div
            className={activitiesPaginationCounter === 1 ? 'ml-9 flex' : 'flex'}
          >
            <IconButton
              className={activitiesPaginationCounter === 1 ? 'hidden' : ''}
              onClick={handleBackPageHistory}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <h3 className="mt-2">{activitiesPaginationCounter}</h3>
            <IconButton onClick={handleNextPageHistory}>
              <ArrowForwardIosIcon />
            </IconButton>
          </div>
        )}
      </ActionContainer>
    </Container>
  )
}
