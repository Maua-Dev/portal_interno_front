import { ReactNode, useContext, useEffect, useState } from 'react'
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

const DateSelects = ({
  onChange
}: {
  onChange: (name: string, value: number) => void
}) => {
  const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs())
  const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs())

  // const days = endDate?.diff(startDate, 'day')

  useEffect(() => {
    if (startDate) {
      onChange('', startDate?.valueOf())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate])

  return (
    <>
      <MidTitle>DATA</MidTitle>
      <FlexRow className="mb-6">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker', 'DatePicker']}>
            <div>
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
                  if (newValue) {
                    setStartDate(newValue)
                  }
                }}
                format="DD-MM-YYYY"
                // disablePast
              />
            </div>
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

const AreaSelects = ({ onChange }: { onChange: (e: any) => void }) => {
  const actionTypes = [
    {
      actionType: 'Code Review',
      actionTypeValue: ACTION_TYPE.CODEREVIEW
    },
    {
      actionType: 'Estudo',
      actionTypeValue: ACTION_TYPE.LEARN
    },
    {
      actionType: 'Apresentação',
      actionTypeValue: ACTION_TYPE.PRESENTATION
    },
    {
      actionType: 'Design',
      actionTypeValue: ACTION_TYPE.DESIGN
    },
    {
      actionType: 'Planejamento',
      actionTypeValue: ACTION_TYPE.ARCHITECT
    },
    {
      actionType: 'Trabalho',
      actionTypeValue: ACTION_TYPE.WORK
    }
  ]

  return (
    <>
      <MidTitle>ÁREA E AÇÃO</MidTitle>
      <FlexRow className="mb-6">
        <div>
          <SmallTitle>Tipo da ação</SmallTitle>
          <select
            className="w-52 rounded-md border-2 border-gray-700"
            name="actionTypeTag"
            onChange={onChange}
          >
            {actionTypes.map((actionType, index) => {
              return (
                <option key={index} value={actionType.actionTypeValue}>
                  {actionType.actionType}
                </option>
              )
            })}
          </select>
        </div>
      </FlexRow>
    </>
  )
}

const ProjectSelect = ({ onChange }: { onChange: (e: any) => void }) => {
  const projects = [
    {
      projectName: 'Portal Interno',
      projectCode: 'PT'
    },
    {
      projectName: 'Maua Food',
      projectCode: 'MF'
    },
    {
      projectName: 'Selfie Mauá',
      projectCode: 'SF'
    },
    {
      projectName: 'SMILE',
      projectCode: 'SM'
    },
    {
      projectName: 'Gameficação',
      projectCode: 'GM'
    }
  ]

  return (
    <>
      <MidTitle>PROJETO</MidTitle>
      <select
        className="w-52 rounded-md border-2 border-gray-700"
        name="projectCode"
        onChange={onChange}
      >
        {projects.map((project, index) => {
          return (
            <option key={index} value={project.projectCode}>
              {project.projectName}
            </option>
          )
        })}
      </select>
    </>
  )
}

const TaskIdSelect = ({ onChange }: { onChange: (e: any) => void }) => {
  return (
    <div className="mt-12">
      <MidTitle>History ID</MidTitle>
      <input
        type="number"
        className="w-52 rounded-md border-2 border-gray-700"
        name="storyId"
        onChange={onChange}
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

const DetailsList = ({ onChange }: { onChange: (e: any) => void }) => {
  const areas = [
    {
      areaName: 'UX/UI',
      areaValue: STACK.UX_UI
    },
    {
      areaName: 'Frontend',
      areaValue: STACK.FRONTEND
    },
    {
      areaName: 'Backend',
      areaValue: STACK.BACKEND
    },
    {
      areaName: 'Infra',
      areaValue: STACK.INFRA
    },
    {
      areaName: 'Mobile',
      areaValue: undefined
    },
    {
      areaName: 'QA',
      areaValue: undefined
    },
    {
      areaName: 'DevOps',
      areaValue: undefined
    },
    {
      areaName: 'PO',
      areaValue: STACK.PO
    },
    {
      areaName: 'PM',
      areaValue: undefined
    },
    {
      areaName: 'RH',
      areaValue: STACK.INTERNAL
    },
    {
      areaName: 'Financeiro',
      areaValue: undefined
    },
    {
      areaName: 'Marketing',
      areaValue: undefined
    },
    {
      areaName: 'Comercial',
      areaValue: undefined
    },
    {
      areaName: 'Jurídico',
      areaValue: undefined
    },
    {
      areaName: 'Outros',
      areaValue: undefined
    }
  ]

  return (
    <FlexCol>
      <SmallTitle>Áreas:</SmallTitle>
      <div className="h-60 w-52 overflow-scroll rounded-md border-2 border-gray-700 py-2 pl-1 pr-4">
        {areas.map((area, index) => (
          <div className="flex justify-between" key={index}>
            <p>{area.areaName}</p>
            <input
              key={index}
              type="checkbox"
              name="stackTags"
              value={area.areaValue}
              onChange={onChange}
            />
          </div>
        ))}
      </div>
    </FlexCol>
  )
}

const InfoToBeFilled = ({
  onChange,
  onDateChange
}: {
  onChange: (e: any) => void
  onDateChange: (name: string, value: number) => void
}) => {
  return (
    <FlexRow>
      <FlexCol className="mr-14">
        <DateSelects onChange={onDateChange} />
        <ProjectSelect onChange={onChange} />
        <TaskIdSelect onChange={onChange} />
      </FlexCol>
      <FlexCol>
        <AreaSelects onChange={onChange} />
        <FlexRow>
          <DetailsList onChange={onChange} />
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
    startDate: 1634526000000, // WORKING
    endDate: 1634533200000,
    duration: 7200000,
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
        <InfoToBeFilled onChange={handleOnChange} onDateChange={assingDates} />
        <Description onChange={handleOnChange} />
      </FlexCol>
    </Container>
  )
}
