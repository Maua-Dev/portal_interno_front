import useDarkMode from '../utils/functions/useDarkMode'
import { Action } from '../../@clean/shared/domain/entities/action'

export default function ActionModal({ action }: { action?: Action }) {
  const { darkMode } = useDarkMode()
  return (
    <div className="ml-14 flex h-screen w-full items-center justify-center">
      <div
        className={`h-4/5 w-4/5 rounded-2xl ${
          darkMode ? 'bg-dev-gray' : 'bg-white'
        }`}
      >
        <p>oi</p>
      </div>
    </div>
  )
}
