import { Action } from '../../@clean/shared/domain/entities/action'
import { DefaultButton } from './little_components/Buttons'
import { Card } from './little_components/Card'

interface NewHistoricCardProps {
  action: Action
  editAction: () => void
}

export default function NewHistoricCard({
  action,
  editAction
}: NewHistoricCardProps) {
  // const durationInHours = hoursFormatter(action.duration).toString()
  const title = action.title + ' ( 00:00 )'

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
        <Card.Dropdown
          label="MEMBROS"
          listDropdown={action.associated_members_ra}
        />
        <Card.Dropdown label="ÁREAS" listDropdown={action.stack_tags} />
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
