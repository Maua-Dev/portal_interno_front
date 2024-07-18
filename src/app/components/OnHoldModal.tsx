import { useDarkMode } from '../hooks/useDarkMode'

export function OnHoldModal() {
  const { darkMode } = useDarkMode()
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="absolute z-50 h-full w-full bg-black/80"></div>
      <div
        className={`z-[60] flex w-2/3 max-w-xl flex-col items-center justify-between gap-12 rounded-lg p-6 sm:w-1/2 sm:gap-6 ${
          darkMode
            ? 'sm:bg-dev-gray sm:shadow-[1px_1px_0px_9px_rgba(255,255,255,0.34)]'
            : 'bg-white shadow-[1px_1px_0px_9px_rgba(176,173,173,0.74)]'
        }`}
      >
        <p className={`w-full ${darkMode ? 'text-white' : 'text-black'}`}>
          Para acessar o Portal Interno é necessário passar pela aprovação do
          Administrador. Aguarde o contato.
        </p>
      </div>
    </div>
  )
}
