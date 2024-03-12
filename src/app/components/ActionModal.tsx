import useDarkMode from '../utils/functions/useDarkMode'
import { Action } from '../../@clean/shared/domain/entities/action'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ACTION_TYPE } from '../../@clean/shared/domain/enums/action_type_enum'
import { useForm } from 'react-hook-form'
import { STACK, stackToEnum } from '../../@clean/shared/domain/enums/stack_enum'
import {
  millisecondsToHours,
  timeStampToDate,
  dateToMilliseconds,
  hoursToMilliseconds
} from '../utils/functions/timeStamp'
import { useContext, useEffect, useState } from 'react'
import { ActionContext } from '../contexts/action_context'
import { Member } from '../../@clean/shared/domain/entities/member'
import ListRow from './ListRow'
import { ModalContext } from '../contexts/modal_context'
import { plainTextToRa } from '../utils/functions/formatters'

const actionSchema = z.object({
  title: z.string().min(1, { message: 'Título é obrigatório' }),
  projectCode: z
    .string()
    .min(1, { message: 'Código de Projeto é obrigatório' }),
  description: z.string(),
  storyId: z.string().refine((value) => /^\d{4}$/.test(value), {
    message: 'Story Id deve ter 4 dígitos'
  }),
  actionId: z.string().optional(),
  startDate: z
    .string()
    .refine(
      (value) =>
        /^([1-9]|0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2]|[1-9])\/((19|20)\d\d)$/.test(
          value
        ),
      {
        message: 'Formato inválido de data'
      }
    ),
  endDate: z
    .string()
    .refine(
      (value) =>
        /^([1-9]|0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2]|[1-9])\/((19|20)\d\d)$/.test(
          value
        ),
      {
        message: 'Formato inválido de data'
      }
    ),
  duration: z
    .number({
      required_error: 'Duração é obrigatória',
      invalid_type_error: 'Esse campo deve ser um número'
    })
    .positive({ message: 'Duração deve ser um número maior que zero' })
    .gte(0.1, { message: 'Duração é obrigatória' })
    .finite(),
  associatedMembersRa: z.array(z.string()),
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
  const { getAllMembers, getMember } = useContext(ActionContext)
  const { closeModal } = useContext(ModalContext)
  const { updateAction, createAction, getHistory } = useContext(ActionContext)

  // Use state
  const [members, setMembers] = useState<Member[] | undefined>()
  const [fade, setFade] = useState<boolean>(false)

  // Constants
  const actionTypes: string[] = Object.values(ACTION_TYPE)
  const stackTags: string[] = Object.values(STACK)
  let isUpdateModal: boolean = false

  if (action) {
    isUpdateModal = true
  }

  // Fetch all members
  useEffect(() => {
    getAllMembers()
      .then((members) => setMembers(members))
      .catch((error) => console.log(error))
  }, [getAllMembers])

  useEffect(() => {
    setTimeout(() => {
      setFade(true)
    })
  }, [])

  // Functions
  const removeItemFromList = (
    field: string,
    item: string | STACK,
    list: string[] | STACK[],
    setValue: any
  ): void => {
    setValue(
      field,
      list.filter((itemInList) => itemInList !== item)
    )
  }

  const validateAndAddMember = (member: string) => {
    if (member && getValues('associatedMembersRa').indexOf(member) === -1) {
      getMember(member)
        .then((member) => {
          console.log(member)
          setValue('associatedMembersRa', [
            ...getValues('associatedMembersRa'),
            member!.ra
          ])
          console.log(getValues('associatedMembersRa'))
        })
        .catch((error) => console.log(error))
    }
  }

  const validateAndAddStackTag = (stackTag: string) => {
    if (stackTag) {
      const stackFormatted: STACK = stackToEnum(stackTag)
      if (getValues('stackTags').indexOf(stackFormatted) === -1) {
        setValue('stackTags', [...getValues('stackTags'), stackFormatted])
      }
    }
  }

  const handleCreateActionSubmit = async (data: ActionModalType) => {
    console.log('Create Action')
    console.table(data)

    const createdAction = await createAction(
      new Action({
        ownerRa: '21002100',
        startDate: dateToMilliseconds(data.startDate),
        endDate: dateToMilliseconds(data.endDate),
        duration: hoursToMilliseconds(data.duration),
        storyId: parseInt(data.storyId),
        actionId: Math.floor(Math.random() * 1000000).toString(),
        title: data.title,
        description: data.description,
        projectCode: data.projectCode,
        associatedMembersRa: data.associatedMembersRa,
        stackTags: data.stackTags,
        actionTypeTag: data.actionTypeTag
      })
    )

    console.log(createdAction)

    console.log(await getHistory('21002100', 10))
  }

  const handleUpdateActionSubmit = async (data: ActionModalType) => {
    console.log('Update Action')
    console.table(data)
    const updatedAction = await updateAction(
      data.actionId!,
      '23017310',
      dateToMilliseconds(data.startDate),
      dateToMilliseconds(data.endDate),
      hoursToMilliseconds(data.duration),
      parseInt(data.storyId),
      data.title,
      data.description,
      data.projectCode,
      data.associatedMembersRa,
      data.stackTags,
      data.actionTypeTag
    )

    console.log(updatedAction)

    console.log(await getHistory('23017310', 10))
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
      duration: action?.duration ? millisecondsToHours(action!.duration) : 0,
      associatedMembersRa: action?.associatedMembersRa || [],
      actionTypeTag: action?.actionTypeTag || undefined,
      stackTags: action?.stackTags || []
    },
    mode: 'onBlur'
  })
  return (
    <div
      className={`h-auto w-full transform items-center justify-center overflow-hidden py-24 transition-all duration-300 md:h-screen md:overflow-hidden md:py-0 ${
        isUpdateModal
          ? 'absolute left-0 top-0 z-50 flex bg-black bg-opacity-80'
          : 'flex md:pl-14'
      } ${
        isUpdateModal
          ? `${fade ? 'opacity-100' : 'opacity-0'}`
          : `${fade ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'}`
      }
      `}
    >
      <div
        className={`h-auto w-4/5 rounded-2xl md:h-4/5 ${
          darkMode ? 'bg-dev-gray text-white' : 'bg-white'
        }`}
      >
        <form
          onSubmit={
            action
              ? handleSubmit(handleUpdateActionSubmit)
              : handleSubmit(handleCreateActionSubmit)
          }
          className="flex h-auto flex-col gap-6 px-12 py-12 md:h-full md:flex-row"
        >
          <div className="flex w-full flex-col justify-between gap-8 md:w-3/5 lg:w-4/5">
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
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {/* Project Selector */}
                <div className="flex flex-col gap-2">
                  <p className="text-lg">Projeto</p>
                  <select
                    {...register('projectCode')}
                    className={`rounded ${
                      darkMode ? 'bg-gray-600' : 'bg-gray-300'
                    } px-2 py-1 outline-none`}
                    value={action?.projectCode}
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="PI">Portal Interno</option>
                    <option value="SM">Smile</option>
                    <option value="MF">Mauá Food</option>
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
                    } px-2 py-1 outline-none`}
                  >
                    <option value="">Selecione uma opção</option>
                    {actionTypes.map((actionType) => (
                      <option key={actionType} value={actionType}>
                        {actionType}
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
                    type="text"
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
                    type="text"
                    {...register('endDate')}
                    placeholder="DD/MM/AAAA"
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
                  <p className="text-lg">Duração</p>
                  <input
                    type="text"
                    {...register('duration', {
                      valueAsNumber: true
                    })}
                    placeholder="Em horas"
                    className={`rounded ${
                      darkMode ? 'bg-gray-600' : 'bg-gray-300'
                    } select-none px-2 py-1 outline-none`}
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

          <div className="flex w-full flex-col justify-between gap-4 md:w-2/5 lg:w-1/5">
            {/* Associated Members */}
            <div className="flex h-1/2 flex-col gap-4">
              <p className="text-2xl font-bold">Membros</p>
              <select
                className={`rounded ${
                  darkMode ? 'bg-gray-600' : 'bg-gray-300'
                } px-2 py-1 outline-none`}
                onChange={(e) => {
                  if (e.target.value !== '') {
                    validateAndAddMember(e.target.value)
                  }
                }}
              >
                <option value="">Selecione</option>
                {members &&
                  members.map((member) => (
                    <option key={member.email} value={member.ra}>
                      {`${member.name} | ${member.ra}`}
                    </option>
                  ))}
              </select>
              <p className="text-xl font-bold">Membros associados</p>
              <div className="h-24 overflow-y-scroll rounded-md border-[1px] border-gray-400 p-2">
                {getValues('associatedMembersRa').map((member) => (
                  <ListRow
                    text={plainTextToRa(member)}
                    onClick={() => {
                      removeItemFromList(
                        'associatedMembersRa',
                        member,
                        getValues('associatedMembersRa'),
                        setValue
                      )
                    }}
                  />
                ))}
              </div>
              <span className="text-red-600">
                {errors.associatedMembersRa?.message}
              </span>
            </div>

            {/* Stack Tag Selector */}
            <div className="flex h-1/2 flex-col gap-4">
              <p className="text-2xl font-bold">Ações</p>
              <select
                className={`rounded ${
                  darkMode ? 'bg-gray-600' : 'bg-gray-300'
                } px-2 py-1 outline-none`}
                onChange={(e) => {
                  if (e.target.value !== '') {
                    validateAndAddStackTag(e.target.value)
                  }
                }}
              >
                <option value="">Selecione uma opção</option>
                {stackTags.map((stackTag) => (
                  <option key={stackTag} value={stackTag}>
                    {stackTag}
                  </option>
                ))}
              </select>
              <div className="h-20 overflow-y-scroll rounded-md border-[1px] border-gray-400 p-2">
                {getValues('stackTags').map((stack) => (
                  <ListRow
                    text={stack}
                    onClick={() =>
                      removeItemFromList(
                        'stackTags',
                        stack,
                        getValues('stackTags'),
                        setValue
                      )
                    }
                  />
                ))}
              </div>
              <span className="text-red-600">{errors.stackTags?.message}</span>
            </div>
            <div className="flex w-full flex-col items-center gap-8 sm:flex-row lg:flex-col">
              <button
                type="submit"
                className="w-full rounded-lg border-2 border-blue-600 px-2 py-1 text-blue-600 sm:w-1/2"
              >
                {isUpdateModal ? 'Salvar' : 'Enviar'}
              </button>
              <button
                type="button"
                className="w-full rounded-lg bg-red-500 px-2 py-1 text-white sm:w-1/2"
                onClick={closeModal}
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
