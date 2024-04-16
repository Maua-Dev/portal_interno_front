import { useContext, useEffect } from 'react'
import ActionModal from '../components/ActionModal'
import Navbar from '../components/Navbar'
import { ModalContext } from '../contexts/modal_context'
import useDarkMode from '../utils/functions/useDarkMode'
import { ROLE } from '../../@clean/shared/domain/enums/role_enum'
import { STACK } from '../../@clean/shared/domain/enums/stack_enum'
import { COURSE } from '../../@clean/shared/domain/enums/course_enum'
import { MemberContext } from '../contexts/member_context'
// import { Action } from '../../@clean/shared/domain/entities/action'
// import { ACTION_TYPE } from '../../@clean/shared/domain/enums/action_type_enum'
// import { STACK } from '../../@clean/shared/domain/enums/stack_enum'

export default function Home() {
  const { darkMode } = useDarkMode()
  const { isModalOpen } = useContext(ModalContext)
  const { createMember, memberError } = useContext(MemberContext)

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
        className={`h-screen w-full overflow-x-hidden ${
          darkMode ? 'bg-skin-fill' : 'theme-white bg-sky-200'
        }`}
      >
        {/* {isModalOpen && <ActionModal action={action} />} */}
        {/* {modalContent} */}
        {isModalOpen && <ActionModal />}
      </main>
    </>
  )
}
