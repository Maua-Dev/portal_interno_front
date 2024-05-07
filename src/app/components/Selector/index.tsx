import { useContext, useEffect, useState } from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import { SelectorModal } from './components/SelectorModal'
import { MemberContext } from '../../contexts/member_context'
import { Member } from '../../../@clean/shared/domain/entities/member'
import { Row } from './components/Row'
import {
  STACK,
  translateStackTag
} from '../../../@clean/shared/domain/enums/stack_enum'

interface SelectorProps {
  members?: string[]
  getValues: any
  setValue: any
  stackTags?: STACK[]
  isStackTagSelector?: boolean
}

export function Selector({
  members,
  setValue,
  getValues,
  stackTags,
  isStackTagSelector
}: SelectorProps) {
  // const { darkMode } = useDarkMode()
  const { getMember, getAllMembers } = useContext(MemberContext)

  const [isSelectorModalOpen, setIsSelectorModalOpen] = useState<boolean>(false)

  const [allMembers, setAllMembers] = useState<Member[] | undefined>()
  const [selectedMembersModal, setSelectedMembersModal] = useState<string[]>(
    members || []
  )

  const [selectedStacksModal, setSelectedStacksModal] = useState<STACK[]>(
    stackTags || []
  )

  useEffect(() => {
    if (!isStackTagSelector) {
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
    }
  }, [getMember, getAllMembers, stackTags, isStackTagSelector])

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">
          {isStackTagSelector ? 'Áreas' : 'Membros'}
        </p>
        <CiCirclePlus
          className="cursor-pointer text-2xl"
          onClick={() => setIsSelectorModalOpen(!isSelectorModalOpen)}
        />
      </div>
      <div className="flex h-4/5 flex-col gap-4 overflow-x-hidden overflow-y-scroll rounded-lg border-[1px] border-gray-200 px-2 py-2">
        {!isStackTagSelector
          ? selectedMembersModal.map((userId: string) => {
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
                        selectedMembersModal.filter(
                          (id) => id !== member.userId
                        )
                      )
                    }}
                  />
                )
            })
          : selectedStacksModal.map((stack: STACK) => {
              return (
                <Row
                  key={stack}
                  text={translateStackTag(stack)}
                  onClick={() => {
                    setValue(
                      'stackTags',
                      getValues('stackTags').filter((s: STACK) => s !== stack)
                    )
                    setSelectedStacksModal(
                      selectedStacksModal.filter((s) => s !== stack)
                    )
                  }}
                />
              )
            })}
      </div>
      {isSelectorModalOpen ? (
        isStackTagSelector ? (
          <SelectorModal
            stackTags={selectedStacksModal}
            setSelectedStacksModal={setSelectedStacksModal}
            setIsSelectorModalOpen={setIsSelectorModalOpen}
            setValue={setValue}
          />
        ) : (
          <SelectorModal
            members={selectedMembersModal}
            setValue={setValue}
            setIsSelectorModalOpen={setIsSelectorModalOpen}
            allMembers={allMembers}
            setSelectedMembersModal={setSelectedMembersModal}
          />
        )
      ) : undefined}
    </>
  )
}
