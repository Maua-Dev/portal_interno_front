import { useDarkMode } from '../hooks/useDarkMode'
import { useMember } from '../hooks/useMember'

export function OnHoldModal() {
  const { darkMode } = useDarkMode()
  const { handleLogout } = useMember()
  return (
    <div className="absolute left-0 top-0 z-[50] flex h-full w-full items-center justify-center">
      <div className="absolute z-[60] h-full w-full bg-black/80"></div>
      <div
        className={`z-[70] flex w-2/3 max-w-xl flex-col items-center justify-between gap-12 rounded-lg p-6 sm:w-1/2 sm:gap-6 ${
          darkMode
            ? 'sm:bg-dev-gray sm:shadow-[1px_1px_0px_9px_rgba(255,255,255,0.34)]'
            : 'bg-white shadow-[1px_1px_0px_9px_rgba(176,173,173,0.74)]'
        }`}
      >
        <p className={`w-full ${darkMode ? 'text-white' : 'text-black'}`}>
          Para acessar o Portal Interno é necessário passar pela aprovação do
          Administrador. Aguarde o contato.
        </p>

        <button
          onClick={handleLogout}
          className="min-w-24 rounded-md bg-gradient-to-r from-red-400 to-blue-600 py-[2px] text-lg font-bold text-white"
        >
          sair
        </button>
      </div>
    </div>
  )
}
