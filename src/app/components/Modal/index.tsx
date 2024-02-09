import { useCallback, useContext, useEffect, useState } from 'react'
import useDarkMode from '../../utils/functions/useDarkMode'
import { ActionContext } from '../../contexts/action_context'
import { Action } from '../../../@clean/shared/domain/entities/action'

export const Modal = ({
  onClick,
  open,
  create
}: {
  onClick: () => void
  open: boolean
  create: boolean
}) => {
  const { darkMode } = useDarkMode()

  const { getHistory } = useContext(ActionContext)
  const [action, setAction] = useState<Action | undefined>()

  const [titleToBeEdited, setTitleToBeEdited] = useState('')
  const [titleInputFocused, setTitleInputFocused] = useState(false)

  const [taskIdToBeEdited, setTaskIdToBeEdited] = useState('')
  const [taskIdInputFocused, setTaskIdInputFocused] = useState(false)

  const getHistoryData = useCallback(async () => {
    const data = await getHistory('19017310')
    setAction(data?.[0])
  }, [getHistory])

  useEffect(() => {
    if (open) {
      getHistoryData()
    }
  }, [])

  return (
    <div
      className={
        'fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 '
      }
    >
      <div
        className={`ml-40 h-2/3 w-4/5 transform rounded-xl ${
          darkMode ? 'bg-zinc-900' : 'bg-white'
        }`}
      >
        <button className="bg-black text-white" onClick={onClick}>
          Cancelar
        </button>
        <div className="ml-8 mr-8 mt-5 flex flex-col">
          <div className="flex justify-between">
            <h1 className={`text-2xl ${darkMode ? 'text-white' : ''} `}>
              Título da atividade
            </h1>
            <h1 className={`mr-20 text-xl ${darkMode ? 'text-white' : ''} `}>
              Membros
            </h1>
          </div>
          <div className="flex justify-between">
            <div className="flex w-10/12 flex-col">
              <input
                type="text"
                className={`mt-4 w-10/12 rounded-md border bg-none pl-2 text-lg outline-none transition-all ${
                  darkMode
                    ? 'border-white bg-zinc-800 text-white'
                    : 'border-black'
                }`}
                value={titleInputFocused ? titleToBeEdited : action?.title}
                onChange={(e) => setTitleToBeEdited(e.target.value)}
                onFocus={() => {
                  setTitleInputFocused(true)
                }}
              />
              <div className="mr-5 mt-7 flex w-10/12 justify-between">
                <h1 className={`text-lg ${darkMode ? 'text-white' : ''} `}>
                  Projetos
                </h1>
                <h1 className={` text-lg ${darkMode ? 'text-white' : ''} `}>
                  TASK ID
                </h1>
                <h1
                  className={`mr-16 pr-10 text-lg ${
                    darkMode ? 'text-white' : ''
                  } `}
                >
                  Área
                </h1>
              </div>
              <div className="flex w-10/12 justify-between">
                <select
                  className={`mt-3 w-1/5 rounded-md border text-center ${
                    darkMode
                      ? 'border-white bg-zinc-800 text-white'
                      : 'border-black'
                  }`}
                >
                  <option defaultValue={action?.projectCode}>
                    {action?.projectCode}
                  </option>
                </select>
                <input
                  type="text"
                  className={` mt-3 w-1/5 rounded-md border bg-none text-center text-lg outline-none transition-all ${
                    darkMode
                      ? 'border-white bg-zinc-800 text-white'
                      : 'border-black'
                  }`}
                  value={
                    taskIdInputFocused ? taskIdToBeEdited : action?.storyId
                  }
                  onChange={(e) => setTaskIdToBeEdited(e.target.value)}
                  onFocus={() => {
                    setTaskIdInputFocused(true)
                  }}
                />
                <select
                  className={`mr-1 mt-3 w-1/5 rounded-md border text-center ${
                    darkMode
                      ? 'border-white bg-zinc-800 text-white'
                      : 'border-black'
                  }`}
                >
                  <option defaultValue={action?.stackTags}>
                    {action?.stackTags}
                  </option>
                </select>
              </div>
            </div>
            <div className="w-2/12"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
