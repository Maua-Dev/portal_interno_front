import { HTMLAttributes, useContext, useState } from 'react'
import Card from './little_components/Card'
import { StateIcon, IconText } from './little_components/Icon'
import { AiOutlineCalendar } from 'react-icons/ai'
import { BsClockHistory, BsThreeDots } from 'react-icons/bs'
import { Trash2, PenBox } from 'lucide-react'
import { Action } from '../../@clean/shared/domain/entities/action'
import { stackFormatter } from '../../@clean/shared/domain/enums/stack_enum'
import { Tag } from './little_components/Tags'
import { twMerge } from 'tailwind-merge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverArrow
} from '../components/little_components/Popover'
import Button from './little_components/Button'
import ActionModal from './ActionModal'
import { ModalContext } from '../contexts/modal_context'
import { ActionContext } from '../contexts/action_context'

type actionStates = 'rejected' | 'waiting' | 'approved'

interface HistoricActionCardProps extends HTMLAttributes<HTMLDivElement> {
  action: Action
}

export default function HistoricActionCard({
  action,
  ...props
}: HistoricActionCardProps) {
  const [actionState] = useState<actionStates>('approved')
  const [isPopUpOpen, setPopUpOpen] = useState<boolean>(false)
  const { changeModalContent } = useContext(ModalContext)
  const { deleteAction } = useContext(ActionContext)

  const title = `${action.projectCode}: ${action?.title} `

  const endDateFormated = new Date(action.endDate).toLocaleDateString()
  const durationFormated = new Date(action.duration).getMinutes()
  const stackStringArray = stackFormatter(action.stackTags)

  const handleSettingsPopUp = () => {
    setPopUpOpen((prev) => (prev = !prev))
  }

  const closeSettingsPopUp = () => {
    setPopUpOpen(false)
  }

  const handleDeleteAction = (actionId: string) => {
    const response = deleteAction(actionId)
    response.then((_res: any) => {
      window.location.reload()
    })
  }

  return (
    <Card
      variant="lg"
      className={twMerge(
        'flex h-fit cursor-pointer flex-col items-center justify-between gap-5 pr-6 shadow-sm shadow-gray-500 brightness-95 duration-150 ease-in hover:brightness-100 sm:flex-row sm:gap-0',
        props.className
      )}
    >
      <div className="flex w-full flex-row items-center justify-start gap-3 sm:w-fit md:w-3/6">
        <StateIcon variant={actionState} />
        <div className="flex flex-col overflow-hidden">
          <h1 className="text-skin-base sm:text-lg">
            {title}
            <span className="text-skin-muted"> #{action.storyId}</span>
          </h1>
          <p className="pl-1 text-sm font-light text-skin-muted">
            {action.description}
          </p>
        </div>
      </div>

      <div className="hidden w-1/5 flex-row justify-start gap-2 lg:flex">
        {stackStringArray.map((stack, index) => {
          return <Tag key={index} variant={stack} />
        })}
      </div>

      <div className="flex w-full max-w-64 flex-row items-center justify-evenly gap-3 sm:w-fit sm:justify-between">
        <div className="flex flex-col gap-1 ">
          <IconText
            text={endDateFormated.toString()}
            icon={<AiOutlineCalendar className="h-4 w-4 text-skin-muted" />}
          />
          <IconText
            text={durationFormated.toString() + ' min'}
            icon={<BsClockHistory className="h-4 w-4 text-skin-muted" />}
          />
        </div>
        <div onMouseLeave={closeSettingsPopUp}>
          <Popover open={isPopUpOpen}>
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
                  onClick={() => {
                    changeModalContent(<ActionModal action={action} />)
                    setPopUpOpen(false)
                  }}
                >
                  <PenBox className="w-4" />
                  Editar
                </Button>
                <Button
                  onClick={() => handleDeleteAction(action.actionId)}
                  variant="default"
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
  )
}
