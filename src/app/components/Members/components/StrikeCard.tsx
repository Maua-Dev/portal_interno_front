import { useState, useEffect } from 'react'
import { useDarkMode } from '../../../hooks/useDarkMode'
import {
  STRIKE_CATEGORY,
  strikeCategoryToPortuguese
} from '../../../../@clean/shared/domain/enums/strike_category_enum'

export interface StrikeData {
  reason: STRIKE_CATEGORY
  comment: string
  date: number
}

interface SrikeCardProps {
  onConfirm: (data: {
    reason: STRIKE_CATEGORY
    comment: string
    date: string
  }) => void
  onCancel: () => void
  memberName: string
  isSubmitting: boolean
  // NOVAS PROPS:
  initialData?: StrikeData | null // <-- Recebe os dados para visualização
  readOnly?: boolean // <-- Define se é apenas leitura
}

export default function StrikeCard({
  onConfirm,
  onCancel,
  memberName,
  isSubmitting,
  initialData, // <-- Recebendo a prop
  readOnly = false // <-- Recebendo a prop (padrão false)
}: SrikeCardProps) {
  // const [reason, setReason] = useState('')
  // const [comment, setComment] = useState('')
  const [reason, setReason] = useState(
    initialData?.reason || STRIKE_CATEGORY.MISCONDUCT
  )
  const [comment, setComment] = useState(initialData?.comment || '')
  // const currentDate = new Date().toLocaleDateString()
  const displayDate = initialData
    ? new Date(initialData.date).toLocaleDateString()
    : new Date().toLocaleDateString()
  const { darkMode } = useDarkMode()

  useEffect(() => {
    if (initialData) {
      setReason(initialData.reason)
      setComment(initialData.comment)
    }
  }, [initialData])

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
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value as STRIKE_CATEGORY)}
              disabled={readOnly || isSubmitting}
              className={`mt-1 w-full rounded px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                darkMode
                  ? 'border-gray-600 bg-gray-700 text-white'
                  : 'border-gray-300 bg-gray-100 text-black'
              } ${readOnly ? 'cursor-not-allowed opacity-75' : ''}`}
            >
              {Object.values(STRIKE_CATEGORY).map((category) => (
                <option
                  key={category}
                  value={category}
                  className={darkMode ? 'bg-gray-700' : 'bg-white'}
                >
                  {strikeCategoryToPortuguese(category as STRIKE_CATEGORY)}
                </option>
              ))}
            </select>
          </div>

          {/* Campo para data */}
          <div className="pt-4">
            <label className="block text-sm font-medium">Data</label>
            <input
              type="text"
              value={displayDate}
              disabled
              className={`mt-1 w-full rounded px-3 py-2 shadow-sm ${
                darkMode
                  ? 'border-gray-600 bg-gray-700 text-white'
                  : 'border-gray-300 bg-gray-100 text-black'
              } cursor-not-allowed opacity-75`}
            />
          </div>

          {/* Campo para comentário */}
          <div className="pt-4">
            <label className="block text-sm font-medium">Comentário</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={readOnly || isSubmitting}
              className={`mt-1 w-full rounded px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                darkMode
                  ? 'border-gray-600 bg-gray-700 text-white'
                  : 'border-gray-300 bg-gray-100 text-black'
              } ${readOnly ? 'cursor-not-allowed opacity-75' : ''}`}
              placeholder="Adicione um comentário (opcional)"
            />
          </div>

          {/* Botões de ação */}
          <div className="mt-4 flex gap-2">
            {!readOnly && (
              <button
                className={`rounded px-4 py-2 shadow ${
                  darkMode ? 'bg-black text-white' : 'bg-black text-white'
                }`}
                onClick={() => onConfirm({ reason, comment, date: displayDate })}
                disabled={isSubmitting || !reason}
              >
                {isSubmitting ? 'Confirmando...' : 'Confirmar'}
              </button>
            )}
            <button
              className={`rounded px-4 py-2 shadow ${
                darkMode ? 'bg-black text-white' : 'bg-black text-white'
              }`}
              onClick={onCancel}
              disabled={isSubmitting}
            >
              {readOnly ? 'Fechar' : 'Cancelar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
