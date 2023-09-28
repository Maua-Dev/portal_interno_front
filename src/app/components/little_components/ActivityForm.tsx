import { Form } from './Form'
import { ACTION_TYPE } from '../../../@clean/shared/domain/enums/action_type_enum'
import { STACK } from '../../../@clean/shared/domain/enums/stack_enum'
import React, { useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'

interface OptionsProps {
  name: string
  value: string
}

interface ActivityFormProps {
  raMembersSelected: string[] | undefined
  onChange: (e: any) => void
  onDateChange: (name: string, value: number) => void
  onMemberPopupClick?: () => void
}

export default function ActivityForm({
  raMembersSelected,
  onChange,
  onDateChange,
  onMemberPopupClick
}: ActivityFormProps) {
  const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs())
  const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs())
  const [raMembers, setRaMembers] = useState<OptionsProps[]>([])

  useEffect(() => {
    const tempRaArray: OptionsProps[] = []
    raMembersSelected?.map((raMember) => {
      tempRaArray.push({
        name: raMember,
        value: raMember
      })
    })
    setRaMembers(tempRaArray)
  }, [raMembersSelected])

  useEffect(() => {
    if (startDate && endDate) {
      onDateChange('startDate', startDate?.valueOf())
      onDateChange('endDate', endDate?.valueOf())
      onDateChange('duration', endDate?.diff(startDate))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate])
  return (
    <Form.Root>
      <div className="flex w-full flex-col gap-7 sm:flex-col">
        <div className="flex w-full flex-row gap-7 max-[1080px]:flex-col">
          <Form.SubjectContainer label="DATA">
            <Form.DatePiker label="Inicio" onChange={setStartDate} />
            <Form.DatePiker label="Fim" onChange={setEndDate} />
          </Form.SubjectContainer>
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
              name="actionTypeTag"
              onChange={onChange}
            />
          </Form.SubjectContainer>
        </div>
        <div className="flex w-full flex-row gap-7 max-[1080px]:flex-col">
          <div className="flex w-full flex-col gap-7">
            <Form.SelectField
              label="PROJETO"
              type="single"
              options={projects}
              name="projectCode"
              onChange={onChange}
            />
            <Form.TextField
              label="TASK ID"
              type="single"
              dataType="number"
              name="storyId"
              onChange={onChange}
            />
          </div>
          <div className="grid w-full grid-cols-2 gap-7">
            <Form.ListField
              label="MEMBROS"
              name="associatedMembersRa"
              options={raMembers}
              onIconButtonClick={onMemberPopupClick}
              // onChange={onChange}
              input={false}
            />
            <Form.ListField
              label="ÁREAS"
              options={areas}
              name="stackTags"
              onChange={onChange}
            />
          </div>
        </div>
      </div>
      <Form.TextArea name="description" onChange={onChange} />
    </Form.Root>
  )
}

const members = [
  {
    name: '',
    value: ''
  }
]

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

const areas = [
  {
    name: 'UX/UI',
    value: STACK.UX_UI
  },
  {
    name: 'Frontend',
    value: STACK.FRONTEND
  },
  {
    name: 'Backend',
    value: STACK.BACKEND
  },
  {
    name: 'Infra',
    value: STACK.INFRA
  },
  {
    name: 'Mobile',
    value: undefined
  },
  {
    name: 'QA',
    value: undefined
  },
  {
    name: 'DevOps',
    value: undefined
  },
  {
    name: 'PO',
    value: STACK.PO
  },
  {
    name: 'PM',
    value: undefined
  },
  {
    name: 'RH',
    value: STACK.INTERNAL
  },
  {
    name: 'Financeiro',
    value: undefined
  },
  {
    name: 'Marketing',
    value: undefined
  },
  {
    name: 'Comercial',
    value: undefined
  },
  {
    name: 'Jurídico',
    value: undefined
  },
  {
    name: 'Outros',
    value: undefined
  }
]

const projects = [
  {
    name: 'Portal Interno',
    value: 'PT'
  },
  {
    name: 'Maua Food',
    value: 'MF'
  },
  {
    name: 'Selfie Mauá',
    value: 'SF'
  },
  {
    name: 'SMILE',
    value: 'SM'
  },
  {
    name: 'Gameficação',
    value: 'GM'
  }
]
