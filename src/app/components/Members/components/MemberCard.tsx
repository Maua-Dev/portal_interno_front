import { twMerge } from 'tailwind-merge'
import Card from '../../Card.tsx'
import { Member } from '../../../../@clean/shared/domain/entities/member.ts'
import { HTMLAttributes, useContext, useState } from 'react'
import { MemberTag, Tag } from '../../Tags.tsx'
import { Clock2, PowerOff } from 'lucide-react'
import { IconText } from '../../Historic/components/Icon.tsx'
import { millisecondsToHours } from '../../../utils/functions/timeStamp.ts'
import Button from '../../Historic/components/Button.tsx'
import { MemberContext } from '../../../contexts/member_context.tsx'
import { ACTIVE } from '../../../../@clean/shared/domain/enums/active_enum.ts'

interface MemberCardProps extends HTMLAttributes<HTMLDivElement> {
  member: Member
  isWithMostHours?: boolean
}

export default function MemberCard({
  member,
  isWithMostHours = false,
  ...props
}: MemberCardProps) {
  const [isHovering, setHovering] = useState<boolean>(false)
  const { updateMember } = useContext(MemberContext)

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

      console.log(response)
    }
  }

  return (
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
        <MemberTag
          situation={member.active}
          className={'hidden h-4 w-4 rounded-full md:block'}
        />
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
        className={'hidden md:grid md:w-full md:grid-cols-3 md:gap-1 md:pl-10'}
      >
        <Tag variant={member.year + '° ano'} />
        <Tag variant={member.role} />
        <Tag variant={member.stack} />
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
  )
}
