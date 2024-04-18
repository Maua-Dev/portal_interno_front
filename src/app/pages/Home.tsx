import { useContext, useEffect, useState } from 'react'
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
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '../assets/logo_dev.png'
import LogoBranco from '../assets/logo_dev_white.png'

export default function Home() {
  const { darkMode } = useDarkMode()
  const { isModalOpen } = useContext(ModalContext)

  const [loggedUser, setLoggedUser] = useState(false)
  const [nameUser, setNameUser] = useState('')

  const [ra, setRa] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [stack, setStack] = useState('')
  const [year, setYear] = useState(0)
  const [cellphone, setCellphone] = useState('')
  const [course, setCourse] = useState('')

  const { createMember, memberError, getMember } = useContext(ActionContext)
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
    // const member = await createMember(
    //   '22006800',
    //   'rsiqueira.devmaua@gmail.com',
    //   ROLE.DEV,
    //   STACK.FRONTEND,
    //   3,
    //   '11942318600',
    //   COURSE.CIC
    // )
    const member = await createMember(
      ra,
      email,
      ROLE[role as keyof typeof ROLE],
      STACK[stack as keyof typeof STACK],
      year,
      cellphone,
      COURSE[course as keyof typeof COURSE]
    )
    if (member) {
      setLoggedUser(true)
      toast.success('Usuário criado com sucesso!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? 'dark' : 'light'
      })
    } else {
      if (memberError != '') {
        toast.error(memberError, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: darkMode ? 'dark' : 'light'
        })
      }
    }
    // console.log(memberError)
  }

  useEffect(() => {
    const response = getMember()

    response
      .then((res) => {
        if (res != null) {
          setLoggedUser(true)
          setNameUser(res.props.name)
          // return console.log(res.props)
        }
      })
      .catch((err) => {
        console.log('error' + err)
      })
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Navbar />
      <main
        className={`${
          isModalOpen ? 'h-auto' : 'h-screen'
        } w-full overflow-x-hidden ${darkMode ? 'bg-black' : 'bg-sky-200'}`}
      >
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* {isModalOpen && <ActionModal action={action} />} */}
        {isModalOpen && <ActionModal />}

        {/* TELA DE CRIAÇÃO DO MEMBRO DEV */}
        <section
          className={`${
            loggedUser ? 'hidden' : 'flex'
          } flex min-h-screen items-center justify-center`}
        >
          <div
            className={`w-[50%] rounded p-8 max-md:w-[80%] ${
              darkMode ? 'bg-dev-gray text-white' : 'bg-white'
            }`}
          >
            <h1 className="mb-4 text-center text-2xl font-bold">
              Criar Usuário DEV
            </h1>
            <form action="">
              <div className="flex max-sm:flex-col sm:gap-4">
                <div className="w-1/2 max-sm:w-full">
                  <label
                    htmlFor="name"
                    className={`block ${
                      darkMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    RA (somente Números)
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setRa(e.target.value)}
                    className={`w-full rounded ${
                      darkMode ? 'bg-gray-600' : 'bg-gray-300'
                    } px-2 py-1 outline-none`}
                  />
                </div>
                <div className="w-1/2 max-sm:w-full">
                  <label
                    htmlFor="email"
                    className={`block ${
                      darkMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    Email da DEV
                  </label>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full rounded ${
                      darkMode ? 'bg-gray-600' : 'bg-gray-300'
                    } px-2 py-1 outline-none`}
                  />
                </div>
              </div>
              <div className="flex max-sm:flex-col sm:gap-4">
                <div className="w-1/2 max-sm:w-full">
                  <label
                    htmlFor="Role"
                    className={`block ${
                      darkMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    Role
                  </label>
                  <select
                    onChange={(e) => setRole(e.target.value)}
                    className={`w-full rounded ${
                      darkMode ? 'bg-gray-600' : 'bg-gray-300'
                    } px-2 py-1 outline-none`}
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="DIRECTOR">DIRECTOR</option>
                    <option value="DEV">DEV</option>
                    <option value="HEAD">HEAD</option>
                    <option value="INTERNAL">INTERNAL</option>
                    <option value="PO">PO</option>
                  </select>
                </div>
                <div className="w-1/2 max-sm:w-full">
                  <label
                    htmlFor="Stack"
                    className={`block ${
                      darkMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    Stack
                  </label>
                  <select
                    onChange={(e) => setStack(e.target.value)}
                    className={`w-full rounded ${
                      darkMode ? 'bg-gray-600' : 'bg-gray-300'
                    } px-2 py-1 outline-none`}
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="BACKEND">BACKEND</option>
                    <option value="FRONTEND">FRONTEND</option>
                    <option value="INFRA">INFRA</option>
                    <option value="UX_UI">UX_UI</option>
                    <option value="PO">PO</option>
                    <option value="INTERNAL">INTERNAL</option>
                    <option value="DATA_SCIENCE">DATA_SCIENCE</option>
                  </select>
                </div>
                <div className="w-1/2 max-sm:w-full">
                  <label
                    htmlFor="Curso"
                    className={`block ${
                      darkMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    Curso
                  </label>
                  <select
                    onChange={(e) => setCourse(e.target.value)}
                    className={` w-full rounded ${
                      darkMode ? 'bg-gray-600' : 'bg-gray-300'
                    } px-2 py-1 outline-none`}
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="ECM">ECM</option>
                    <option value="ECA">ECA</option>
                    <option value="CIC">CIC</option>
                    <option value="EMC">EMC</option>
                    <option value="ADM">ADM</option>
                    <option value="EET">EET</option>
                    <option value="EEE">EEE</option>
                    <option value="EQM">EQM</option>
                    <option value="SIN">SIN</option>
                    <option value="DSG">DSG</option>
                    <option value="ETC">ETC</option>
                    <option value="EAL">EAL</option>
                    <option value="EPM">EPM</option>
                  </select>
                </div>
              </div>
              <div className="flex max-sm:flex-col sm:gap-4">
                <div className="w-1/2 max-sm:w-full">
                  <label
                    htmlFor="Ano"
                    className={`block ${
                      darkMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    Ano
                  </label>
                  <select
                    onChange={(e) => setYear(+e.target.value)}
                    className={`w-full rounded ${
                      darkMode ? 'bg-gray-600' : 'bg-gray-300'
                    } px-2 py-1 outline-none`}
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div className="w-1/2 max-sm:w-full">
                  <label
                    htmlFor="Cellphone"
                    className={`block ${
                      darkMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    Telefone
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setCellphone(e.target.value)}
                    className={`w-full rounded ${
                      darkMode ? 'bg-gray-600' : 'bg-gray-300'
                    } px-2 py-1 outline-none`}
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end max-sm:justify-center">
                <button
                  type="button"
                  onClick={() => batchCreateMember()}
                  className="rounded-lg border-2 border-blue-600 px-2 py-1 text-blue-600 transition-all duration-150 ease-in-out hover:bg-blue-600 hover:text-white"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* TELA DE BEM-VINDO AO PORTAL INTERNO */}
        <section
          className={`${
            loggedUser ? 'flex' : 'hidden'
          } min-h-screen items-center justify-center ${
            darkMode ? 'text-white' : 'text-black'
          }`}
        >
          <div className="flex flex-col gap-8 p-8">
            <h2 className="text-center text-2xl max-md:text-lg">
              Seja Bem-vindo, {nameUser} ao
            </h2>
            <h1 className="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-center text-7xl font-bold uppercase text-transparent max-md:text-4xl">
              Portal Interno
            </h1>
            <div className="flex items-center justify-center">
              <img
                className="h-24 w-24"
                src={darkMode ? LogoBranco : Logo}
                alt="Logo da DevCommunity"
              />
              <h1 className="text-xl uppercase">Community</h1>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
