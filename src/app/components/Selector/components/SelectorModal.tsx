import { FormEvent, useState } from 'react'
import { Member } from '../../../../@clean/shared/domain/entities/member'
import { plainTextToRa } from '../../../utils/functions/formatters'
import useDarkMode from '../../../utils/functions/useDarkMode'
import {
  STACK,
  translateStackTag
} from '../../../../@clean/shared/domain/enums/stack_enum'

interface SelectorModalProps {
  members?: string[]
  allMembers?: Member[]
  setSelectedMembersModal?: React.Dispatch<React.SetStateAction<string[]>>
  stackTags?: STACK[]
  setSelectedStacksModal?: React.Dispatch<React.SetStateAction<STACK[]>>
  setIsSelectorModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setValue: any
}

export function SelectorModal({
  members,
  allMembers,
  setSelectedMembersModal,
  stackTags,
  setSelectedStacksModal,
  setIsSelectorModalOpen,
  setValue
}: SelectorModalProps) {
  // useStates
  const [selectedMembers, setSelectedMembers] = useState<Member[]>(
    allMembers?.filter((m) => members?.some((member) => member === m.userId)) ||
      []
  )
  const [selectedStacks, setSelectedStacks] = useState<STACK[]>(stackTags || [])
  const [search, setSearch] = useState<string>('')

  // Dark Mode
  const { darkMode } = useDarkMode()

  // Constants
  const allStackTags: string[] = Object.values(STACK)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (members) {
      console.log('MEMBERS')
      setValue(
        'associatedMembersUserIds',
        selectedMembers.map((m) => m.userId)
      )
      setSelectedMembersModal!(selectedMembers.map((m) => m.userId))
      console.log(selectedMembers)
    } else {
      console.log('STACKS')
      setValue('stackTags', selectedStacks)
      setSelectedStacksModal!(selectedStacks)
      console.log(selectedStacks)
    }
    setIsSelectorModalOpen(false)
  }

  const handleCancel = () => {
    setIsSelectorModalOpen(false)
  }

  return (
    <div className="absolute left-0 top-0 z-[160] flex h-full w-full items-center justify-center bg-black bg-opacity-40 md:h-screen">
      <section
        className={`flex h-2/5 w-4/5 flex-col rounded-lg ${
          darkMode ? 'bg-skin-secundary' : 'bg-white'
        } sm:w-1/2 md:h-4/5 xl:w-1/4`}
      >
        <header className="flex justify-between gap-4 px-6 pt-6">
          <h1 className="text-xl font-bold">
            {allMembers ? 'Membros' : 'Áreas'}
          </h1>
          <input
            type="text"
            className={`w-full rounded-md ${
              darkMode ? 'bg-gray-600' : 'bg-gray-200'
            } px-2 py-1 outline-none`}
            placeholder={`Buscar ${allMembers ? 'membro' : 'área'} 🔎`}
            onChange={(e) => setSearch(e.target.value)}
          />
        </header>
        <body className="mt-5 flex h-full flex-col gap-3 overflow-y-scroll px-6 pb-4">
          {allMembers
            ? allMembers
                ?.filter((member) => {
                  if (search !== '')
                    return member.name
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  return true
                })
                .map((member) => (
                  <div
                    key={member.userId}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p>{member.name}</p>
                      <p className="text-xs text-gray-500">
                        RA: {plainTextToRa(member.ra)}
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={
                        selectedMembers &&
                        selectedMembers.some((m) => m.userId === member.userId)
                      }
                      onChange={(e) => {
                        setSelectedMembers(
                          e.target.checked
                            ? [...selectedMembers, member]
                            : selectedMembers.filter((m) => m.ra !== member.ra)
                        )
                      }}
                    />
                  </div>
                ))
            : allStackTags
                .filter((stack) => {
                  const stackEnum = stack as STACK
                  if (search !== '')
                    return stackEnum
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  return true
                })
                .map((stack) => {
                  const stackEnum = stack as STACK
                  return (
                    <div
                      key={stackEnum}
                      className="flex items-center justify-between"
                    >
                      <p>{translateStackTag(stack)}</p>
                      <input
                        type="checkbox"
                        checked={selectedStacks.includes(stackEnum)}
                        onChange={(e) => {
                          setSelectedStacks(
                            e.target.checked
                              ? [...selectedStacks, stackEnum]
                              : selectedStacks.filter((s) => s !== stackEnum)
                          )
                        }}
                      />
                    </div>
                  )
                })}
        </body>
        <footer className="flex justify-between">
          <button
            onClick={handleSubmit}
            className="w-1/2 rounded-bl-lg border-r-[1px] border-t-[1px] border-gray-400 p-2 text-base"
          >
            Salvar
          </button>
          <button
            type="button"
            className="w-1/2 rounded-br-lg border-t-[1px] border-gray-400 p-2 text-base"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </footer>
      </section>
    </div>
  )
}
