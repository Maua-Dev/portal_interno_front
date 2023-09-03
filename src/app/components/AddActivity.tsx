import { Card } from './little_components/Card'
import { CancelAndSaveButtons } from './little_components/Buttons'
import { DisplayHours } from './little_components/DisplayHours'
import ActivityForm from './little_components/ActivityForm'
import { useContext, useState } from 'react'
import { ACTION_TYPE } from '../../@clean/shared/domain/enums/action_type_enum'
import { STACK } from '../../@clean/shared/domain/enums/stack_enum'
import { ActionContext } from '../contexts/action_context'
import { ActionProps, Action } from '../../@clean/shared/domain/entities/action'

export default function AddActivity() {
  const { createAction } = useContext(ActionContext)
  const [actionProps, setActionProps] = useState({
    ownerRa: '21.01731-0', //nao possui input
    startDate: 1634526000000, // WORKING
    endDate: 1634533200000, // WORKING
    duration: 7200000, // WORKING
    actionId: 'uuid2', //nao possui input
    associatedMembersRa: ['19.01731-0'], //nao possui input
    title: 'Teste', //nao possui input
    actionTypeTag: ACTION_TYPE.CODEREVIEW, // WORKING
    projectCode: 'MF', // WORKING
    stackTags: [] as STACK[], //WORKING
    storyId: 0, // WORKING
    description: '' // WORKING
  })

  const assignNumber = (name: string, value: string) => {
    setActionProps((prev) => {
      return { ...prev, [name]: Number(value) }
    })
  }

  const assignString = (name: string, value: string) => {
    setActionProps((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const assignStackArray = (value: STACK) => {
    setActionProps((prev) => {
      return { ...prev, stackTags: [...prev.stackTags, value] }
    })
  }

  const assingDates = (name: string, value: number) => {
    setActionProps((prev) => {
      console.log(name + ': ' + value)
      return { ...prev, [name]: value }
    })
  }

  const handleOnChange = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target
    console.log(name + ': ' + value)
    switch (name) {
      case 'storyId':
        assignNumber(name, value)
        break
      case 'stackTags':
        assignStackArray(value)
        break
      default:
        assignString(name, value)
        break
    }
  }

  const handleCreateAction = async (actionProps: ActionProps) => {
    console.log(actionProps.stackTags)
    if (actionProps) {
      const action = new Action(actionProps)
      const response = await createAction(action)
      console.log(response)
    }
  }

  return (
    <div>
      <Card.Root isPopUp={true} size="sm">
        <Card.Header columns="double">
          <div>
            <Card.Title textStyle="regular">TÍTULO DA ATIVIDADE</Card.Title>
            <Card.Text textStyle="regular">Aberto dia 28/10/2022</Card.Text>
          </div>
          <div className="flex flex-col items-center">
            <CancelAndSaveButtons
              onClickSave={() => {
                handleCreateAction(actionProps)
              }}
              onClickCancel={() => {}}
            />
            <DisplayHours hours={'00:00'} />
          </div>
        </Card.Header>
        <Card.Body>
          <ActivityForm onChange={handleOnChange} onDateChange={assingDates} />
        </Card.Body>
      </Card.Root>
    </div>
  )
}
