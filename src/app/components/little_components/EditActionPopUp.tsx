// import { Action } from '../../../@clean/shared/domain/entities/action'
import { useContext, useEffect } from 'react'
import { Action } from '../../../@clean/shared/domain/entities/action'
import { ACTION_TYPE } from '../../../@clean/shared/domain/enums/action_type_enum'
import { CancelAndSaveButtons } from './Buttons'
import { Card } from './Card'
import { DisplayHours } from './DisplayHours'
import { Form } from './Form'
import { PopUp } from './PopUp'
import { ActionContext } from '../../contexts/action_context'

interface EditActionPopUpProps {
  isOpen: boolean
  onClose: () => void
}

export function EditActionPopUp({ isOpen, onClose }: EditActionPopUpProps) {
  const { action } = useContext(ActionContext)

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

  const vazio = [
    {
      name: '',
      value: 'teste'
    }
  ]

  useEffect(() => {
    console.log(action?.title)
  }, [])

  return (
    <div>
      {isOpen ? (
        <PopUp closePopUp={onClose}>
          <Card.Root isPopUp={isOpen} size="lg">
            <Card.Header columns="double">
              <div>
                <Form.TitleField
                  text={action ? action.title : 'Loading...'}
                  name="title"
                  // onChange={handleOnChange}
                />
                <Card.Text textStyle="regular">Aberto dia 28/10/2022</Card.Text>
              </div>
              <div className="flex flex-col items-center">
                <CancelAndSaveButtons
                  onClickSave={() => {}}
                  onClickCancel={onClose}
                />
                <DisplayHours hours={'00:00'} />
              </div>
            </Card.Header>
            <Card.Body>
              <Form.Root>
                <div className="flex flex-row gap-7">
                  <div className="flex w-9/12 flex-col gap-7">
                    <Form.SubjectContainer label="DATA">
                      <Form.DatePiker label="Inicio" onChange={() => {}} />
                      <Form.DatePiker label="Fim" onChange={() => {}} />
                    </Form.SubjectContainer>
                    <Form.SelectField
                      label="PROJETO"
                      type="single"
                      options={actionTypes}
                    />
                    <Form.TextField
                      label="TASK ID"
                      type="single"
                      value={action ? action.storyId : undefined}
                      dataType="number"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-5">
                    <Form.SubjectContainer label="ESPECIFICAÇÃO E AÇÃO">
                      <Form.SelectField
                        label="Especificação"
                        type="child"
                        options={actionTypes}
                      />
                      <Form.SelectField
                        label="Tipo de Ação"
                        type="child"
                        options={actionTypes}
                      />
                    </Form.SubjectContainer>
                    <div className="grid grid-cols-2 gap-7">
                      <Form.ListField label="MEMBROS" options={vazio} />
                      <Form.ListField
                        label="ÁREAS"
                        options={actionTypes}
                        name="stackTags"
                      />
                    </div>
                  </div>
                </div>
                <Form.TextArea />
              </Form.Root>
            </Card.Body>
          </Card.Root>
        </PopUp>
      ) : null}
    </div>
  )
}
