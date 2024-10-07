import { Member } from '../../../../@clean/shared/domain/entities/member.ts'
import { useContext, useState } from 'react'
import { Avatar } from '../../Avatar.tsx'
import Button from '../../Historic/components/Button.tsx'
import { Check, X } from 'lucide-react'
import { useDarkMode } from '../../../hooks/useDarkMode.ts'
import { MemberContext } from '../../../contexts/member_context.tsx'
import { ACTIVE } from '../../../../@clean/shared/domain/enums/active_enum.ts'
import { TextSkeleton } from '../../TextSkeleton.tsx'
import { toast } from 'react-toastify'

interface MemberAccessCardProps {
  member: Member
}

export default function NoticationMemberCard({
  member
}: MemberAccessCardProps) {
  const [isUpdatingMemberSituation, setUpdatingMemberSituation] =
    useState<boolean>(false)
  const [isDeletingMember, setDeletingMember] = useState<boolean>(false)
  const { darkMode } = useDarkMode()
  const { handleAllMembers, updateMember } = useContext(MemberContext)

  const handleMemberDeletion = async () => {
    setDeletingMember(true)

    setTimeout(() => {
      setDeletingMember(false)
    }, 2000)
  }

  const handleMemberApprove = async () => {
    setUpdatingMemberSituation(true)
    const response = await updateMember(
      member.userId,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      ACTIVE.ACTIVE
    )

    if (response) {
      await handleAllMembers()

      toast.success(
        `O ${
          member.name.split(' ')[0]
        } agora está ativo e foi autorizado a acessar o portal interno!`,
        {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        }
      )
    }

    setUpdatingMemberSituation(false)
  }

  return (
    <div
      className={`flex w-full transform flex-col gap-4 rounded-lg border-skin-muted px-4 py-5 text-skin-muted duration-150 ease-in-out ${
        darkMode ? 'hover:bg-skin-fill' : 'hover:bg-[#e5e5e5]'
      }`}
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
          {isDeletingMember ? (
            <TextSkeleton className="h-[40px] w-[56px] rounded-md "></TextSkeleton>
          ) : (
            <Button
              variant={'default'}
              className={`bg-transparent ${darkMode ? 'hover:bg-black' : null}`}
              onClick={handleMemberDeletion}
            >
              <X />
            </Button>
          )}
          {isUpdatingMemberSituation ? (
            <TextSkeleton className="h-[40px] w-[56px] rounded-md "></TextSkeleton>
          ) : (
            <Button variant={'form'} onClick={handleMemberApprove}>
              <Check />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
