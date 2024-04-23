import { useContext, useEffect, useState } from 'react'
// import useDarkMode from '../../utils/functions/useDarkMode'
import { CiCirclePlus } from 'react-icons/ci'
import { SelectorModal } from './components/SelectorModal'
import { MemberContext } from '../../contexts/member_context'
import { Member } from '../../../@clean/shared/domain/entities/member'
import { Row } from './components/Row'

interface SelectorProps {
  members: string[]
  getValues: any
  setValue: any
}

export function Selector({ members, setValue, getValues }: SelectorProps) {
  // const { darkMode } = useDarkMode()
  const { getMember, getAllMembers } = useContext(MemberContext)

  const [isSelectorModalOpen, setIsSelectorModalOpen] = useState<boolean>(false)
  const [allMembers, setAllMembers] = useState<Member[] | undefined>()
  const [selectedMembersModal, setSelectedMembersModal] = useState<string[]>([])

  useEffect(() => {
    getMember().then((member) => {
      getAllMembers().then((data) => {
        if (data) {
          const members = data
            .filter((m) => m.userId !== member?.userId)
            .sort((a, b) => a.name.localeCompare(b.name))
          setAllMembers(members)
        }
      })
    })
  }, [getMember, getAllMembers])

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">Membros</p>
        <CiCirclePlus
          className="cursor-pointer text-2xl"
          onClick={() => setIsSelectorModalOpen(!isSelectorModalOpen)}
        />
      </div>
      <div className="flex h-4/5 flex-col gap-4 overflow-y-scroll px-2">
        {selectedMembersModal.map((userId: string) => {
          const member = allMembers?.find((m) => m.userId === userId)
          if (member)
            return (
              <Row
                key={member.userId}
                text={member.name}
                onClick={() => {
                  setValue(
                    'associatedMembersUserIds',
                    getValues('associatedMembersUserIds').filter(
                      (id: string) => id !== member.userId
                    )
                  )
                  setSelectedMembersModal(
                    selectedMembersModal.filter((id) => id !== member.userId)
                  )
                }}
              />
            )
        })}
      </div>
      {isSelectorModalOpen && (
        <SelectorModal
          members={members}
          setValue={setValue}
          setIsSelectorModalOpen={setIsSelectorModalOpen}
          allMembers={allMembers}
          setSelectedMembersModal={setSelectedMembersModal}
        />
      )}
    </>
  )
}
