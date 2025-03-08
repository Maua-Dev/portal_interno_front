/* eslint-disable react/no-children-prop */
import { HTMLAttributes, useContext, useState } from 'react'
import Card from '../../Card'
import { StateIcon, IconText } from './Icon'
import { BsThreeDots } from 'react-icons/bs'
import { Trash2, PenBox, Calendar, Clock2 } from 'lucide-react'
import { Action } from '../../../../@clean/shared/domain/entities/action'
import { stackFormatter } from '../../../../@clean/shared/domain/enums/stack_enum'
import { Tag } from '../../Tags'
import { twMerge } from 'tailwind-merge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverArrow
} from './Popover'
import Button from './Button'
import ActionModal from '../../ActionModal'
import { ModalContext } from '../../../contexts/modal_context'
import { ActionContext } from '../../../contexts/action_context'
import ActionDialog from '../../ActionDialog'
import {
  millisecondsToHours,
  timeStampToDateDDMMYY
} from '../../../utils/functions/timeStamp'

type actionStates = 'rejected' | 'waiting' | 'approved'

interface HistoricActionCardProps extends HTMLAttributes<HTMLDivElement> {
  action: Action
  setHistory: React.Dispatch<React.SetStateAction<Action[] | undefined>>
}

export default function HistoricActionCard({
  action,
  setHistory,
  ...props
}: HistoricActionCardProps) {
  const [actionState] = useState<actionStates>('approved')
  const [isPopUpOpen, setPopUpOpen] = useState<boolean>(false)
  const { changeModalContent } = useContext(ModalContext)
  const { deleteAction } = useContext(ActionContext)

  const title = `${action.projectCode}: ${action?.title} `

  const endDateFormated = timeStampToDateDDMMYY(action.endDate)
  const durationFormated = millisecondsToHours(action.duration)
  const stackStringArray = stackFormatter(action.stackTags)

  const handleSettingsPopUp = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setPopUpOpen((prev) => (prev = !prev))
  }

  const closeSettingsPopUp = () => {
    setPopUpOpen(false)
  }

  const handleDeleteAction = async (actionId: string) => {
    setHistory((prev) =>
      prev ? prev.filter((item) => item.actionId !== actionId) : []
    )

    if (confirm('Deseja excluir a sua ação?')) {
      await deleteAction(actionId)
    }
  }

  return (
    <ActionDialog action={action}>
      <Card
        variant="lg"
        className={twMerge(
          'static flex h-fit cursor-pointer flex-col items-center justify-between gap-5 pr-6 shadow-sm shadow-gray-500 brightness-95 duration-150 ease-in hover:brightness-100 sm:flex-row sm:gap-0',
          props.className
        )}
      >
        <div className="flex w-full flex-row items-center justify-start gap-3 sm:w-fit md:w-3/6">
          <StateIcon variant={actionState} />
          <div className="flex flex-col overflow-hidden">
            <h1 className="text-skin-base sm:text-lg">
              {title}
              {action.storyId && (
                <span
                  className={`text-skin-muted ${
                    action.storyId === -1 ? 'hidden' : null
                  }`}
                >
                  {' '}
                  #{action.storyId}
                </span>
              )}
            </h1>
            <p className="pl-1 text-sm font-light text-skin-muted">
              {action.description.length > 60
                ? action.description.slice(0, 60) + '...'
                : action.description}
            </p>
          </div>
        </div>

        <div className="hidden w-1/5 flex-row justify-start gap-2 lg:flex">
          {stackStringArray.map((stack, index) => {
            if (index < 3) {
              return (
                <div className="flex flex-row gap-2" key={index + stack}>
                  <Tag variant={stack} />
                  {index === 2 && stackStringArray.length > 2 ? (
                    <p className="text-skin-muted">...</p>
                  ) : null}
                </div>
              )
            }
          })}
        </div>

        <div className="flex w-full max-w-64 flex-row items-center justify-evenly gap-3 sm:w-fit sm:justify-between">
          <div className="flex flex-col gap-1 ">
            <IconText text={endDateFormated.toString()} icon={Calendar} />
            <IconText
              text={
                durationFormated > 1
                  ? durationFormated + ' horas'
                  : durationFormated + ' hora'
              }
              icon={Clock2}
            />
          </div>
          <div onMouseLeave={closeSettingsPopUp}>
            <Popover open={isPopUpOpen} onOpenChange={setPopUpOpen}>
              <PopoverTrigger onClick={handleSettingsPopUp}>
                <BsThreeDots className="h-10 w-10 cursor-pointer p-2 text-skin-base" />
              </PopoverTrigger>
              <PopoverContent>
                <div
                  className="z-30"
                  onMouseEnter={() => {
                    setPopUpOpen(true)
                  }}
                >
                  <Button
                    variant="default"
                    onClick={(event) => {
                      changeModalContent(<ActionModal action={action} />)
                      setPopUpOpen(false)
                      event.stopPropagation()
                    }}
                  >
                    <PenBox className="w-4" />
                    Editar
                  </Button>
                  <Button
                    onClick={(event) => {
                      handleDeleteAction(action.actionId)
                      setPopUpOpen(false)
                      event.stopPropagation()
                    }}
                    variant="destructive"
                  >
                    <Trash2 className="w-4" />
                    Excluir
                  </Button>
                  <PopoverArrow children={undefined} />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </Card>
    </ActionDialog>
  )
}
