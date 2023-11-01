import { useContext, useState } from 'react'
import Card from './little_components/Card'
import { StateIcon, IconText } from './little_components/Icon'
import { AiOutlineCalendar } from 'react-icons/ai'
import { BsClockHistory, BsThreeDots } from 'react-icons/bs'
import { Action } from '../../@clean/shared/domain/entities/action'
import { ActionContext } from '../contexts/action_context'
import { stackFormatter } from '../../@clean/shared/domain/enums/stack_enum'
import Tag from './little_components/Tag'
import DropDown from './little_components/DropDown'

type actionStates = 'rejected' | 'waiting' | 'approved'

interface HistoricActionCardProps {
  action: Action
}

export default function HistoricActionCard({
  action
}: HistoricActionCardProps) {
  const [actionState] = useState<actionStates>('approved')

  const { getMember } = useContext(ActionContext)

  const title = `${action.projectCode}: ${action?.title} `

  const endDateFormated = new Date(action.endDate).toLocaleDateString()
  const durationFormated = new Date(action.duration).getMinutes()
  const stackStringArray = stackFormatter(action.stackTags)

  return (
    <Card
      variant="lg"
      className="flex h-fit flex-row items-center justify-between pr-6 opacity-80 shadow-sm shadow-gray-500 duration-150 ease-in hover:opacity-100"
    >
      <div className="flex w-3/6 flex-row items-center gap-3">
        <StateIcon variant={actionState} />
        <div className="flex flex-col overflow-hidden">
          <h1 className="text-lg text-skin-base">
            {title}
            <span className="text-skin-muted"> #{action.storyId}</span>
          </h1>
          <p className="pl-1 text-sm font-light text-skin-muted">
            {action.description}
          </p>
        </div>
      </div>

      <div className="flex w-1/5 flex-row justify-start gap-2">
        {stackStringArray.map((stack, index) => {
          return <Tag key={index} variant={stack} />
        })}
      </div>

      <div className="flex w-1/5 flex-row items-center justify-between gap-7">
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
        {/* <BsThreeDots className="h-6 w-6 cursor-pointer text-skin-base" /> */}
        <DropDown></DropDown>
      </div>
    </Card>
  )
}
