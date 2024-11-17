import { HTMLAttributes, useContext, useEffect, useState } from 'react'
import { Member } from '../../../../@clean/shared/domain/entities/member'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { useDarkMode } from '../../../hooks/useDarkMode'
import { Avatar } from '../../Avatar'
import {
  Building2,
  CalendarDays,
  Check,
  Clock2,
  Filter,
  Presentation,
  X
} from 'lucide-react'
import {
  millisecondsToHours,
  timeStampToDate,
  timeStampToDateDDMMYY
} from '../../../utils/functions/timeStamp'
import RadioItem from '../../RadioItem'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { ActionContext } from '../../../contexts/action_context'
import { Action } from '../../../../@clean/shared/domain/entities/action'
import { BsThreeDots } from 'react-icons/bs'

interface MemberDialogProps extends HTMLAttributes<HTMLDivElement> {
  member: Member
}

export default function MemberDialog({ children, member }: MemberDialogProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [history, setHistory] = useState<Action[]>([])
  const { darkMode } = useDarkMode()
  const { getHistory } = useContext(ActionContext)

  const handleMemberHistoric = async () => {
    const response = await getHistory(
      undefined,
      undefined,
      undefined,
      undefined,
      member.userId
    )

    if (response) {
      setHistory(response.actions)
    }
  }

  useEffect(() => {
    if (open) {
      handleMemberHistoric()
    }
  }, [open])

  return (
    <div className="static flex w-full justify-center">
      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>
        <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-black opacity-50" />
        <DialogPrimitive.Content
          className={`scrollbar-hide-default fixed bottom-0 top-0 z-50 my-auto flex h-4/6 w-5/6 flex-col gap-6 overflow-x-hidden overflow-y-scroll rounded-md border border-skin-muted px-4 py-10 text-skin-base outline-none sm:w-5/6 md:h-fit md:px-10 md:py-20 xl:w-9/12 xl:scrollbar-hide ${
            darkMode ? 'bg-skin-fill' : 'bg-skin-secundary'
          }`}
        >
          <div className="flex h-fit flex-row items-center gap-4">
            <Avatar member={member} className="h-28 w-28 rounded-full"></Avatar>
            <div className="flex flex-col gap-4">
              <p className="text-3xl font-semibold">{member.name}</p>
              <div className="flex flex-row gap-6">
                <div className="flex flex-row gap-2 text-skin-muted">
                  <Building2 />
                  <p className="text-base">{member.role}</p>
                </div>
                <div className="flex flex-row gap-2 text-skin-muted">
                  <CalendarDays />
                  <p className="text-base">
                    {timeStampToDate(member.hiredDate).slice(0, 4)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-fit w-full flex-row gap-7 ">
            <div className="flex h-full w-1/3 flex-col gap-7">
              <div className="h-full w-full bg-[#EBEBF5] py-4 text-center">
                <h1 className="text-2xl font-bold">Projetos</h1>
              </div>
              <div className="flex h-full w-full flex-col bg-[#EBEBF5] py-4 text-center">
                <h1 className="text-2xl font-bold">Total de Horas</h1>
                <p className="flex h-full w-full items-center justify-center">
                  <span className="text-4xl font-light">
                    {millisecondsToHours(member?.hoursWorked || 0)} h
                  </span>
                </p>
              </div>
            </div>
            <div className="h-[425px] w-2/3 rounded-md border-2 border-blue-500 bg-transparent">
              <div className="flex flex-col gap-8 border-b-2 border-blue-500 p-4">
                <div className="flex flex-row items-center justify-between gap-3">
                  <div className="flex flex-row gap-2 ">
                    <Filter className="h-6 w-6" />
                    <p>Filtro</p>
                  </div>
                  <RadioGroup.Root
                    defaultValue={'all'}
                    className={'flex flex-row justify-start gap-2'}
                  >
                    <RadioItem
                      radioValue={'all'}
                      value={'all'}
                      label={'Todos'}
                    />
                    <RadioItem
                      radioValue={'all'}
                      value={'projects'}
                      label={'Projetos'}
                    />
                    <RadioItem
                      radioValue={'all'}
                      value={'status'}
                      label={'Status'}
                    />
                    <RadioItem
                      radioValue={'all'}
                      value={'status'}
                      label={'Status'}
                    />
                    <RadioItem
                      radioValue={'all'}
                      value={'time'}
                      label={'Duração'}
                    />
                  </RadioGroup.Root>
                </div>
                <h1 className="text-2xl font-bold">Histórico</h1>
              </div>
              <div className="flex h-[280px] flex-col gap-3 overflow-y-scroll p-4">
                {history.map((action) => {
                  return <ActionCard key={action.actionId} action={action} />
                })}
              </div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Root>
    </div>
  )
}

interface ActionCardProps extends HTMLAttributes<HTMLDivElement> {
  action: Action
}

function ActionCard({ action }: ActionCardProps) {
  const endDate = timeStampToDate(action.endDate)

  return (
    <div className="flex h-32 flex-row items-center gap-5">
      <div className="flex h-full w-1/6 flex-col items-center justify-center ">
        <h1 className="text-2xl font-light">
          {endDate.slice(8, 10) + '/' + endDate.slice(5, 7)}
        </h1>
        <p className="font-thin">{endDate.slice(11, 13)}h</p>
      </div>
      <div className="flex h-full w-5/6 flex-row justify-between rounded-lg bg-[#9CBBFC] px-4 py-2">
        <div className="flex w-4/6 flex-col gap-2">
          <h1 className="font-bold">{action.title}</h1>
          <p className="h-1/2  rounded-md border border-black p-1">
            {action.description}
          </p>
          <div className="flex flex-row items-center gap-7">
            <div className="flex flex-row items-center gap-2">
              <Presentation className="scale-75" />
              <p className="text-sm">{action.projectCode}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Building2 className="scale-75" />
              <p className="text-sm">
                Áreas:{' '}
                <span className="rounded-md bg-skin-secundary px-1 py-0.5">
                  {action.stackTags}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-2/6 flex-col items-end justify-between gap-2">
          <div className="flex flex-row items-center gap-2">
            <div
              className={`flex flex-row gap-1 ${
                action.isValid ? 'text-green-700' : 'text-red-600'
              }`}
            >
              {action.isValid ? (
                <Check className="scale-75" />
              ) : (
                <X className="scale-75" />
              )}
              <p>{action.isValid ? 'Valida' : 'Invalida'}</p>
            </div>
            <BsThreeDots />
          </div>
          <div>
            <div className="flex flex-row text-skin-muted">
              <CalendarDays className="scale-75" />
              <p>
                Data:{' '}
                <span className="text-skin-base">
                  {timeStampToDateDDMMYY(action.startDate)}
                </span>
              </p>
            </div>
            <div className="flex flex-row text-skin-muted">
              <Clock2 className="scale-75" />
              <p>
                Duração:{' '}
                <span className="text-skin-base">
                  {millisecondsToHours(action.duration)}h
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
