import useDarkMode from '../utils/functions/useDarkMode'
import { Action } from '../../@clean/shared/domain/entities/action'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  ACTION_TYPE,
  translateActionTypeTag
} from '../../@clean/shared/domain/enums/action_type_enum'
import { useForm } from 'react-hook-form'
import { STACK } from '../../@clean/shared/domain/enums/stack_enum'
import {
  millisecondsToHours,
  timeStampToDate,
  dateToMilliseconds,
  hoursToMilliseconds
} from '../utils/functions/timeStamp'
import { useContext, useEffect, useState } from 'react'
import { ActionContext } from '../contexts/action_context'
import { ModalContext } from '../contexts/modal_context'
import Historic from './Historic'
import { Selector } from './Selector'

const actionSchema = z.object({
  title: z.string().min(1, { message: 'Título é obrigatório' }),
  projectCode: z
    .string()
    .min(1, { message: 'Código de Projeto é obrigatório' }),
  description: z.string(),
  storyId: z.string().refine(
    (storyId) => {
      if (storyId === '') return true
      return /^\d{4}$/.test(storyId)
    },
    {
      message: 'Story Id deve ter 4 dígitos'
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
    .positive({ message: 'Duração deve ser um número maior que zero' })
    .gte(0.1, { message: 'Duração é obrigatória' })
    .finite(),
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

type ActionModalType = z.infer<typeof actionSchema>

export default function ActionModal({ action }: { action?: Action }) {
  // Local State
  const { darkMode } = useDarkMode()

  // Contexts
  const { closeModal, changeModalContent } = useContext(ModalContext)
  const { updateAction, createAction, getAllProjects } =
    useContext(ActionContext)

  // Use state
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [fade, setFade] = useState<boolean>(false)
  const [stackTags, setStackTags] = useState<STACK[]>(action?.stackTags || [])
  const [dataProjects, setDataProjects] = useState([])

  // Constants
  const actionTypes: string[] = Object.values(ACTION_TYPE)
  let isUpdateModal: boolean = false

  if (action) {
    isUpdateModal = true
  }

  useEffect(() => {
    allProjects()
    setTimeout(() => {
      setFade(true)
    })
  }, [])

  const handleCreateActionSubmit = async (data: ActionModalType) => {
    console.table(data)
    setIsLoading(true)
    try {
      const createdAction = await createAction(
        dateToMilliseconds(data.startDate),
        data.title,
        data.description,
        dateToMilliseconds(data.endDate),
        hoursToMilliseconds(data.duration),
        data.projectCode,
        data?.storyId ? parseInt(data.storyId) : undefined,
        data.associatedMembersUserIds,
        data.stackTags,
        data.actionTypeTag
      )

      console.log(createdAction)
      if (createdAction) {
        closeModal()
        alert('Atividade criada com sucesso!')
      }
    } catch (error: any) {
      console.error(error)
      alert('Erro ao criar atividade: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateActionSubmit = async (data: ActionModalType) => {
    setIsLoading(true)
    console.log('Update Action')
    console.table(data)
    try {
      const updatedAction = await updateAction(
        data.actionId!,
        dateToMilliseconds(data.startDate),
        dateToMilliseconds(data.endDate),
        hoursToMilliseconds(data.duration),
        data?.storyId ? parseInt(data.storyId) : undefined,
        data.title,
        data.description,
        data.projectCode,
        data.associatedMembersUserIds,
        data.stackTags,
        data.actionTypeTag
      )
      console.log(updatedAction)
      if (updatedAction) {
        alert('Atividade atualizada com sucesso!')
        changeModalContent(<Historic />)
      }
    } catch (error: any) {
      alert('Erro ao atualizar atividade: ' + error.message)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

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
      return
    }

    if (confirm('Deseja fechar sem salvar?')) closeModal(isUpdateModal)
  }

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors }
  } = useForm<ActionModalType>({
    resolver: zodResolver(actionSchema),
    defaultValues: {
      title: action?.title || '',
      projectCode: action?.projectCode || '',
      description: action?.description || '',
      storyId: action?.storyId.toString() || '',
      startDate: action?.startDate ? timeStampToDate(action!.startDate) : '',
      endDate: action?.endDate ? timeStampToDate(action!.endDate) : '',
      duration: action?.duration
        ? millisecondsToHours(action!.duration)
        : undefined,
      associatedMembersUserIds: action?.associatedMembersUserIds || [],
      actionTypeTag: action?.actionTypeTag || undefined,
      stackTags: action?.stackTags || [],
      actionId: action?.actionId || ''
    },
    mode: 'onBlur'
  })

  const allProjects = () => {
    const response = getAllProjects()
    response.then((res: any) => {
      setDataProjects(res.projects)
    })
  }

  return (
    <div
      className={`flex h-auto w-full transform items-center justify-center overflow-hidden py-24 transition-all duration-300 lg:h-screen lg:overflow-hidden lg:py-0 ${
        isUpdateModal
          ? 'absolute left-0 top-0 z-50 bg-black bg-opacity-80'
          : 'lg:pl-14'
      } ${
        isUpdateModal
          ? `${fade ? 'opacity-100' : 'opacity-0'}`
          : `${fade ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'}`
      }
      `}
    >
      <div
        className="absolute z-[60] h-screen w-full"
        onClick={isUpdateModal ? handleConfirmCloseModal : undefined}
      ></div>
      <div
        className={`z-[70] h-auto w-4/5 rounded-2xl lg:h-4/5 ${
          darkMode ? 'bg-skin-secundary text-white' : 'bg-white'
        }`}
      >
        <form
          onSubmit={
            action
              ? handleSubmit(handleUpdateActionSubmit)
              : handleSubmit(handleCreateActionSubmit)
          }
          className="flex h-auto flex-col gap-6 px-12 py-12 lg:h-full lg:flex-row"
        >
          <div className="flex w-full flex-col justify-between gap-8 lg:w-3/5 xl:w-4/5">
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
                    {dataProjects.map(
                      (
                        data: { project: { code: string; name: string } },
                        index: number
                      ) => (
                        <option key={index} value={data.project.code}>
                          {data.project.name}
                        </option>
                      )
                    )}
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
                  <input
                    type="text"
                    {...register('duration', {
                      valueAsNumber: true
                    })}
                    placeholder="Em horas"
                    className={`rounded ${
                      darkMode ? 'bg-gray-600' : 'bg-gray-300'
                    } select-none px-2 py-[0.35rem] outline-none`}
                  />
                  <span className="text-red-600">
                    {errors.duration?.message}
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

          <div className="flex w-full flex-col justify-between gap-4 lg:w-2/5 xl:w-1/5">
            {/* Associated Members */}
            <div className="flex h-72 flex-col gap-4 sm:h-[40%]">
              <Selector
                members={action?.associatedMembersUserIds || []}
                setValue={setValue}
                getValues={getValues}
              />
            </div>

            {/* Stack Tag Selector */}
            <div className="flex h-72 flex-col gap-4 sm:h-[40%]">
              <Selector
                stackTags={action?.stackTags || []}
                isStackTagSelector={true}
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
  )
}
