import useDarkMode from '../utils/functions/useDarkMode'
import { Action } from '../../@clean/shared/domain/entities/action'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ACTION_TYPE } from '../../@clean/shared/domain/enums/action_type_enum'
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
import { Member } from '../../@clean/shared/domain/entities/member'

const actionSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  projectCode: z.string().min(1, { message: 'Project Code is required' }),
  description: z.string(),
  actionId: z.string().min(1, { message: 'Action Id is required' }),
  startDate: z
    .string()
    .refine((value) => /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value), {
      message: 'Invalid date format'
    }),
  endDate: z
    .string()
    .refine((value) => /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value), {
      message: 'Invalid date format'
    }),
  duration: z
    .number({
      required_error: 'Duration is required',
      invalid_type_error: 'This field must be a number'
    })
    .positive({ message: 'Duration must be a positive number' })
    .gte(0.1, { message: 'Duration is required' })
    .finite(),
  members: z.array(z.string()),
  actionTypeTag: z.nativeEnum(ACTION_TYPE, {
    errorMap: (issue) => {
      if (issue.code === 'invalid_enum_value') {
        return { message: 'Action Tag is required' }
      }
      return { message: issue.message ?? '' }
    }
  }),
  stackTags: z
    .array(z.nativeEnum(STACK))
    .min(1, { message: 'Action type tag is required' })
})

type ActionModalType = z.infer<typeof actionSchema>

export default function ActionModal({ action }: { action?: Action }) {
  const actionTypes: string[] = Object.values(ACTION_TYPE)
  const { darkMode } = useDarkMode()
  const { getAllMembers, getMember } = useContext(ActionContext)
  const [members, setMembers] = useState<Member[] | undefined>()
  const [member, setMember] = useState<string | undefined>()

  useEffect(() => {
    getAllMembers()
      .then((members) => setMembers(members))
      .catch((error) => console.log(error))
  }, [getAllMembers])

  const validateAndAddMember = () => {
    if (member) {
      getMember(member)
        .then((member) => {
          console.log(member)
          setValue('members', [...getValues('members'), member!.ra])
          console.log(getValues('members'))
        })
        .catch((error) => console.log(error))
    }
  }

  const handleCreateActionSubmit = (data: ActionModalType) => {
    console.log('Create Action')
    data['startDate'] = dateToMilliseconds(data['startDate']).toString()
    data['endDate'] = dateToMilliseconds(data['endDate']).toString()
    data['duration'] = hoursToMilliseconds(data['duration'])
    console.table(data)
  }

  const handleUpdateActionSubmit = (data: ActionModalType) => {
    console.log('Update Action')
    console.table(data)
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
      actionId: action?.actionId || '',
      startDate: action?.startDate ? timeStampToDate(action!.startDate) : '',
      endDate: action?.endDate ? timeStampToDate(action!.endDate) : '',
      duration: action?.duration ? millisecondsToHours(action!.duration) : 0,
      members: action?.associatedMembersRa || [],
      actionTypeTag: action?.actionTypeTag || undefined,
      stackTags: action?.stackTags || []
    },
    mode: 'onBlur'
  })
  return (
    <div className="ml-14 flex h-screen w-full items-center justify-center">
      <div
        className={`h-4/5 w-4/5 rounded-2xl ${
          darkMode ? 'bg-dev-gray text-white' : 'bg-white'
        }`}
      >
        <form
          onSubmit={
            action
              ? handleSubmit(handleUpdateActionSubmit)
              : handleSubmit(handleCreateActionSubmit)
          }
          className="flex h-full flex-row gap-6 px-12 py-12"
        >
          <div className="flex w-4/5 flex-col justify-between gap-8">
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
              <div className="grid grid-cols-3 gap-6">
                {/* Project Selector */}
                <div className="flex flex-col gap-2">
                  <p className="text-lg">Projeto</p>
                  <select
                    {...register('projectCode')}
                    className={`rounded ${
                      darkMode ? 'bg-gray-600' : 'bg-gray-300'
                    } px-2 py-1 outline-none`}
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
                  <p className="text-lg">Action Id</p>
                  <input
                    type="text"
                    {...register('actionId')}
                    className={`rounded ${
                      darkMode ? 'bg-gray-600' : 'bg-gray-300'
                    } px-2 py-1 outline-none`}
                  />
                  <span className="text-red-600">
                    {errors.actionId?.message}
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
          <div className="flex w-1/5 flex-col gap-16">
            <div className="flex flex-col gap-4">
              <p className="text-2xl font-bold">Membros</p>
              <select
                className={`rounded ${
                  darkMode ? 'bg-gray-600' : 'bg-gray-300'
                } px-2 py-1 outline-none`}
                onChange={(e) => {
                  if (e.target.value !== '') {
                    setMember(e.target.value)
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
              <button type="button" onClick={validateAndAddMember}>
                Adicionar
              </button>
              {/* <span className="text-red-600">{errors.members?.message}</span> */}
              {getValues('members').map((member) => (
                <p key={member}>{member}</p>
              ))}
            </div>
            <h1 className="text-2xl font-bold">Ações</h1>
            <button type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
