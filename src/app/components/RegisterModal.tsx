import { useContext, useState } from 'react'
import { MemberContext } from '../contexts/member_context'
import {
  STACK,
  translateStackTag
} from '../../@clean/shared/domain/enums/stack_enum'
import { ROLE, translateRole } from '../../@clean/shared/domain/enums/role_enum'
import {
  COURSE,
  translateCourse
} from '../../@clean/shared/domain/enums/course_enum'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const registerSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  emailDev: z.string().refine(
    (email) => {
      return /^[a-z]+\.devmaua@gmail.com$/.test(email)
    },
    {
      message: 'E-mail inválido. Insira um e-mail no formato .devmaua@gmail.com'
    }
  ),
  ra: z.string().refine(
    (ra) => {
      return /^\d{8}$/.test(ra)
    },
    {
      message: 'RA deve ter 8 dígitos sem ponto e/ou traço'
    }
  ),
  stack: z.nativeEnum(STACK, {
    errorMap: (issue) => {
      if (issue.code === 'invalid_enum_value') {
        return { message: 'Área é obrigatória' }
      }
      return { message: issue.message ?? '' }
    }
  }),
  year: z.string().refine(
    (year) => {
      return /^[1-6]$/.test(year)
    },
    {
      message: 'O ano do curso é obrigatório'
    }
  ),
  phone: z.string().refine(
    (phone) => {
      return /^\d{11}$/.test(phone)
    },
    {
      message: 'O número de celular deve ter 11 dígitos'
    }
  ),
  course: z.nativeEnum(COURSE, {
    errorMap: (issue) => {
      if (issue.code === 'invalid_enum_value') {
        return { message: 'Curso é obrigatório' }
      }
      return { message: issue.message ?? '' }
    }
  }),
  role: z.nativeEnum(ROLE, {
    errorMap: (issue) => {
      if (issue.code === 'invalid_enum_value') {
        return { message: 'Função é obrigatória' }
      }
      return { message: issue.message ?? '' }
    }
  })
})

type RegisterModalType = z.infer<typeof registerSchema>

export default function RegisterModal() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { createMember, memberError } = useContext(MemberContext)
  const allStackTags: string[] = Object.values(STACK)
  const allRoles: string[] = Object.values(ROLE)
  const allCourses: string[] = Object.values(COURSE)

  const handleRegisterMember = async (data: RegisterModalType) => {
    setIsLoading(true)

    const memberResponse = await createMember(
      data.ra,
      data.emailDev,
      data.role,
      data.stack,
      parseInt(data.year),
      data.phone,
      data.course
    )

    if (memberResponse) {
      toast.success('Membro cadastrado com sucesso! Página atualizando...', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
      setTimeout(() => {
        window.location.reload()
      }, 4000)
    } else {
      toast.error(memberError, {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
      setIsLoading(false)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterModalType>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur'
  })

  return (
    <div
      className={`absolute left-0 top-0 z-[150] flex h-dvh w-full items-center justify-center overflow-y-auto bg-black bg-opacity-60 py-12 lg:h-full ${
        errors.name ||
        errors.course ||
        errors.emailDev ||
        errors.phone ||
        errors.ra ||
        errors.role ||
        errors.stack ||
        errors.year
          ? 'pt-64'
          : 'pt-24'
      }`}
    >
      <form
        onSubmit={handleSubmit(handleRegisterMember)}
        className="flex h-auto w-4/5 flex-col justify-center gap-3 overflow-y-auto rounded-lg bg-white p-8 md:w-1/2"
      >
        <h1 className="text-2xl font-bold">Ficha de cadastro de usuário</h1>
        <div className="flex flex-col gap-1">
          <label>Nome</label>
          <input
            {...register('name')}
            type="text"
            className="w-full rounded-md bg-gray-200 px-2 py-1 text-black outline-none"
          />
          <span className="text-red-600">{errors.name?.message}</span>
        </div>
        <div className="flex flex-col gap-1">
          <label>E-mail da Dev</label>
          <input
            {...register('emailDev')}
            placeholder="devmaua@gmail.com"
            type="text"
            className="w-full rounded-md bg-gray-200 px-2 py-1 text-black outline-none"
          />
          <span className="text-red-600">{errors.emailDev?.message}</span>
        </div>
        <div className="flex flex-col gap-1">
          <label>RA</label>
          <input
            {...register('ra')}
            placeholder="Apenas números"
            type="text"
            className="w-full rounded-md bg-gray-200 px-2 py-1 text-black outline-none"
          />
          <span className="text-red-600">{errors.ra?.message}</span>
        </div>
        <div className="flex flex-col gap-1">
          <label>Área na Dev</label>
          <select
            {...register('stack')}
            className="w-full rounded-md bg-gray-200 px-2 py-1 text-black outline-none"
          >
            <option value="">Selecione uma opção</option>
            {allStackTags.map((stackTag, index) => (
              <option key={index} value={stackTag}>
                {translateStackTag(stackTag)}
              </option>
            ))}
          </select>
          <span className="text-red-600">{errors.stack?.message}</span>
        </div>
        <div className="flex flex-col gap-1">
          <label>Função na Dev</label>
          <select
            {...register('role')}
            className="w-full rounded-md bg-gray-200 px-2 py-1 text-black outline-none"
          >
            <option value="">Selecione uma opção</option>
            {allRoles.map((role, index) => (
              <option key={index} value={role}>
                {translateRole(role)}
              </option>
            ))}
          </select>
          <span className="text-red-600">{errors.role?.message}</span>
        </div>
        <div className="flex flex-col gap-1">
          <label>Ano do curso</label>
          <select
            {...register('year')}
            className="w-full rounded-md bg-gray-200 px-2 py-1 text-black outline-none"
          >
            <option value="">Selecione uma opção</option>
            <option value="1">1º Ano</option>
            <option value="2">2º Ano</option>
            <option value="3">3º Ano</option>
            <option value="4">4º Ano</option>
            <option value="5">5º Ano</option>
            <option value="6">6º Ano</option>
          </select>
          <span className="text-red-600">{errors.year?.message}</span>
        </div>
        <div className="flex flex-col gap-1">
          <label>Celular</label>
          <input
            {...register('phone')}
            placeholder="Apenas o números, exemplo: 11998472553"
            type="text"
            className="w-full rounded-md bg-gray-200 px-2 py-1 text-black outline-none"
          />
          <span className="text-red-600">{errors.phone?.message}</span>
        </div>
        <div className="flex flex-col gap-1">
          <label>Curso</label>
          <select
            {...register('course')}
            className="w-full rounded-md bg-gray-200 px-2 py-1 text-black outline-none"
          >
            <option value="">Selecione uma opção</option>
            {allCourses.map((course, index) => (
              <option key={index} value={course}>
                {translateCourse(course)}
              </option>
            ))}
          </select>
          <span className="text-red-600">{errors.course?.message}</span>
        </div>
        <div className="flex w-full justify-center pt-8">
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-lg border-2 border-blue-600 px-2 py-1 text-blue-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-1/2"
          >
            Enviar
          </button>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}
