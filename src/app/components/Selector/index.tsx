import { CiCirclePlus } from 'react-icons/ci'
import { SelectorModal } from './components/SelectorModal'
import { Row } from './components/Row'
import {
  STACK,
  translateStackTag
} from '../../../@clean/shared/domain/enums/stack_enum'
import { useMember } from '../../hooks/useMember'
import { useActionModal } from '../ActionModal/hooks/useActionModal'
import { useState } from 'react'

interface SelectorProps {
  members?: string[]
  objectParameter: string
  getValues: any
  setValue: any
  stackTags?: STACK[]
  isStackTagSelector?: boolean
  isLabelBold?: boolean
}

export function Selector({
  objectParameter,
  setValue,
  getValues,
  isStackTagSelector = false,
  isLabelBold = true
}: SelectorProps) {
  const [isSelectorModalOpen, setIsSelectorModalOpen] = useState(false)

  const { allMembers } = useMember()
  const {
    currentMembers,
    currentStackTags,
    setCurrentMembers,
    setCurrentStackTags
  } = useActionModal()

  return (
    <>
      <div className="flex items-center justify-between">
        <label
          className={`${
            isLabelBold ? 'text-2xl font-bold' : 'text-xl font-medium'
          } p-2`}
        >
          {isStackTagSelector ? 'Áreas' : 'Membros'}
        </label>
        <CiCirclePlus
          className="cursor-pointer text-2xl"
          onClick={() => {
            setIsSelectorModalOpen(!isSelectorModalOpen)
          }}
        />
      </div>
      <div className="flex h-32 flex-col gap-4 overflow-x-hidden overflow-y-scroll rounded-lg border-[1px] border-gray-200 px-2 py-2 lg:h-4/5">
        {!isStackTagSelector
          ? currentMembers.map((userId: string) => {
              const member = allMembers?.find((m) => m.userId === userId)
              if (member)
                return (
                  <Row
                    key={member.userId}
                    text={member.name}
                    onClick={() => {
                      setValue(
                        objectParameter,
                        getValues(objectParameter).filter(
                          (id: string) => id !== member.userId
                        )
                      )
                      setCurrentMembers(
                        currentMembers.filter((id) => id !== member.userId)
                      )
                    }}
                  />
                )
            })
          : currentStackTags.map((stack: STACK) => {
              return (
                <Row
                  key={stack}
                  text={translateStackTag(stack)}
                  onClick={() => {
                    setValue(
                      objectParameter,
                      getValues(objectParameter).filter(
                        (s: STACK) => s !== stack
                      )
                    )
                    setCurrentStackTags(
                      currentStackTags.filter((s) => s !== stack)
                    )
                  }}
                />
              )
            })}
      </div>
      {isSelectorModalOpen && (
        <SelectorModal
          objectParameter={objectParameter}
          setValue={setValue}
          isStack={isStackTagSelector}
          setIsSelectorModalOpen={setIsSelectorModalOpen}
        />
      )}
    </>
  )
}
