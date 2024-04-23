import { FormEvent, useState } from 'react'
import { Member } from '../../../../@clean/shared/domain/entities/member'
import { plainTextToRa } from '../../../utils/functions/formatters'

interface SelectorModalProps {
  members: string[]
  setValue: any
  setIsSelectorModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedMembersModal: React.Dispatch<React.SetStateAction<string[]>>
  allMembers: Member[] | undefined
}

export function SelectorModal({
  members,
  setValue,
  setIsSelectorModalOpen,
  allMembers,
  setSelectedMembersModal
}: SelectorModalProps) {
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([])
  const [search, setSearch] = useState<string>('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setValue(
      'associatedMembersUserIds',
      selectedMembers.map((m) => m.userId)
    )
    setSelectedMembersModal(selectedMembers.map((m) => m.userId))
    setIsSelectorModalOpen(false)
  }

  const handleCancel = () => {
    setIsSelectorModalOpen(false)
  }

  return (
    <div className="absolute left-0 top-0 z-[160] flex h-screen w-full items-center justify-center bg-black bg-opacity-40">
      <section className="flex h-4/5 w-1/4 flex-col rounded-lg bg-white">
        <header className="flex justify-between gap-4 px-6 pt-6">
          <h1 className="text-xl font-bold">Membros</h1>
          <input
            type="text"
            className="w-full rounded-md bg-gray-200 px-2 py-1 text-black outline-none"
            placeholder="Buscar membro 🔎"
            onChange={(e) => setSearch(e.target.value)}
          />
        </header>
        <body className="mt-5 flex h-full flex-col gap-3 overflow-y-scroll px-6 pb-4">
          {allMembers
            ?.filter((member) => {
              if (search !== '')
                return member.name.toLowerCase().includes(search.toLowerCase())
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
                  // checked={
                  //   oldMembers.length !== 0 &&
                  //   oldMembers.some((m) => m === member.userId)
                  // }
                  onChange={(e) => {
                    setSelectedMembers(
                      e.target.checked
                        ? [...selectedMembers, member]
                        : selectedMembers.filter((m) => m.ra !== member.ra)
                    )
                  }}
                />
              </div>
            ))}
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
