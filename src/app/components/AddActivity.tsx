import { ReactNode, useContext, useState } from 'react'
import { CancelAndSaveButtons } from './little_components/Buttons'
import { Border } from './NameHeader'
import { DisplayHours } from './little_components/DisplayHours'
import { MidTitle, SmallTitle } from './little_components/Title'
import {
  FlexCol,
  FlexColCenter,
  FlexRow
} from './little_components/FlexDisplay'
import dayjs, { Dayjs } from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import React from 'react'
import { Action } from '../../@clean/shared/domain/entities/action'
import { ACTION_TYPE } from '../../@clean/shared/domain/enums/action_type_enum'
import { STACK } from '../../@clean/shared/domain/enums/stack_enum'
import { ActionContext } from '../contexts/action_context'
import { ActionProps } from '../../@clean/shared/domain/entities/action'

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-full w-full flex-col rounded-xl border-2 border-gray-400 px-4">
      {children}
    </div>
  )
}

const DataSelects = () => {
  const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs())
  const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs())

  // const days = endDate?.diff(startDate, 'day')

  return (
    <>
      <MidTitle>DATA</MidTitle>
      <FlexRow className="mb-6">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker
              sx={{
                '& .MuiInputLabel-root': { color: 'black' },
                '& .MuiOutlinedInput-root': {
                  '& > fieldset': { borderColor: 'black', borderWidth: '2px' }
                }
              }}
              label="Inicio"
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue)
              }}
              format="DD-MM-YYYY"
              // disablePast
            />
            <DatePicker
              sx={{
                '& .MuiInputLabel-root': { color: 'black' },
                '& .MuiOutlinedInput-root': {
                  '& > fieldset': { borderColor: 'black', borderWidth: '2px' }
                }
              }}
              label="Fim"
              value={endDate}
              onChange={(newValue) => {
                setEndDate(newValue)
              }}
              format="DD-MM-YYYY"
              // {areValidDates ? }
            />
          </DemoContainer>
        </LocalizationProvider>
      </FlexRow>
    </>
  )
}

const AreaSelects = () => {
  return (
    <>
      <MidTitle>ÁREA E AÇÃO</MidTitle>
      <FlexRow className="mb-6">
        <div>
          <SmallTitle>Tipo da ação</SmallTitle>
          <select className="w-52 rounded-md border-2 border-gray-700">
            <option value="1"></option>
          </select>
        </div>
      </FlexRow>
    </>
  )
}

const ProjectSelect = () => {
  return (
    <>
      <MidTitle>PROJETO</MidTitle>
      <select className="w-52 rounded-md border-2 border-gray-700">
        <option value="1"></option>
      </select>
    </>
  )
}

const TaskIdSelect = () => {
  return (
    <div className="mt-12">
      <MidTitle>History ID</MidTitle>
      <input
        type="number"
        className="w-52 rounded-md border-2 border-gray-700"
      />
    </div>
  )
}

// const MembersList = () => {
//   return (
//     <FlexCol className="mr-6">
//       <MidTitle>MEMBROS</MidTitle>
//       <div className="h-60 w-52 border-2 border-gray-700"></div>
//     </FlexCol>
//   )
// }

const DetailsList = () => {
  const areas = [
    'UX/UI',
    'Frontend',
    'Backend',
    'Mobile',
    'QA',
    'DevOps',
    'PO',
    'PM',
    'RH',
    'Financeiro',
    'Marketing',
    'Comercial',
    'Jurídico',
    'Outros'
  ]

  return (
    <FlexCol>
      <SmallTitle>Áreas:</SmallTitle>
      <div className="h-60 w-52 overflow-scroll rounded-md border-2 border-gray-700 py-2 pl-1 pr-4">
        {areas.map((area, index) => (
          <div className="flex justify-between" key={index}>
            <p>{area}</p>
            <input type="checkbox" />
          </div>
        ))}
      </div>
    </FlexCol>
  )
}

const InfoToBeFilled = () => {
  return (
    <FlexRow>
      <FlexCol className="mr-14">
        <DataSelects />
        <ProjectSelect />
        <TaskIdSelect />
      </FlexCol>
      <FlexCol>
        <AreaSelects />
        <FlexRow>
          <DetailsList />
        </FlexRow>
      </FlexCol>
    </FlexRow>
  )
}

const Description = ({ onChange }: { onChange: (e: any) => void }) => {
  return (
    <FlexCol className="mb-5 mt-8 xl:mt-0">
      <MidTitle>Descrição:</MidTitle>
      <textarea
        className="h-32 w-full rounded-md border-2 border-gray-700 p-2"
        placeholder="Digite sobre a ação realizada..."
        name="description"
        onChange={onChange}
      />
    </FlexCol>
  )
}

export default function AddActivity({
  action,
  cancel,
  save
}: {
  action: Action
  setAction: () => void
  cancel: () => void
  save: () => void
}) {
  const { createAction } = useContext(ActionContext)
  const [actionProps, setActionProps] = useState({
    ownerRa: '21.01731-0', //nao possui input
    startDate: 1634526000000,
    endDate: 1634533200000,
    duration: 7200000,
    actionId: 'uuid2', //nao possui input
    associatedMembersRa: ['19.01731-0'], //nao possui input
    title: 'Teste', //nao possui input
    actionTypeTag: ACTION_TYPE.CODE,
    projectCode: 'MF',
    stackTags: [STACK.BACKEND],
    storyId: 100,
    description: ''
  })

  const handleOnChange = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target
    console.log(name + value)
    setActionProps((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const handleCreateAction = async (actionProps: ActionProps) => {
    console.log(actionProps.description)
    if (actionProps) {
      const action = new Action(actionProps)
      const response = await createAction(action)
      console.log(response)
    }
  }

  return (
    <Container>
      <Border mainCard>
        <FlexColCenter>
          <p className="text-2xl font-bold">TITULO DA ATIVIDADE</p>
        </FlexColCenter>
        <FlexColCenter>
          <CancelAndSaveButtons
            onClickCancel={cancel}
            onClickSave={() => {
              handleCreateAction(actionProps)
            }}
          />
          <DisplayHours hours="00:00" mainCard />
        </FlexColCenter>
      </Border>
      <FlexCol className="ml-8 mr-8">
        <InfoToBeFilled />
        <Description onChange={handleOnChange} />
      </FlexCol>
    </Container>
  )
}
