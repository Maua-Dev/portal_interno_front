import { FormEvent, useEffect, useState } from 'react'
import { Member } from '../../../../@clean/shared/domain/entities/member'
import { plainTextToRa } from '../../../utils/functions/formatters'
import {
  STACK,
  translateStackTag
} from '../../../../@clean/shared/domain/enums/stack_enum'
import { useDarkMode } from '../../../hooks/useDarkMode'
import { useMember } from '../../../hooks/useMember'
import { useActionModal } from '../../ActionModal/hooks/useActionModal'

interface SelectorModalProps {
  objectParameter: string
  setValue: any
  isStack?: boolean
  setIsSelectorModalOpen: (value: boolean) => void
}

export function SelectorModal({
  objectParameter,
  setValue,
  isStack = false,
  setIsSelectorModalOpen
}: SelectorModalProps) {
  // Hooks
  const { allMembers } = useMember()
  const {
    currentMembers,
    currentStackTags,
    setCurrentMembers,
    setCurrentStackTags
  } = useActionModal()
  const { darkMode } = useDarkMode()

  // useStates
  const [selectedMembers, setSelectedMembers] = useState<Member[]>(
    allMembers?.filter((m) =>
      currentMembers?.some((member) => member === m.userId)
    ) || []
  )
  const [selectedStackTags, setSelectedStackTags] = useState<STACK[]>(
    currentStackTags || []
  )
  const [search, setSearch] = useState('')
  const [fade, setFade] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setFade(false)
    })
  }, [])

  // Constants
  const allStackTags: string[] = Object.values(STACK)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!isStack) {
      setValue(
        objectParameter,
        selectedMembers.map((m) => m.userId)
      )
      setCurrentMembers(selectedMembers.map((m) => m.userId))
    } else {
      setValue(objectParameter, selectedStackTags)
      setCurrentStackTags(selectedStackTags)
    }
    setIsSelectorModalOpen(false)
  }

  const handleCancel = () => {
    setIsSelectorModalOpen(false)
  }

  return (
    <div
      className={`absolute left-0 top-0 z-[160] flex h-full w-full items-center justify-center bg-black bg-opacity-40 ${
        fade ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'
      }`}
    >
      <section
        className={`flex h-[40%] w-4/5 flex-col rounded-lg sm:w-1/3 lg:h-2/3 xl:w-1/4 ${
          darkMode ? 'bg-skin-secundary' : 'bg-white'
        }`}
      >
        <header className="flex justify-between gap-4 px-6 pt-6">
          <h1 className="text-xl font-bold">
            {!isStack ? 'Membros' : 'Áreas'}
          </h1>
          <input
            type="text"
            className={`w-full rounded-md ${
              darkMode ? 'bg-gray-600' : 'bg-gray-200'
            } px-2 py-1 outline-none`}
            placeholder={`Buscar ${!isStack ? 'membro' : 'área'} 🔎`}
            onChange={(e) => setSearch(e.target.value)}
          />
        </header>
        <div className="mt-5 flex h-full flex-col gap-3 overflow-y-scroll px-6 pb-4">
          {!isStack
            ? allMembers
                ?.filter((member) => {
                  if (search !== '') {
                    if (/^[a-z ]+$/.test(search.toLowerCase())) {
                      return member.name
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    } else {
                      return member.ra.match(
                        new RegExp(`^${search.replace(/\D/g, '')}`, 'g')
                      )
                    }
                  }
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
                        checked={
                          selectedStackTags &&
                          selectedStackTags.some((s) => s === stackEnum)
                        }
                        onChange={(e) => {
                          setSelectedStackTags(
                            e.target.checked
                              ? [...selectedStackTags, stackEnum]
                              : selectedStackTags.filter((s) => s !== stackEnum)
                          )
                        }}
                      />
                    </div>
                  )
                })}
        </div>
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
