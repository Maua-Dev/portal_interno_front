import * as Dialog from '@radix-ui/react-dialog'
import { HTMLAttributes, useEffect, useState } from 'react'
import { useDarkMode } from '../../../hooks/useDarkMode'
import { PenIcon, CalendarDays } from 'lucide-react'
import { JSX, ReactNode } from 'react'
import { ProjectProps } from '../../../../@clean/shared/domain/entities/project'
import { timeStampToDateDDMMYY } from '../../../utils/functions/timeStamp'
import { useMember } from '../../../hooks/useMember'
import { Member } from '../../../../@clean/shared/domain/entities/member'
import { IoPeople } from 'react-icons/io5'

interface ProjectActionProps extends HTMLAttributes<HTMLDivElement> {
  project: ProjectProps
  children: ReactNode // Corrigido o tipo de children
}

export default function ProjectActionCard({
  project,
  children
}: ProjectActionProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false)
  const [associatedMembers, setAssociatedMembers] = useState<Member[]>([])
  const [associatedPOMembers, setAssociatedPOMembers] = useState<Member[]>([])
  const [associatedSCRUMMembers, setAssociatedSCRUMMembers] = useState<
    Member[]
  >([])
  const { allMembers } = useMember()
  const { darkMode } = useDarkMode()
  const formattedDate = timeStampToDateDDMMYY(project.startDate)

  const loadMember = async (memberIds: string[]) => {
    const members = allMembers?.filter((member) =>
      memberIds.includes(member.userId)
    )

    if (members) {
      setAssociatedMembers(members)
    }
  }

  const POloadMember = async (memberIds: string) => {
    const members = allMembers?.filter((member) =>
      memberIds.includes(member.userId)
    )

    if (members) {
      setAssociatedPOMembers(members)
    }
  }

  const SCRUMloadMember = async (SCRUMId: string) => {
    const members = allMembers?.filter((member) =>
      SCRUMId.includes(member.userId)
    )

    if (members) {
      setAssociatedSCRUMMembers(members)
    }
  }

  useEffect(() => {
    if (project.membersUserIds) {
      loadMember(project.membersUserIds)
    }
  }, [project.membersUserIds])

  useEffect(() => {
    if (project.poUserId) {
      POloadMember(project.poUserId)
    }
  }, [project.poUserId])

  useEffect(() => {
    if (project.scrumUserId) {
      SCRUMloadMember(project.scrumUserId)
    }
  }, [project.scrumUserId])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Overlay className="fixed inset-0 z-40 bg-black opacity-50" />
      <Dialog.Content
        className={`scrollbar-hide-default fixed bottom-0 top-0 z-50 my-auto flex h-4/6 w-5/6 flex-col gap-10 overflow-x-hidden overflow-y-scroll rounded-lg border border-skin-muted px-8 py-12 text-skin-base outline-none sm:w-4/6 md:h-fit md:px-14 md:py-20 xl:w-6/12 xl:scrollbar-hide ${
          darkMode ? 'bg-skin-fill' : 'bg-skin-secundary'
        }`}
      >
        <div className="flex flex-col gap-8">
          {/* Header do Projeto com ícone de edição */}
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <PenIcon className="h-6 w-6 cursor-pointer text-skin-muted duration-150 hover:text-red-600 sm:h-5 sm:w-5" />
          </div>

          {/* Informações do projeto */}
          <div className="flex flex-row justify-between gap-10">
            {/* Lado esquerdo */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-6 sm:flex-row">
                <h2 className="flex items-center gap-2">
                  PO:{' '}
                  <span className="font-bold">
                    {associatedPOMembers.map((member) => member.name)}
                  </span>
                </h2>
                <h2 className="flex items-center gap-2">
                  Scrum:{' '}
                  <span className="font-bold">
                    {associatedSCRUMMembers.map((member) => member.name)}
                  </span>
                </h2>
              </div>

              <h2 className="flex items-center gap-2">
                <CalendarDays className="inline-block" /> Data de Início:{' '}
                <span className="font-bold">{formattedDate}</span>
              </h2>

              <div>
                <h2>Descrição:</h2>
                <textarea
                  className="h-32 w-full resize-none rounded-md border border-skin-muted bg-white px-4 py-2 text-sm text-black outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={project.description}
                  readOnly
                />
              </div>
            </div>

            {/* Lado direito */}
            <div className="flex flex-col gap-4 ">
              <h2 className="flex items-center gap-2 font-bold">
                <IoPeople className="inline-block" /> Membros:
              </h2>
              <ul className="space-y-1">
                {associatedMembers.map((member) => (
                  <li key={member.name} className="text-base">
                    {member.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Foto (Placeholder) */}
            {/* Foto */}
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-lg font-bold">Foto</h2>
              <div className="flex h-32 w-32 items-center justify-center rounded-md border border-skin-muted">
                {project.photo ? (
                  <img
                    src={project.photo}
                    alt="Foto do Projeto"
                    className="h-full w-full rounded-md object-cover"
                  />
                ) : (
                  <span className="text-gray-500">Nenhuma foto</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
