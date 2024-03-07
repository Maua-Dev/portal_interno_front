import { useContext } from 'react'
import ActionModal from '../components/ActionModal'
import Navbar from '../components/Navbar'
import { ModalContext } from '../contexts/modal_context'
import useDarkMode from '../utils/functions/useDarkMode'
import { Action } from '../../@clean/shared/domain/entities/action'
import { ACTION_TYPE } from '../../@clean/shared/domain/enums/action_type_enum'
import { STACK } from '../../@clean/shared/domain/enums/stack_enum'

export default function Home() {
  const { darkMode } = useDarkMode()
  const { isModalOpen } = useContext(ModalContext)
  // const action = new Action({
  //   ownerRa: '21002100',
  //   startDate: 1689969600000,
  //   endDate: 1689976380000,
  //   duration: 6780000,
  //   actionId: 'uuid8',
  //   title: 'Componente Histórico e Atividades',
  //   actionTypeTag: ACTION_TYPE.MEETING,
  //   projectCode: 'MF',
  //   stackTags: [STACK.FRONTEND],
  //   storyId: 150,
  //   description: 'Reunião Daily',
  //   associatedMembersRa: ['21002102', '21002101']
  // })

  return (
    <>
      <Navbar />
      <main
        className={`h-screen w-full ${darkMode ? 'bg-black' : 'bg-sky-200'}`}
      >
        {isModalOpen && <ActionModal />}
      </main>
    </>
  )
}
