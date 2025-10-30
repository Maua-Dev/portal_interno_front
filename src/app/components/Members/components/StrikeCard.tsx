import { useState } from 'react'
import { useDarkMode } from '../../../hooks/useDarkMode'

interface SrikeCardProps {
  onConfirm: (data: { reason: string; comment: string; date: string }) => void
  onCancel: () => void
  memberName: string
  isSubmitting: boolean
}

export default function StrikeCard({
  onConfirm,
  onCancel,
  memberName,
  isSubmitting
}: SrikeCardProps) {
  const [reason, setReason] = useState('')
  const [comment, setComment] = useState('')
  const currentDate = new Date().toLocaleDateString()
  const { darkMode } = useDarkMode()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-black">
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          darkMode
            ? 'bg-black bg-opacity-70 text-white'
            : 'bg-black bg-opacity-50 text-black'
        }`}
      >
        <div
          className={`rounded p-6 shadow-lg ${
            darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
          }`}
        >
          <h2 className="text-lg font-bold">Confirmar Strike</h2>
          <p>Deseja realmente dar um strike para {memberName}?</p>

          {/* Campo para motivo */}
          <div className="pt-4">
            <label className="block text-sm font-medium">Motivo</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className={`mt-1 w-full rounded px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                darkMode
                  ? 'border-gray-600 bg-gray-700 text-white'
                  : 'border-gray-300 bg-gray-100 text-black'
              }`}
              placeholder="Digite o motivo do strike"
            />
          </div>

          {/* Campo para data */}
          <div className="pt-4">
            <label className="block text-sm font-medium">Data</label>
            <input
              type="text"
              value={currentDate}
              disabled
              className={`mt-1 w-full rounded px-3 py-2 shadow-sm ${
                darkMode
                  ? 'border-gray-600 bg-gray-700 text-white'
                  : 'border-gray-300 bg-gray-100 text-black'
              }`}
            />
          </div>

          {/* Campo para comentário */}
          <div className="pt-4">
            <label className="block text-sm font-medium">Comentário</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={`mt-1 w-full rounded px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                darkMode
                  ? 'border-gray-600 bg-gray-700 text-white'
                  : 'border-gray-300 bg-gray-100 text-black'
              }`}
              placeholder="Adicione um comentário (opcional)"
            />
          </div>

          {/* Botões de ação */}
          <div className="mt-4 flex gap-2">
            <button
              className={`rounded px-4 py-2 shadow ${
                darkMode ? 'bg-black text-white' : 'bg-black text-white'
              }`}
              onClick={() => onConfirm({ reason, comment, date: currentDate })}
              disabled={isSubmitting || !reason}
            >
              Confirmar
              {isSubmitting ? 'Confirmando...' : 'Confirmar'} {/* MODIFICADO */}
            </button>
            <button
              className={`rounded px-4 py-2 shadow ${
                darkMode ? 'bg-black text-white' : 'bg-black text-white'
              }`}
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
