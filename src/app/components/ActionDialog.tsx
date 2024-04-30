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
  HourglassIcon
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
  }, [])

  return (
    <div className="flex w-full justify-center">
      <DialogPrimitive.Root>
        <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>
        <DialogPrimitive.Overlay className="fixed inset-0 z-30 opacity-70 backdrop-blur-sm" />
        <DialogPrimitive.DialogContent
          className={`absolute left-[26%] top-[18%] z-40 flex h-2/3 w-1/2 flex-col gap-16 overflow-x-hidden overflow-y-scroll rounded-md border border-skin-muted pb-20 ${
            theme ? 'bg-skin-fill' : 'bg-skin-secundary'
          } px-10 py-7 pt-16 text-skin-base outline-none`}
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
              <div className="flex flex-row items-center gap-3">
                <div className="flex flex-row items-center gap-5 text-4xl font-bold">
                  <h1>{action.title}</h1>
                  <h1 className="text-skin-muted">#{action.storyId}</h1>
                </div>
                <PenIcon
                  onClick={() => {
                    changeModalContent(<ActionModal action={action} />)
                  }}
                  className="h-5 w-5 cursor-pointer text-skin-muted duration-150 hover:text-red-600"
                />
              </div>
              <p className="text-2xl">{action.description}</p>
            </div>
          </div>
          <div className="flex h-full flex-row justify-evenly">
            <div
              className={`flex flex-col gap-3 ${
                action.associatedMembersUserIds.length === 0
                  ? 'w-full'
                  : 'w-2/3'
              }`}
            >
              <div className="flex flex-row gap-2">
                <h1 className="flex flex-row items-center gap-2 pl-2 font-light text-skin-muted">
                  <FileCog2Icon className="h-4 w-4" />
                  Projeto:
                </h1>
                <p>{ProjectCodeToProjectName(action.projectCode)}</p>
              </div>
              <div
                className={`flex w-fit ${
                  action.stackTags.length > 5
                    ? 'flex-col items-start '
                    : 'flex-row items-center'
                } gap-2 pl-2`}
              >
                <h1 className="flex flex-row items-center gap-2 font-light text-skin-muted">
                  <Building2 className="h-4 w-4" />
                  Áreas:
                </h1>
                <div className="flex flex-row gap-2">
                  {action.stackTags.map((stack, key) => {
                    return <Tag key={key} variant={stack} />
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-7">
                <h1 className="flex flex-row items-center gap-2 pl-2 pt-3 font-light text-skin-muted">
                  <HourglassIcon className="h-4 w-4" />
                  Linha do Tempo:
                </h1>
                <div className="relative flex w-full flex-row justify-between">
                  <HoverCard
                    placeholder={new Date(
                      timeStampToDate(action.startDate)
                    ).toLocaleDateString()}
                  >
                    <div className="flex flex-col items-end pt-2.5">
                      <p className="text-sm text-skin-muted">Inicio</p>
                      <p className="text-base font-semibold">
                        {timeStampToDate(action.startDate).slice(11)}
                      </p>
                    </div>
                  </HoverCard>
                  <div className="flex flex-row gap-2">
                    <p className="font-light text-skin-muted">Duração: </p>
                    <p className="text-base font-semibold">
                      {millisecondsToHours(action.duration) > 1
                        ? millisecondsToHours(action.duration) + ' horas'
                        : millisecondsToHours(action.duration) + ' hora'}
                    </p>
                  </div>
                  <HoverCard
                    placeholder={new Date(
                      timeStampToDate(action.endDate)
                    ).toLocaleDateString()}
                  >
                    <div className="flex flex-col items-start pt-2">
                      <p className="text-sm text-skin-muted">Fim</p>
                      <p className="text-base font-semibold">
                        {timeStampToDate(action.endDate).slice(11)}
                      </p>
                    </div>
                  </HoverCard>
                  <div className="absolute left-0 right-0 top-7 ml-auto mr-auto h-3 w-[75%] overflow-hidden rounded-xl bg-skin-skeleton-foreground before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 hover:opacity-100" />
                  <div className="absolute left-[12%] top-7 h-3 w-3 rounded-full bg-skin-base-foreground" />
                  <div className="absolute right-[12%] top-7 h-3 w-3 rounded-full bg-skin-base-foreground" />
                </div>
              </div>
            </div>
            <div
              className={`flex flex-col pl-10 ${
                action.associatedMembersUserIds.length === 0
                  ? 'hidden w-0'
                  : 'w-1/3'
              }`}
            >
              <div>
                <h1 className="flex flex-row items-center gap-2 pb-3 pl-2 font-light text-skin-muted">
                  <UsersIcon className="h-4 w-4" />
                  Membros
                </h1>
                {associatedMembers.map((member) => {
                  const [firstName, lastName] = member.name.split(' ')
                  return (
                    <div
                      key={lastName}
                      className="flex flex-row items-center gap-2"
                    >
                      <UserCircle className="h-4 w-4" />
                      <p>{firstName + ' ' + lastName}</p>
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
