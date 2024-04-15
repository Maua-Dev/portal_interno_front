import { useContext, useEffect } from 'react'
import ActionModal from '../components/ActionModal'
import Navbar from '../components/Navbar'
import { ModalContext } from '../contexts/modal_context'
import useDarkMode from '../utils/functions/useDarkMode'
import { ActionContext } from '../contexts/action_context'
import { ROLE } from '../../@clean/shared/domain/enums/role_enum'
import { STACK } from '../../@clean/shared/domain/enums/stack_enum'
import { COURSE } from '../../@clean/shared/domain/enums/course_enum'
// import { Action } from '../../@clean/shared/domain/entities/action'
// import { ACTION_TYPE } from '../../@clean/shared/domain/enums/action_type_enum'
// import { STACK } from '../../@clean/shared/domain/enums/stack_enum'

export default function Home() {
  const { darkMode } = useDarkMode()
  const { isModalOpen } = useContext(ModalContext)
  const { createMember, memberError } = useContext(ActionContext)
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

  async function batchCreateMember() {
    const member = await createMember(
      '22006800',
      'rsiqueira.devmaua@gmail.com',
      ROLE.DEV,
      STACK.FRONTEND,
      3,
      '11942318600',
      COURSE.CIC
    )

    console.log(member)
  }

  useEffect(() => {
    batchCreateMember()
    if (memberError) {
      return
    }
  }, [batchCreateMember])

  return (
    <>
      <Navbar />
      <main
        className={`${
          isModalOpen ? 'h-auto' : 'h-screen'
        } w-full overflow-x-hidden ${darkMode ? 'bg-black' : 'bg-sky-200'}`}
      >
        {/* {isModalOpen && <ActionModal action={action} />} */}
        {isModalOpen && <ActionModal />}
      </main>
    </>
  )
}
