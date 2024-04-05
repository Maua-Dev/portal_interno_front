import { useContext } from 'react'
import Navbar from '../components/Navbar'
import { ModalContext } from '../contexts/modal_context'
import useDarkMode from '../utils/functions/useDarkMode'
// import { Action } from '../../@clean/shared/domain/entities/action'
// import { ACTION_TYPE } from '../../@clean/shared/domain/enums/action_type_enum'
// import { STACK } from '../../@clean/shared/domain/enums/stack_enum'

export default function Home() {
  const { darkMode } = useDarkMode()
  const { modalContent } = useContext(ModalContext)
  // const action = new Action({
  //   ownerRa: '21002100',
  //   startDate: 1710797634000,
  //   endDate: 1710797634000 + 7200000, // Duas horas depois
  //   duration: 7200000, // Duas horas
  //   actionId: 'uuid8',
  //   title: 'Componente Histórico e Atividades',
  //   actionTypeTag: ACTION_TYPE.MEETING,
  //   projectCode: 'MF',
  //   stackTags: [STACK.FRONTEND, STACK.UX_UI],
  //   storyId: 1501,
  //   description: 'Reunião Daily',
  //   associatedMembersRa: ['21002102', '21002101']
  // })

  return (
    <>
      <Navbar />
      <main
        className={`h-screen w-full overflow-x-hidden ${
          darkMode ? 'bg-skin-fill' : 'theme-white bg-sky-200'
        }`}
      >
        {/* {isModalOpen && <ActionModal action={action} />} */}
        {modalContent}
      </main>
    </>
  )
}
