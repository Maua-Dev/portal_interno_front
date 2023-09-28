import { useContext, useEffect, useState } from 'react'
import { Action } from '../../@clean/shared/domain/entities/action'
import { DefaultButton } from './little_components/Buttons'
import { Card } from './little_components/Card'
import { ActionContext } from '../contexts/action_context'

interface NewHistoricCardProps {
  action: Action
  editAction: () => void
}

export default function NewHistoricCard({
  action,
  editAction
}: NewHistoricCardProps) {
  // const durationInHours = hoursFormatter(action.duration).toString()
  const [MembersName, setMembersName] = useState<string[] | undefined>(
    undefined
  )
  const { getMember } = useContext(ActionContext)

  const title = action.title + ' ( 00:00 )'

  const fetchMembers = async (membersRa: string[]) => {
    const namesArray: string[] = []
    membersRa.map(async (ra) => {
      const member = await getMember(ra)
      if (member) {
        namesArray.push(member.name)
      }
    })
    setMembersName(namesArray)
  }

  useEffect(() => {
    const membersRa = action.associatedMembersRa

    if (membersRa) {
      fetchMembers(membersRa)
    }
  }, [action])

  return (
    <Card.Root size="full">
      <Card.Header columns="single" className="border-zinc-400">
        <div className="flex flex-row justify-between">
          <Card.Title textStyle="bold">{title}</Card.Title>
          <DefaultButton
            label={'Editar'}
            color={'blue'}
            className="xl:h-10 xl:px-10 xl:text-lg"
            onClick={editAction}
          />
        </div>
        <div>
          <Card.Text textStyle="regular">Inicio 28/10/2022</Card.Text>
          <Card.Text textStyle="bold">VALIDO</Card.Text>
        </div>
      </Card.Header>
      <Card.Body className="px-0">
        <Card.Dropdown label="MEMBROS" listDropdown={MembersName} />
        <Card.Dropdown label="ÁREAS" listDropdown={action.stackTags} />
        <div>
          <Card.Text textStyle="bold" className="mb-3 pl-2 text-black">
            DESCRIÇÃO
          </Card.Text>
          <div className="rounded-md border border-zinc-600 p-4">
            {action.description}
          </div>
        </div>
      </Card.Body>
    </Card.Root>
  )
}
