import useDarkMode from '../utils/functions/useDarkMode'
import { Action } from '../../@clean/shared/domain/entities/action'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ACTION_TYPE } from '../../@clean/shared/domain/enums/action_type_enum'
import { useForm } from 'react-hook-form'
import { STACK } from '../../@clean/shared/domain/enums/stack_enum'

const actionSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  projectCode: z.string().min(1, { message: 'Project Code is required' }),
  description: z.string(),
  actionId: z.string().min(1, { message: 'Action Id is required' }),
  startDate: z.string().min(1, { message: 'Initial date is required' }),
  endDate: z.string().min(1, { message: 'Final date is required' }),
  duration: z.string().min(1, { message: 'Time stamp is required' }),
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

  const {
    register,
    handleSubmit,
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
      duration: action?.duration
        ? `${secondsToDays(action!.duration)} dias`
        : '0 dias',
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
        <div className="flex h-full flex-row gap-6 px-12 py-24">
          <div className="flex w-3/5 flex-col justify-between gap-8">
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
              <span className="text-red-800">
                {errors.title && errors.title.message}
              </span>
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
                  <span className="text-red-800">
                    {errors.projectCode && errors.projectCode.message}
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
                  <span className="text-red-800">
                    {errors.actionId && errors.actionId.message}
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
                  <span className="text-red-800">
                    {errors.actionTypeTag && errors.actionTypeTag.message}
                  </span>
                </div>

                {/* Start Date */}
                <div className="flex flex-col gap-2">
                  <p className="text-lg">Data inicial</p>
                  <input
                    type="text"
                    {...register('startDate')}
                    className={`rounded ${
                      darkMode ? 'bg-gray-600' : 'bg-gray-300'
                    } px-2 py-1 outline-none`}
                  />
                </div>

                {/* End Date */}
                <div className="flex flex-col gap-2">
                  <p className="text-lg">Data final</p>
                  <input
                    type="text"
                    {...register('endDate')}
                    className={`rounded ${
                      darkMode ? 'bg-gray-600' : 'bg-gray-300'
                    } px-2 py-1 outline-none`}
                  />
                </div>

                {/* Duration */}
                <div className="flex flex-col gap-2">
                  <p className="text-lg">Duração</p>
                  <input
                    type="text"
                    {...register('duration')}
                    className={`rounded ${
                      darkMode ? 'bg-gray-600' : 'bg-gray-300'
                    } select-none px-2 py-1 outline-none`}
                    readOnly
                  />
                </div>
              </div>
            </div>
            {/* Description */}
            <div className="flex flex-col gap-2">
              <p className="text-lg">Descrição</p>
              <textarea
                {...register('description')}
                className={`h-56 resize-none rounded ${
                  darkMode ? 'bg-gray-600' : 'bg-gray-300'
                } px-2 py-1 outline-none`}
              ></textarea>
            </div>
          </div>
          <div className="flex w-2/5 flex-col">
            <h1 className="text-2xl font-bold">Código do projeto</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
