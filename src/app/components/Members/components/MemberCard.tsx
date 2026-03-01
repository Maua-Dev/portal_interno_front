import { twMerge } from 'tailwind-merge'
import Card from '../../Card.tsx'
import { Member } from '../../../../@clean/shared/domain/entities/member.ts'
import { useContext, useState } from 'react'
import type { HTMLAttributes } from 'react'
import { MemberTag, Tag } from '../../Tags.tsx'
import { Clock2, PowerOff } from 'lucide-react'
import { IconText } from '../../Historic/components/Icon.tsx'
import { millisecondsToHours } from '../../../utils/functions/timeStamp.ts'
import Button from '../../Historic/components/Button.tsx'
import { MemberContext } from '../../../contexts/member_context.tsx'
import { ACTIVE } from '../../../../@clean/shared/domain/enums/active_enum.ts'
import { toast } from 'react-toastify'
import MemberDialog from './MemberDialog.tsx'
import { AiFillStar } from 'react-icons/ai'

interface MemberCardProps extends HTMLAttributes<HTMLDivElement> {
  member: Member
  setMembers: React.Dispatch<React.SetStateAction<Member[] | undefined>>
  isWithMostHours?: boolean
}

export default function MemberCard({
  member,
  setMembers,
  isWithMostHours = false,
  ...props
}: MemberCardProps) {
  const [isHovering, setHovering] = useState<boolean>(false)
  const { updateMember, getAllMembers } = useContext(MemberContext)

  const handleDesactiveMember = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()

    if (confirm('Deseja desativar o membro?')) {
      const response = await updateMember(
        member.userId,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        ACTIVE.DISCONNECTED
      )

      if (response) {
        toast.success('Membro Desativado! Página atualizando...', {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })

        const allMembers = await getAllMembers()
        setMembers(allMembers)
      }
    }
  }

  return (
    <div className="flex w-full" onClick={(e) => e.stopPropagation()}>
      <MemberDialog member={member} setMembers={setMembers}>
        <div className="w-full">
          <Card
        onMouseEnter={() => {
          setHovering(true)
        }}
        onMouseLeave={() => {
          setTimeout(() => {
            setHovering(false)
          }, 500)
        }}
        variant="lg"
        className={twMerge(
          `static flex h-fit w-full cursor-pointer flex-row items-center justify-between p-3 shadow-sm shadow-gray-500 brightness-95 duration-150 ease-in hover:brightness-100 sm:gap-0 md:p-4 ${
            isHovering ? 'z-30' : ''
          }`,
          props.className
        )}
      >
        <MemberTag
          situation={member.active}
          className={'absolute left-0 h-full w-3 md:hidden'}
        />
        <div
          className={
            'flex h-full w-1/2 flex-row items-center justify-start md:w-2/5'
          }
        >
          <div className={'flex flex-col pl-2'}>
            <p className="text-base font-semibold md:text-lg">
              {member.name} {isWithMostHours ? '🏆' : ''}
            </p>
            <p className={'text-xs md:hidden'}>
              {member.year}° ano / {member.role} / {member.stack}
            </p>
          </div>
        </div>
        <div
          className={
            'hidden md:grid md:w-full md:grid-cols-5 md:gap-1 md:pl-10 md:items-center'
          }
        >
          {/* <Tag variant={member.year + '° ano'} /> */}
          <Tag variant={member.role} />
          <Tag variant={member.cellphone || 'N/A'} />
          <Tag variant={member.stack} />
          <div className="flex items-center gap-1 justify-center">
            {Array.from({ length: member.strikes_allowed || 0 }).map((_, i) => (
              <AiFillStar
                key={i}
                className={`text-sm md:text-base ${
                  i < (member.strikes || 0) ? 'text-yellow-400' : 'text-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
        <div
          className={
            'flex w-1/2 flex-row justify-end gap-2 md:w-60 md:justify-between md:gap-6'
          }
        >
          <IconText
            text={millisecondsToHours(member.hoursWorked || 0) + ' horas '}
            icon={Clock2}
          />
          <Button
            onClick={handleDesactiveMember}
            variant="icon"
            className="hover:bg-transparent hover:text-red-500"
          >
            <PowerOff className="w-4" />
          </Button>
        </div>
          </Card>
        </div>
      </MemberDialog>
    </div>
  )
}
