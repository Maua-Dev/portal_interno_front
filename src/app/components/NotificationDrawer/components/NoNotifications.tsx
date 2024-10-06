import { BellOff } from 'lucide-react'

export default function NoNotifications() {
  return (
    <div className="mt-36 flex h-full w-full justify-center pt-20">
      <div className="flex flex-col items-center gap-3 text-gray-500">
        <BellOff size={48} className="text-gray-400" />
        <p className="text-lg font-semibold">Você está atualizado!</p>
        <p className="text-sm">Sem novas notificações por enquanto.</p>
      </div>
    </div>
  )
}
