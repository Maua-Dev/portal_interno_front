// import { Action } from '../../../@clean/shared/domain/entities/action'
import { ACTION_TYPE } from '../../../@clean/shared/domain/enums/action_type_enum'
import { CancelAndSaveButtons } from './Buttons'
import { Card } from './Card'
import { DisplayHours } from './DisplayHours'
import { Form } from './Form'
import { PopUp } from './PopUp'

interface EditActionPopUpProps {
  //   action: Action
  open: boolean
}

export function EditActionPopUp({ open }: EditActionPopUpProps) {
  if (!open) return null

  const actionTypes = [
    {
      name: 'Code Review',
      value: ACTION_TYPE.CODEREVIEW
    },
    {
      name: 'Estudo',
      value: ACTION_TYPE.LEARN
    },
    {
      name: 'Apresentação',
      value: ACTION_TYPE.PRESENTATION
    },
    {
      name: 'Design',
      value: ACTION_TYPE.DESIGN
    },
    {
      name: 'Planejamento',
      value: ACTION_TYPE.ARCHITECT
    },
    {
      name: 'Trabalho',
      value: ACTION_TYPE.WORK
    }
  ]

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
        <Card.Body>
          <Form.Root>
            {/* <h1 className=" ">Inicio</h1> */}
            <div className="flex flex-row gap-7">
              <div className="flex w-9/12 flex-col gap-7">
                <Form.SubjectContainer label="DATA">
                  <Form.TextField label="Inicio" type="child" />
                  <Form.TextField label="Conclusão" type="child" />
                </Form.SubjectContainer>
                <Form.SelectField
                  label="PROJETO"
                  type="single"
                  options={actionTypes}
                />
                <Form.TextField
                  label="TASK ID"
                  type="single"
                  dataType="number"
                />
              </div>
              <div className="flex w-full flex-col gap-7">
                <Form.SubjectContainer label="ÁREA E AÇÃO">
                  <Form.SelectField
                    label="Área"
                    type="child"
                    options={actionTypes}
                  />
                  <Form.SelectField
                    label="Tipo de Ação"
                    type="child"
                    options={actionTypes}
                  />
                </Form.SubjectContainer>
              </div>
            </div>
          </Form.Root>
        </Card.Body>
      </Card.Root>
    </PopUp>
  )
}
