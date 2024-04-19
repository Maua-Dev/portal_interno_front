import { FormEvent, useContext, useState } from 'react'
import { MemberContext } from '../contexts/member_context'
import { stackToEnum } from '../../@clean/shared/domain/enums/stack_enum'
import { roleToEnum } from '../../@clean/shared/domain/enums/role_enum'
import { courseToEnum } from '../../@clean/shared/domain/enums/course_enum'

export default function RegisterModal() {
  const { createMember } = useContext(MemberContext)

  const [member, setMember] = useState({
    name: '',
    emailDev: '',
    emailMaua: '',
    ra: '',
    stack: '',
    year: '',
    phone: '',
    course: '',
    role: ''
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    console.log(member)

    const memberResponse = await createMember(
      member.ra,
      member.emailDev,
      roleToEnum(member.role),
      stackToEnum(member.stack),
      parseInt(member.year),
      member.phone,
      courseToEnum(member.course)
    )

    if (memberResponse) {
      alert('Membro cadastrado com sucesso!')
      window.location.reload()
    } else {
      alert('Erro ao cadastrar membro!')
    }
  }

  return (
    <div className="absolute left-0 top-0 z-[150] flex h-screen w-full items-center justify-center bg-black bg-opacity-80">
      <form
        onSubmit={handleSubmit}
        className="flex h-auto w-4/5  flex-col justify-center gap-4 rounded-lg bg-white p-8 md:w-1/2"
      >
        <h1 className="text-2xl font-bold">Ficha de cadastro de usuário</h1>
        <div className="flex flex-col gap-1">
          <label>Nome</label>
          <input
            onChange={(e) => setMember({ ...member, name: e.target.value })}
            type="text"
            className="w-full rounded-md bg-gray-200 px-2 py-1 text-black outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>E-mail da Dev</label>
          <input
            onChange={(e) => setMember({ ...member, emailDev: e.target.value })}
            placeholder="devmaua@gmail.com"
            type="text"
            className="w-full rounded-md bg-gray-200 px-2 py-1 text-black outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>E-mail da Mauá</label>
          <input
            onChange={(e) =>
              setMember({ ...member, emailMaua: e.target.value })
            }
            placeholder="@maua.br"
            type="text"
            className="w-full rounded-md bg-gray-200 px-2 py-1 text-black outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>RA</label>
          <input
            onChange={(e) => setMember({ ...member, ra: e.target.value })}
            placeholder="Apenas números"
            type="text"
            className="w-full rounded-md bg-gray-200 px-2 py-1 text-black outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>Stack</label>
          <select
            onChange={(e) => setMember({ ...member, stack: e.target.value })}
            className="w-full rounded-md bg-gray-200 px-2 py-1 text-black outline-none"
          >
            <option value="">Selecione uma opção</option>
            <option value="BACKEND">Back-end</option>
            <option value="FRONTEND">Front-end</option>
            <option value="UX_UI">UX/UI</option>
            <option value="PO">Business</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label>Role</label>
          <select
            onChange={(e) => setMember({ ...member, role: e.target.value })}
            className="w-full rounded-md bg-gray-200 px-2 py-1 text-black outline-none"
          >
            <option value="">Selecione uma opção</option>
            <option value="DEV">Desenvolvedor</option>
            <option value="HEAD">Head</option>
            <option value="DIRECTOR">Diretor</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label>Ano</label>
          <input
            onChange={(e) => setMember({ ...member, year: e.target.value })}
            placeholder="Apenas o número"
            type="text"
            className="w-full rounded-md bg-gray-200 px-2 py-1 text-black outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>Celular</label>
          <input
            onChange={(e) => setMember({ ...member, phone: e.target.value })}
            placeholder="Apenas o números, exemplo: 11998472553"
            type="text"
            className="w-full rounded-md bg-gray-200 px-2 py-1 text-black outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>Curso</label>
          <select
            onChange={(e) => setMember({ ...member, course: e.target.value })}
            className="w-full rounded-md bg-gray-200 px-2 py-1 text-black outline-none"
          >
            <option value="">Selecione uma opção</option>
            <option value="ADM">Administração</option>
            <option value="DSG">Design</option>
            <option value="EAL">Engenharia de Alimentos</option>
            <option value="ETC">Engenharia Civil</option>
            <option value="ECA">Engenharia de Controle e Automação</option>
            <option value="ECM">Engenharia de Computação</option>
            <option value="EET">Engenharia Elétrica</option>
            <option value="EEL">Engenharia Eletrônica</option>
            <option value="EMC">Engenharia Mecânica</option>
            <option value="EPM">Engenharia de Produção</option>
            <option value="EQM">Engenharia Química</option>
            <option value="CIC">Ciências da Computação</option>
            <option value="SIN">Sistemas de Informação</option>
          </select>
        </div>
        <div className="flex w-full justify-center pt-8">
          <button
            type="submit"
            className="rounded-lg border-2 border-blue-600 px-2 py-1 text-blue-600 sm:w-1/2"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  )
}
