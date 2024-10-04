import { Member } from '../../../../@clean/shared/domain/entities/member.ts'
import { useEffect } from 'react'
import { Avatar } from '../../Avatar.tsx'
import Button from '../../Historic/components/Button.tsx'
import { Check, X } from 'lucide-react'

interface MemberAccessCardProps {
  member: Member
}

export default function NoticationMemberCard({
  member
}: MemberAccessCardProps) {
  useEffect(() => {
    console.log(member)
  }, [])

  return (
    <div
      className={`bg flex w-full flex-col gap-4 border-y border-skin-muted px-4 py-5 text-skin-muted`}
    >
      <div className={'flex items-center gap-3'}>
        <Avatar name={member.name} />
        <p className={'text-skin-base'}>
          <span className={'hover:underline'}>{member.name}</span>{' '}
          <span className={'font-thin italic text-skin-muted'}>
            foi contratado e está solicitando acesso ao Portal Interno.
          </span>
        </p>
      </div>
      <div className={'flex flex-row items-end justify-between'}>
        <p className={'h-fit text-sm text-skin-muted hover:underline'}>
          Há{' '}
          {Math.floor(
            (+new Date() - +new Date(member.hiredDate)) / (1000 * 60 * 60 * 24)
          )}{' '}
          dias
        </p>
        <div className={'flex gap-3'}>
          <Button variant={'default'} className={'bg-transparent'}>
            <X />
          </Button>
          <Button variant={'form'}>
            <Check />
          </Button>
        </div>
      </div>
    </div>
  )
}
