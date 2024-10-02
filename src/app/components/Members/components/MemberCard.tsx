import { twMerge } from 'tailwind-merge'
import Card from '../../Card.tsx'
import { Member } from '../../../../@clean/shared/domain/entities/member.ts'
import { HTMLAttributes } from 'react'
import { MemberTag } from '../../Tags.tsx'
import { Clock2 } from 'lucide-react'
import { IconText } from '../../Historic/components/Icon.tsx'
import { BsThreeDots } from 'react-icons/bs'
import Badge from '../../Badge.tsx'

interface MemberCardProps extends HTMLAttributes<HTMLDivElement> {
  member: Member
}

export default function MemberCard({ member, ...props }: MemberCardProps) {
  return (
    <Card
      variant="lg"
      className={twMerge(
        'static flex h-fit cursor-pointer flex-row items-center justify-between p-3 shadow-sm shadow-gray-500 brightness-95 duration-150 ease-in hover:z-30 hover:brightness-100 sm:gap-0 md:p-4',
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
          <p className="text-base font-semibold md:text-lg">{member.name}</p>
          <p className={'text-xs md:hidden'}>
            {member.year}° ano / {member.role} / {member.stack}
          </p>
        </div>
      </div>
      <div className={'hidden flex-row gap-3 md:flex md:w-full md:pl-10'}>
        <Badge>{member.year + '° ano'}</Badge>
        <Badge>{member.role}</Badge>
        <Badge>{member.stack}</Badge>
      </div>
      <div className={'flex w-1/2 flex-row justify-end gap-2 md:gap-6'}>
        <IconText text={'100' + ' horas'} icon={Clock2} />
        <BsThreeDots className="h-10 w-10 cursor-pointer p-2 text-skin-base" />
      </div>
    </Card>
  )
}
