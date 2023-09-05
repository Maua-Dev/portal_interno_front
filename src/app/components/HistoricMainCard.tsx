import { ReactNode } from 'react'
import { DefaultButton } from './little_components/Buttons'
import { ListComponent } from './little_components/ListComponent'
import { MainCard } from './little_components/MainCard'
import historyIcon from '../assets/history_image_button.png'
import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'
import { UnfocusedBG } from './little_components/UnfocusedBG'
import { EditActionPopUp } from './little_components/EditActionPopUp'
import { Action } from '../../@clean/shared/domain/entities/action'

const LeftSideHeader = () => {
  return (
    <div>
      <h3 className="text-lg">ATIVIDADE ( 00:00 )</h3>
      <p className="font-light">Inicio 28 / 10 / 2022</p>
      <h1 className="text-2xl font-extrabold">VÁLIDO</h1>
    </div>
  )
}

const RightSideHeader = () => {
  return (
    <div className="flex flex-col items-start justify-evenly">
      <h1 className="text-xl text-blue-800">(Task ID#)</h1>
      <DefaultButton label={'Editar'} color={'blue'}></DefaultButton>
      {/* <EditActionPopUp isVisible={editVisibility} action={}></EditActionPopUp> */}
    </div>
  )
}

const CardHeader = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-between rounded-s border-b-4 border-gray-400 pb-2 pl-4">
      {children}
    </div>
  )
}

const TopSection = () => {
  return (
    <div>
      <h1 className="text-xl font-extrabold text-blue-800">PROJETO:</h1>
      <h1 className="text-lg font-extrabold">ÁREA:</h1>
    </div>
  )
}

const MembrosList = () => {
  const mock_users = ['Bruno', 'Sakas', 'Rods', 'Furlas']
  return (
    <ListComponent label={'MEMBROS'}>
      {mock_users.map((user, index) => {
        return <div key={''}>{user + ' .' + (index + 1)}</div>
      })}
    </ListComponent>
  )
}

const TasksList = () => {
  interface TasksProps {
    name: string
    time: string
  }

  const mock_tasks: TasksProps[] = [
    { name: 'REUNIÃO', time: '00:34:24' },
    { name: 'FRONT', time: '01:23:14' }
  ]

  return (
    <ListComponent label={'ESPECIFICAÇÕES'}>
      {mock_tasks.map((task) => {
        return (
          <div key={''} className="flex justify-between">
            <p>{task.name}</p>
            <p>{task.time}</p>
          </div>
        )
      })}
    </ListComponent>
  )
}

const MiddleSection = () => {
  return (
    <div className="flex gap-2">
      <MembrosList />
      <TasksList />
    </div>
  )
}

const DescriptionField = () => {
  return (
    <MainCard width="w-full">
      <div>
        <h1 className="mb-3 font-semibold">DESCRIÇÃO</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a
        </p>
      </div>
    </MainCard>
  )
}

const BodySection = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-4 py-3">{children}</div>
}

const WebHistoricMainCard = () => {
  return (
    <MainCard width="max-[1050px]:hidden">
      <CardHeader>
        <LeftSideHeader />
        <RightSideHeader />
      </CardHeader>
      <BodySection>
        <TopSection />
        <MiddleSection />
        <DescriptionField />
      </BodySection>
    </MainCard>
  )
}

const PopUpHeader = ({ handleIconClose }: { handleIconClose: () => void }) => {
  return (
    <div className="flex flex-row justify-between">
      <img src={historyIcon} alt="History Icon" className="w-36 sm:w-48" />
      <IconButton
        disableRipple
        onClick={handleIconClose}
        className=" text-blue-700"
      >
        <CloseIcon className="text-blue-900" />
      </IconButton>
    </div>
  )
}

const PopUpTitle = () => {
  return (
    <div className=" mb-12">
      <h1 className=" mt-6 text-2xl">ATIVIDADE ( 00:00 )</h1>
      <h1 className="mt-2 text-2xl text-gray-500">Inicio 28/10/2022</h1>
    </div>
  )
}

const MobilePopUp = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <div
      className={
        'absolute bottom-0 left-0 right-0 top-48 z-20 m-auto h-fit w-5/6 rounded-md bg-white p-6 min-[950px]:hidden'
      }
    >
      <PopUpHeader handleIconClose={handleClose} />
      <div className="flex flex-col gap-4">
        <PopUpTitle />
        <MembrosList />
        <TasksList />
        <DescriptionField />
      </div>
    </div>
  )
}

const MobileHistoric = ({ handleLeave }: { handleLeave: () => void }) => {
  return (
    <div>
      <MobilePopUp handleClose={handleLeave} />
      <UnfocusedBG handleLeave={handleLeave} z_number="z-10" />
    </div>
  )
}

export default function HistoricMainCard({
  handleCloseMobilePopUp,
  action
}: {
  handleCloseMobilePopUp: () => void
  action: Action
}) {
  return (
    <div>
      <WebHistoricMainCard />
      <MobileHistoric handleLeave={handleCloseMobilePopUp} />
    </div>
  )
}
