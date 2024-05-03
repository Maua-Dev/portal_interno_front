import { HTMLAttributes, useContext, useEffect, useState } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Action } from '../../@clean/shared/domain/entities/action'
import {
  PenIcon,
  Check,
  UsersIcon,
  UserCircle,
  Building2,
  FileCog2Icon,
  HourglassIcon,
  CalendarDays,
  Timer
} from 'lucide-react'
import {
  millisecondsToHours,
  timeStampToDate
} from '../utils/functions/timeStamp'
import { MemberContext } from '../contexts/member_context'
import { Member } from '../../@clean/shared/domain/entities/member'
import { Tag } from './little_components/Tags'
import { ThemeContext } from '../contexts/theme_context'
import HoverCard from './little_components/HoverCard'
import { ProjectCodeToProjectName } from '../utils/functions/formatters'
import { ModalContext } from '../contexts/modal_context'
import ActionModal from './ActionModal'

interface ActionDialogProps extends HTMLAttributes<HTMLDivElement> {
  action: Action
}

export default function ActionDialog({ action, children }: ActionDialogProps) {
  const [associatedMembers, setAssociatedMembers] = useState<Member[]>([])
  const { getAllMembers } = useContext(MemberContext)
  const { theme } = useContext(ThemeContext)
  const { changeModalContent } = useContext(ModalContext)

  const ONE_DAY_ACTION =
    new Date(timeStampToDate(action.startDate)).toLocaleDateString() ===
    new Date(timeStampToDate(action.endDate)).toLocaleDateString()

  const loadMember = async (memberIds: string[]) => {
    const response = await getAllMembers()

    const members = response?.filter((member) =>
      memberIds.includes(member.userId)
    )

    if (members) {
      setAssociatedMembers(members)
    }
  }

  useEffect(() => {
    loadMember(action.associatedMembersUserIds)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex w-full justify-center">
      <DialogPrimitive.Root>
        <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>
        <DialogPrimitive.Overlay className="fixed inset-0 z-40 opacity-70 backdrop-blur-sm" />
        <DialogPrimitive.DialogContent
          className={`scrollbar-hide-default absolute top-[11%] z-50 my-auto flex h-5/6 w-5/6 flex-col gap-16 overflow-x-hidden overflow-y-scroll rounded-md border border-skin-muted px-4 py-10 text-skin-base outline-none sm:w-4/6 md:px-10 lg:h-4/6 xl:w-6/12 xl:scrollbar-hide ${
            theme ? 'bg-skin-fill' : 'bg-skin-secundary'
          }`}
        >
          <div className="flex flex-col gap-8">
            <div className="flex flex-row items-center gap-4">
              <Tag variant={action.actionTypeTag} />
              <div>
                {action.isValid ? (
                  <div className="flex flex-row items-center gap-1 text-green-500">
                    <Check className="h-5 w-5" />
                    <p className="text-sm">Valido</p>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col items-start justify-normal gap-2 text-2xl font-bold sm:w-fit sm:flex-row sm:items-center sm:gap-5 sm:text-3xl md:text-4xl">
                <h1>{action.title}</h1>
                <div className="flex flex-row items-center gap-2">
                  <h1 className="text-skin-muted">#{action.storyId}</h1>
                  <PenIcon
                    onClick={() => {
                      changeModalContent(<ActionModal action={action} />)
                    }}
                    className="h-6 w-6 cursor-pointer text-skin-muted duration-150 hover:text-red-600 sm:h-5 sm:w-5"
                  />
                </div>
              </div>
              <p className="pr-12 text-base sm:pr-0 sm:text-2xl">
                {action.description}
              </p>
            </div>
          </div>
          <div
            className={`flex h-full flex-col justify-evenly gap-5 ${
              ONE_DAY_ACTION ? 'md:flex-row' : 'lg:flex-row'
            }`}
          >
            <div
              className={`flex ${
                ONE_DAY_ACTION
                  ? 'flex-col justify-evenly md:justify-normal md:gap-10 lg:flex-row'
                  : 'flex-col'
              }  gap-3 ${
                action.associatedMembersUserIds.length === 0
                  ? 'w-full'
                  : `w-full ${ONE_DAY_ACTION ? 'md:w-2/3' : 'lg:w-2/3'}`
              }`}
            >
              <div className="flex flex-col gap-5 sm:gap-2">
                <h1 className="flex flex-row items-center gap-2 pl-2 font-light text-skin-muted">
                  <FileCog2Icon className="h-4 w-6" />
                  Projeto:{' '}
                  <span className="w-full font-semibold text-skin-base">
                    {ProjectCodeToProjectName(action.projectCode)}
                  </span>
                </h1>
                <div
                  className={`flex sm:w-fit ${
                    action.stackTags.length > 5
                      ? 'flex-col items-start '
                      : 'flex-row items-start sm:items-center'
                  } gap-2 pl-2`}
                >
                  <h1 className="flex flex-row items-center gap-2 font-light text-skin-muted">
                    <Building2 className="h-4 w-4" />
                    Áreas:
                  </h1>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    {action.stackTags.map((stack, key) => {
                      return <Tag key={key} variant={stack} />
                    })}
                  </div>
                </div>
              </div>
              {ONE_DAY_ACTION ? (
                <SameDayTimeLine action={action} />
              ) : (
                <DiferentDaysTimeLine action={action} />
              )}
            </div>
            <div
              className={`flex flex-col sm:pl-10 ${
                action.associatedMembersUserIds.length === 0
                  ? 'hidden w-0'
                  : 'w-full sm:w-1/2 xl:w-1/3'
              } `}
            >
              <div className="w-fit pb-20 sm:pb-0">
                <h1 className="flex flex-row items-center gap-2 pb-3 pl-2 font-light text-skin-muted">
                  <UsersIcon className="h-4 w-4" />
                  Membros
                </h1>
                {associatedMembers.map((member) => {
                  const [firstName, lastName] = member.name.split(' ')
                  return (
                    <div
                      key={lastName}
                      className="flex w-fit flex-row items-center gap-2 pl-10 sm:pl-0"
                    >
                      <UserCircle className="h-4 w-4" />
                      <p>
                        {firstName}
                        {lastName ? ' ' + lastName : null}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </DialogPrimitive.DialogContent>
      </DialogPrimitive.Root>
    </div>
  )
}

interface TimeLinesProps {
  action: Action
}

function SameDayTimeLine({ action }: TimeLinesProps) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="flex flex-row items-center gap-2 pl-2 font-light text-skin-muted sm:pl-0">
        <CalendarDays className="h-4 w-4" />
        Data:{' '}
        <span className="font-semibold text-skin-base">
          {new Date(timeStampToDate(action.startDate)).toLocaleDateString()}
        </span>
      </h1>
      <h1 className="flex flex-row items-center gap-2 pl-2 font-light text-skin-muted sm:pl-0">
        <Timer className="h-4 w-4" />
        Duração:{' '}
        <span className="font-semibold text-skin-base">
          {millisecondsToHours(action.duration) > 1
            ? millisecondsToHours(action.duration) + ' horas'
            : millisecondsToHours(action.duration) + ' hora'}
        </span>
      </h1>
    </div>
  )
}

function DiferentDaysTimeLine({ action }: TimeLinesProps) {
  return (
    <div className="flex w-full flex-col items-center gap-7 sm:items-start">
      <h1 className="flex flex-row items-center gap-2 self-start pl-2 pt-3 font-light text-skin-muted">
        <HourglassIcon className="h-4 w-4" />
        Linha do Tempo:
      </h1>
      <div className="relative flex h-64 flex-row items-center gap-3 sm:h-fit sm:w-full">
        <div className="absolute right-10 top-0 flex flex-col-reverse items-end pt-2.5 sm:relative sm:right-auto sm:top-auto sm:flex-col">
          <p className="text-sm text-skin-muted">Inicio</p>
          <p className="min-w-14 text-end text-base font-semibold">
            {new Date(timeStampToDate(action.startDate))
              .toString()
              .slice(3, 10)}
          </p>
        </div>
        <div className="flex h-[80%] flex-row-reverse items-center gap-2 sm:w-[90%] sm:flex-col sm:gap-1 md:w-5/6">
          <div className="absolute left-10 flex flex-col sm:relative sm:left-auto sm:flex-row sm:gap-2">
            <p className="font-light text-skin-muted">Duração: </p>
            <p className="text-base font-semibold">
              {millisecondsToHours(action.duration) > 1
                ? millisecondsToHours(action.duration) + ' horas'
                : millisecondsToHours(action.duration) + ' hora'}
            </p>
          </div>
          <div className="relative h-full w-3 overflow-hidden rounded-xl bg-skin-skeleton-foreground before:absolute before:inset-0 before:-translate-y-full before:animate-[shimmerY_1.5s_infinite] before:bg-gradient-to-b before:from-transparent before:via-white/20 hover:opacity-100 sm:h-3 sm:w-full sm:before:-translate-x-full sm:before:animate-[shimmerX_1.5s_infinite] sm:before:bg-gradient-to-r">
            <div className="absolute top-0 h-3 w-full rounded-lg bg-skin-base-foreground sm:left-0 sm:h-full sm:w-3" />
            <div className="absolute bottom-0 h-3 w-full rounded-lg bg-skin-base-foreground sm:right-0 sm:h-full sm:w-3" />
          </div>
        </div>
        <div className="absolute bottom-3 left-10 flex flex-col items-start pt-2 sm:relative sm:bottom-auto sm:left-auto">
          <p className="text-sm text-skin-muted">Fim</p>
          <p className="min-w-14 text-base font-semibold">
            {new Date(timeStampToDate(action.endDate)).toString().slice(3, 10)}
          </p>
        </div>
      </div>
    </div>
  )
}
