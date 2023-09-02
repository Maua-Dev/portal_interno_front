import { Action } from '../../../@clean/shared/domain/entities/action'
import { CancelAndSaveButtons } from './Buttons'
import { Card } from './Card'
import { DisplayHours } from './DisplayHours'
import { PopUp } from './PopUp'

interface EditActionPopUpProps {
  //   action: Action
  open: boolean
}

export function EditActionPopUp({ open }: EditActionPopUpProps) {
  if (!open) return null

  return (
    <PopUp>
      <Card.Root isPopUp={true} size="lg">
        <Card.Header columns="double">
          <div>
            <Card.Title textStyle="regular">TÍTULO DA ATIVIDADE</Card.Title>
            <Card.Text textStyle="regular">Aberto dia 28/10/2022</Card.Text>
          </div>
          <div className="flex flex-col items-center">
            <CancelAndSaveButtons
              onClickSave={() => {}}
              onClickCancel={() => {}}
            />
            <DisplayHours hours={'00:00'} />
          </div>
        </Card.Header>
      </Card.Root>
    </PopUp>
  )
}
