import { ReactNode } from 'react'
import { CancelAndSaveButtons } from './little_components/Buttons'
import { Border } from './NameHeader'
import { DisplayHours } from './little_components/DisplayHours'
import { MidTitle, SmallTitle } from './little_components/Title'
import {
  FlexCol,
  FlexColCenter,
  FlexRow
} from './little_components/FlexDisplay'

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-full w-3/4 flex-col rounded-xl border-2 border-gray-400 px-4">
      {children}
    </div>
  )
}

const DataSelects = () => {
  return (
    <>
      <MidTitle>DATA</MidTitle>
      <FlexRow className="mb-6">
        <div className="mr-6">
          <SmallTitle>Início</SmallTitle>
          <select className="w-36 border-2 border-gray-700">
            <option value="1"></option>
          </select>
        </div>
        <div>
          <SmallTitle>Conclusão</SmallTitle>
          <select className="w-36 border-2 border-gray-700">
            <option value="1"></option>
          </select>
        </div>
      </FlexRow>
      <SmallTitle>Duração</SmallTitle>
      <input type="time" className="mb-5 border-2 border-gray-700" />
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
          <select className="w-52 border-2 border-gray-700">
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
      <select className="w-52 border-2 border-gray-700">
        <option value="1"></option>
      </select>
    </>
  )
}

const TaskIdSelect = () => {
  return (
    <div className="mt-12">
      <MidTitle>History ID</MidTitle>
      <input type="number" className="w-52 border-2 border-gray-700" />
    </div>
  )
}

const MembersList = () => {
  return (
    <FlexCol className="mr-6">
      <MidTitle>MEMBROS</MidTitle>
      <div className="h-60 w-52 border-2 border-gray-700"></div>
    </FlexCol>
  )
}

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
      <MidTitle>Áreas</MidTitle>
      <div className="h-60 w-52 overflow-scroll border-2 border-gray-700 p-0">
        {areas.map((area) => (
          <div className="flex justify-between">
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
          <MembersList />
          <DetailsList />
        </FlexRow>
      </FlexCol>
    </FlexRow>
  )
}

const Description = () => {
  return (
    <FlexCol className="mb-5">
      <p>DESCRIÇÃO</p>
      <input type="text" className="h-32 w-full border-2 border-gray-700" />
    </FlexCol>
  )
}

export default function AddActivity({
  cancel,
  save
}: {
  cancel: () => void
  save: () => void
}) {
  return (
    <Container>
      <Border mainCard>
        <FlexColCenter>
          <p className="text-2xl font-bold">TITULO DA ATIVIDADE</p>
        </FlexColCenter>
        <FlexColCenter>
          <CancelAndSaveButtons onClickCancel={cancel} onClickSave={save} />
          <DisplayHours hours="00:00" mainCard />
        </FlexColCenter>
      </Border>
      <FlexCol className="ml-8 mr-8">
        <InfoToBeFilled />
        <Description />
      </FlexCol>
    </Container>
  )
}
