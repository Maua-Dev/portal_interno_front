import { Action } from '../../../@clean/shared/domain/entities/action'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  ACTION_TYPE,
  translateActionTypeTag
} from '../../../@clean/shared/domain/enums/action_type_enum'
import { useForm } from 'react-hook-form'
import { STACK } from '../../../@clean/shared/domain/enums/stack_enum'
import {
  millisecondsToHours,
  timeStampToDate
} from '../../utils/functions/timeStamp'
import { useEffect, useState } from 'react'
import { Selector } from '../Selector'
import { useDarkMode } from '../../hooks/useDarkMode'
import { useModal } from '../../hooks/useModal'
import { useAction } from '../../hooks/useAction'
import { useProject } from '../../hooks/useProject'
import { useActionModal } from './hooks/useActionModal'

const actionSchema = z.object({
  title: z.string().min(1, { message: 'Título é obrigatório' }),
  projectCode: z
    .string()
    .min(1, { message: 'Código de Projeto é obrigatório' }),
  description: z.string().optional(),
  storyId: z.string().refine(
    (storyId) => {
      if (storyId === '') return true
      return /^\d{3,4}$/.test(storyId)
    },
    {
      message: 'Story Id deve ter 3 a 4 dígitos'
    }
  ),
  actionId: z.string().optional(),
  startDate: z.string().min(1, { message: 'Data inicial é obrigatória' }),
  endDate: z.string().min(1, { message: 'Data final é obrigatória' }),
  duration: z
    .number({
      required_error: 'Duração é obrigatória',
      invalid_type_error: 'Esse campo deve ser um número'
    })
    .positive({ message: 'Duração deve ser maior que zero' })
    .gte(0.1, { message: 'Duração é obrigatória' })
    .finite(),
  hour: z.string().refine((value) => /^\d{1,2}$/.test(value), {
    message: 'Horas devem ser um número entre 0 e 99'
  }),
  minute: z
    .string()
    .refine((value) => /^\d{1,2}$/.test(value), {
      message: 'Minutos devem ser um número entre 0 e 59'
    })
    .transform((value) => {
      const num = Number(value)
      return num < 10 ? `0${num}` : `${num}`
    })
    .refine((value) => Number(value) >= 0 && Number(value) <= 59, {
      message: 'Minutos devem estar entre 0 e 59'
    }),

  associatedMembersUserIds: z.array(z.string()),
  actionTypeTag: z.nativeEnum(ACTION_TYPE, {
    errorMap: (issue) => {
      if (issue.code === 'invalid_enum_value') {
        return { message: 'Action Tag é obrigatória' }
      }
      return { message: issue.message ?? '' }
    }
  }),
  stackTags: z
    .array(z.nativeEnum(STACK))
    .min(1, { message: 'Action type tag é obrigatória' })
})

export type ActionModalType = z.infer<typeof actionSchema>

export default function ActionModal({ action }: { action?: Action }) {
  // Hooks
  const { darkMode } = useDarkMode()
  const { closeModal } = useModal()
  const { handleCreateActionSubmit, handleUpdateActionSubmit, isLoading } =
    useAction()
  const { handleProjects, projects } = useProject()
  const { setCurrentMembers, setCurrentStackTags } = useActionModal()

  // Use state
  const [fade, setFade] = useState(false)

  // Constants
  const actionTypes: string[] = Object.values(ACTION_TYPE)
  let isUpdateModal: boolean = false

  if (action) {
    isUpdateModal = true
  }

  // Fade animation on mount
  useEffect(() => {
    if (action) {
      setCurrentMembers(action?.associatedMembersUserIds || [])
      setCurrentStackTags(action?.stackTags || [])
    }
    handleProjects()
    setTimeout(() => {
      setFade(true)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleConfirmCloseModal = () => {
    let isEmpty = true
    if (getValues('title') !== '') isEmpty = false
    if (getValues('projectCode') !== '') isEmpty = false
    if (getValues('description') !== '') isEmpty = false
    if (getValues('storyId') !== '') isEmpty = false
    if (getValues('startDate') !== '') isEmpty = false
    if (getValues('endDate') !== '') isEmpty = false
    if (getValues('duration') !== 0) isEmpty = false
    if (getValues('associatedMembersUserIds').length !== 0) isEmpty = false
    if (getValues('stackTags').length !== 0) isEmpty = false

    if (isEmpty) {
      closeModal()
      setCurrentMembers([])
      setCurrentStackTags([])
      return
    }

    if (confirm('Deseja fechar sem salvar?')) {
      closeModal(isUpdateModal)
      setCurrentMembers([])
      setCurrentStackTags([])
    }
  }

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<ActionModalType>({
    resolver: zodResolver(actionSchema),
    defaultValues: {
      title: action?.title || '',
      projectCode: action?.projectCode || '',
      description: action?.description || '',
      storyId: action?.storyId ? action?.storyId.toString() : '',
      startDate: action?.startDate ? timeStampToDate(action!.startDate) : '',
      endDate: action?.endDate ? timeStampToDate(action!.endDate) : '',
      duration: action?.duration
        ? millisecondsToHours(action!.duration)
        : undefined,
      hour: action?.duration
        ? Math.floor(millisecondsToHours(action!.duration))
            .toString()
            .padStart(2, '0')
        : undefined,
      minute: action?.duration
        ? Math.round(
            (millisecondsToHours(action!.duration) -
              Math.floor(millisecondsToHours(action!.duration))) *
              60
          )
            .toString()
            .padStart(2, '0')
        : undefined,
      associatedMembersUserIds: action?.associatedMembersUserIds || [],
      actionTypeTag: action?.actionTypeTag || undefined,
      stackTags: action?.stackTags || [],
      actionId: action?.actionId || ''
    },
    mode: 'onBlur'
  })
  useEffect(() => {
    const hourString = getValues('hour') || '0'
    const minuteString = getValues('minute') || '0'

    const hour = parseInt(hourString, 10)
    const minute = parseInt(minuteString, 10)

    const duration = hour + minute / 60
    setValue('duration', duration)
    console.log(hour, minute)
    console.log(duration)

    // Validação dos minutos
    if (minute < 0 || minute > 59) {
      setError('minute', {
        type: 'manual',
        message: 'Minutos devem estar entre 0 e 59'
      })
    } else {
      clearErrors('minute')
    }

    // Só valida a duração se pelo menos um dos campos (hour ou minute) tiver valor
    if (hourString !== '0' || minuteString !== '0') {
      if (duration <= 0) {
        setError('duration', {
          type: 'manual',
          message: 'Duração deve ser maior que zero'
        })
      } else {
        clearErrors('duration')
      }
    } else {
      // Se ambos os campos estiverem vazios, limpa o erro de duração
      clearErrors('duration')
    }
  }, [getValues('hour'), getValues('minute')])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'hour' | 'minute'
  ) => {
    let value = e.target.value
    value = value.replace(/\D/g, '')

    value = value.replace(/^0+(\d)/, '$1')

    if (value.length > 2) {
      value = value.slice(0, 2)
    }

    if (value.length === 1) {
      value = `0${value}`
    }

    setValue(field, value)
  }

  return (
    <>
      <div
        className={`flex w-full transform items-center justify-center overflow-x-hidden overflow-y-hidden py-24 transition-all duration-500 sm:pt-24 lg:h-dvh lg:py-12 lg:pt-24 ${
          isUpdateModal
            ? 'absolute left-0 top-0 z-50 h-[100rem] bg-black bg-opacity-80 sm:h-[85rem] lg:pt-0'
            : 'h-full lg:pl-14'
        } ${
          isUpdateModal
            ? `${fade ? 'opacity-100' : 'opacity-0'}`
            : `${
                fade ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'
              }`
        }
        `}
      >
        <div
          className="absolute left-0 top-0 z-[60] h-full w-full"
          onClick={isUpdateModal ? handleConfirmCloseModal : undefined}
        ></div>
        <div
          className={`z-[70] h-auto w-4/5 rounded-2xl transition-all duration-200 ${
            darkMode ? 'bg-skin-secundary text-white' : 'bg-white'
          }`}
        >
          <form
            onSubmit={
              action
                ? handleSubmit(handleUpdateActionSubmit)
                : handleSubmit(handleCreateActionSubmit)
            }
            className="flex h-auto flex-col gap-6 px-12 py-12 lg:flex-row"
          >
            <div className="flex w-full flex-col justify-between gap-8 lg:w-4/5">
              <div className="flex flex-col gap-4">
                {/* Title */}
                <h1 className="text-2xl font-bold">Título da atividade</h1>
                <input
                  type="text"
                  {...register('title')}
                  className={`rounded ${
                    darkMode ? 'bg-gray-600' : 'bg-gray-300'
                  } px-2 py-1 outline-none`}
                />
                <span className="text-red-600">{errors.title?.message}</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Project Selector */}
                  <div className="flex flex-col gap-2">
                    <p className="text-lg">Projeto</p>
                    <select
                      {...register('projectCode')}
                      className={`rounded ${
                        darkMode ? 'bg-gray-600' : 'bg-gray-300'
                      } px-2 py-[0.375rem] outline-none`}
                      value={action?.projectCode}
                    >
                      <option value="">Selecione uma opção</option>
                      {projects.map((project, index) => (
                        <option key={index} value={project.code}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                    <span className="text-red-600">
                      {errors.projectCode?.message}
                    </span>
                  </div>

                  {/* Action Id */}
                  <div className="flex flex-col gap-2">
                    <p className="text-lg">Story Id</p>
                    <input
                      type="text"
                      {...register('storyId')}
                      className={`rounded ${
                        darkMode ? 'bg-gray-600' : 'bg-gray-300'
                      } px-2 py-1 outline-none`}
                    />
                    <span className="text-red-600">
                      {errors.storyId?.message}
                    </span>
                  </div>

                  {/* Action Type Tag Selector */}
                  <div className="flex flex-col gap-2">
                    <p className="text-lg">Tag</p>
                    <select
                      {...register('actionTypeTag')}
                      className={`rounded ${
                        darkMode ? 'bg-gray-600' : 'bg-gray-300'
                      } px-2 py-[0.375rem] outline-none`}
                    >
                      <option value="">Selecione uma opção</option>
                      {actionTypes.map((actionType, index) => (
                        <option key={index} value={actionType}>
                          {translateActionTypeTag(actionType)}
                        </option>
                      ))}
                    </select>
                    <span className="text-red-600">
                      {errors.actionTypeTag?.message}
                    </span>
                  </div>

                  {/* Start Date */}
                  <div className="flex flex-col gap-2">
                    <p className="text-lg">Data inicial</p>
                    <input
                      type="datetime-local"
                      {...register('startDate')}
                      placeholder="DD/MM/AAAA"
                      className={`rounded ${
                        darkMode ? 'bg-gray-600' : 'bg-gray-300'
                      } px-2 py-1 outline-none`}
                    />
                    <span className="text-red-600">
                      {errors.startDate?.message}
                    </span>
                  </div>

                  {/* End Date */}
                  <div className="flex flex-col gap-2">
                    <p className="text-lg">Data final</p>
                    <input
                      type="datetime-local"
                      {...register('endDate')}
                      className={`rounded ${
                        darkMode ? 'bg-gray-600' : 'bg-gray-300'
                      } px-2 py-1 outline-none`}
                    />
                    <span className="text-red-600">
                      {errors.endDate?.message}
                    </span>
                  </div>

                  {/* Duration */}
                  <div className="flex flex-col gap-2">
                    <p className="text-lg">Duração da atividade</p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        {...register('hour')}
                        placeholder="00"
                        onChange={(e) => handleInputChange(e, 'hour')}
                        className={`rounded ${
                          darkMode ? 'bg-gray-600' : 'bg-gray-300'
                        } w-1/2 select-none px-2 py-[0.35rem] outline-none`}
                      />
                      <span> : </span>
                      <input
                        type="text"
                        {...register('minute')}
                        placeholder="00"
                        onChange={(e) => handleInputChange(e, 'minute')}
                        className={`rounded ${
                          darkMode ? 'bg-gray-600' : 'bg-gray-300'
                        } w-1/2 select-none px-2 py-[0.35rem] outline-none`}
                      />
                    </div>
                    <span className="text-red-600">
                      {errors.duration?.message ||
                        errors.minute?.message ||
                        errors.hour?.message}
                    </span>
                  </div>
                </div>
              </div>
              {/* Description */}
              <div className="flex h-44 flex-col gap-2">
                <p className="text-lg">Descrição</p>
                <textarea
                  {...register('description')}
                  className={`h-full resize-none rounded ${
                    darkMode ? 'bg-gray-600' : 'bg-gray-300'
                  } px-2 py-1 outline-none`}
                ></textarea>
                <span className="text-red-600">
                  {errors.description?.message}
                </span>
              </div>
            </div>

            <div className="flex w-full flex-col justify-between gap-4 lg:w-1/5">
              {/* Associated Members */}
              <div className="flex flex-col gap-4 sm:h-[40%] sm:max-h-52">
                <Selector
                  objectParameter="associatedMembersUserIds"
                  setValue={setValue}
                  getValues={getValues}
                />
              </div>

              {/* Stack Tag Selector */}
              <div className="flex flex-col gap-4 sm:h-[40%] sm:max-h-52">
                <Selector
                  objectParameter="stackTags"
                  isStackTagSelector
                  setValue={setValue}
                  getValues={getValues}
                />
              </div>
              <div className="flex w-full flex-col items-center gap-8 sm:flex-row lg:flex-col">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full justify-center rounded-lg border-2 border-blue-600 px-2 py-1 text-blue-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-1/2"
                >
                  {isUpdateModal ? 'Salvar' : 'Enviar'}
                </button>
                <button
                  type="button"
                  disabled={isLoading}
                  className="w-full rounded-lg bg-red-500 px-2 py-1 text-white disabled:cursor-not-allowed disabled:opacity-50 sm:w-1/2"
                  onClick={handleConfirmCloseModal}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
