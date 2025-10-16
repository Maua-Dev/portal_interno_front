import { useEffect, useState } from 'react'
import { Member } from '../../../../@clean/shared/domain/entities/member'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { useDarkMode } from '../../../hooks/useDarkMode'
import Button from '../../Historic/components/Button'
import { millisecondsToHours } from '../../../utils/functions/timeStamp'
//import { date } from 'zod'
import { AiFillStar } from 'react-icons/ai'
import StrikeCard from '../components/StrikeCard'

interface MemberDialogProps {
  member: Member
  children: React.ReactNode
}

export default function MemberDialog({ member, children }: MemberDialogProps) {
  const [open, setOpen] = useState(false)
  const [formDisabled, setFormDisabled] = useState(true)
  const { darkMode } = useDarkMode()

  console.log(member)

  const nameArray = member.name.split(' ')
  const FIRST_NAME = nameArray[0]
  const LAST_NAME = nameArray[nameArray.length - 1]

  const [activeStrikes, setActiveStrikes] = useState(Array(5).fill(true))
  const [showToast, setShowToast] = useState(false)

  const [showStrikeCard, setShowStrikeCard] = useState(false)
  const [selectedStrikeIndex, setSelectedStrikeIndex] = useState<number | null>(
    null
  )

  return (
    <div className="static flex w-full justify-center">
      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>
        <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-black opacity-50" />
        <DialogPrimitive.DialogContent
          className={`scrollbar-hide-default fixed bottom-0 top-0 z-50 my-auto flex h-4/6 w-5/6 flex-col items-start justify-between gap-5 overflow-x-hidden overflow-y-scroll rounded-md border border-skin-muted px-4 py-10 text-skin-base outline-none sm:w-4/6 md:h-fit md:px-10 md:py-20 xl:w-6/12 xl:scrollbar-hide ${
            darkMode ? 'bg-skin-fill' : 'bg-skin-secundary'
          }`}
        >
          <div className="grid w-full grid-cols-2 gap-5">
            <div className="flex flex-col gap-1">
              {/* Name */}
              <h1 className="font-semi-bold text-lg">Nome</h1>
              <input
                type="text"
                disabled={formDisabled}
                value={FIRST_NAME}
                className={`rounded ${
                  darkMode ? 'bg-gray-600' : 'bg-gray-300'
                } ${
                  formDisabled ? 'cursor-not-allowed' : null
                } px-2 py-1 outline-none`}
              />
              <span className="text-red-600">{}</span>
            </div>
            <div className="flex flex-col gap-1">
              {/* Name */}
              <h1 className="font-semi-bold text-lg">Sobrenome</h1>
              <input
                type="text"
                disabled={formDisabled}
                value={LAST_NAME}
                className={`rounded ${
                  darkMode ? 'bg-gray-600' : 'bg-gray-300'
                } ${
                  formDisabled ? 'cursor-not-allowed' : null
                } px-2 py-1 outline-none`}
              />
              <span className="text-red-600">{}</span>
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col gap-1">
                {/* Name */}
                <h1 className="font-semi-bold text-lg">RA</h1>
                <input
                  type="text"
                  disabled={formDisabled}
                  value={member.ra}
                  className={`w-full rounded ${
                    darkMode ? 'bg-gray-600' : 'bg-gray-300'
                  } ${
                    formDisabled ? 'cursor-not-allowed' : null
                  } px-2 py-1 outline-none`}
                />
                <span className="text-red-600">{}</span>
              </div>
              <div className="flex flex-col gap-1">
                {/* Name */}
                <h1 className="font-semi-bold text-lg">ANO MAUA</h1>
                <input
                  type="text"
                  disabled={formDisabled}
                  value={member.year}
                  className={`w-full rounded ${
                    darkMode ? 'bg-gray-600' : 'bg-gray-300'
                  } ${
                    formDisabled ? 'cursor-not-allowed' : null
                  } px-2 py-1 outline-none`}
                />
                <span className="text-red-600">{}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              {/* Name */}
              <h1 className="font-semi-bold text-lg">Curso Maua</h1>
              <input
                type="text"
                disabled={formDisabled}
                value={member.course}
                className={`rounded ${
                  darkMode ? 'bg-gray-600' : 'bg-gray-300'
                } ${
                  formDisabled ? 'cursor-not-allowed' : null
                } px-2 py-1 outline-none`}
              />
              <span className="text-red-600">{}</span>
            </div>
            <div className="flex flex-col gap-1">
              {/* Name */}
              <h1 className="font-semi-bold text-lg">Email DEV</h1>
              <input
                type="text"
                disabled={formDisabled}
                value={member.email}
                className={`rounded ${
                  darkMode ? 'bg-gray-600' : 'bg-gray-300'
                } ${
                  formDisabled ? 'cursor-not-allowed' : null
                } px-2 py-1 outline-none`}
              />
              <span className="text-red-600">{}</span>
            </div>
            <div className="flex flex-col gap-1">
              {/* Name */}
              <h1 className="font-semi-bold text-lg">Projeto</h1>
              <input
                type="text"
                disabled={formDisabled}
                value={member.project}
                className={`rounded ${
                  darkMode ? 'bg-gray-600' : 'bg-gray-300'
                } ${
                  formDisabled ? 'cursor-not-allowed' : null
                } px-2 py-1 outline-none`}
              />
              <span className="text-red-600">{}</span>
            </div>
            <div className="flex flex-col gap-1">
              {/* Name */}
              <h1 className="font-semi-bold text-lg">Área da DEV</h1>
              <input
                type="text"
                disabled={formDisabled}
                value={member.stack}
                className={`rounded ${
                  darkMode ? 'bg-gray-600' : 'bg-gray-300'
                } ${
                  formDisabled ? 'cursor-not-allowed' : null
                } px-2 py-1 outline-none`}
              />
              <span className="text-red-600">{}</span>
            </div>
            <div className="flex flex-col gap-1">
              {/* Name */}
              <h1 className="font-semi-bold text-lg">Cargo</h1>
              <input
                type="text"
                disabled={formDisabled}
                value={member.role}
                className={`rounded ${
                  darkMode ? 'bg-gray-600' : 'bg-gray-300'
                } ${
                  formDisabled ? 'cursor-not-allowed' : null
                } px-2 py-1 outline-none`}
              />
              <span className="text-red-600">{}</span>
            </div>
            <div className="flex flex-col gap-1">
              {/* Name */}
              <h1 className="font-semi-bold text-lg">Data de Entrada</h1>
              <input
                type="text"
                disabled={formDisabled}
                value={new Date(member.hiredDate).toLocaleDateString()}
                className={`rounded ${
                  darkMode ? 'bg-gray-600' : 'bg-gray-300'
                } ${
                  formDisabled ? 'cursor-not-allowed' : null
                } px-2 py-1 outline-none`}
              />
              <span className="text-red-600">{}</span>
            </div>

            <div className="flex flex-col gap-1">
              {/* Name */}
              <h1 className="font-semi-bold text-lg">Horas</h1>
              <input
                type="text"
                disabled={formDisabled}
                value={millisecondsToHours(member.hoursWorked || 0)}
                className={`rounded ${
                  darkMode ? 'bg-gray-600' : 'bg-gray-300'
                } ${
                  formDisabled ? 'cursor-not-allowed' : null
                } px-2 py-1 outline-none`}
              />
              <span className="text-red-600">{}</span>
            </div>
          </div>
          <div className="flex w-full flex-row justify-end gap-96">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <AiFillStar
                  key={i}
                  className={`cursor-pointer text-2xl transition-colors ${
                    activeStrikes[i] ? 'text-yellow-400' : 'text-gray-400'
                  }`}
                  onClick={() => {
                    setSelectedStrikeIndex(i)
                    setShowStrikeCard(true)
                  }}
                />
              ))}
            </div>
            <Button
              variant="default"
              onClick={() => {
                setFormDisabled((prev) => !prev)
              }}
            >
              {formDisabled ? 'Editar' : 'Cancelar'}
            </Button>

            {!formDisabled && (
              <Button
                variant="form"
                onClick={() => {
                  setOpen(false)
                }}
              >
                Salvar
              </Button>
            )}
          </div>
          {showStrikeCard && (
            <StrikeCard
              onConfirm={() => {
                setActiveStrikes((prev) =>
                  prev.map((on, idx) =>
                    idx === selectedStrikeIndex ? !on : on
                  )
                )
                setShowStrikeCard(false) // Fecha o pop-up após confirmar
              }}
              onCancel={() => setShowStrikeCard(false)} // Fecha o pop-up sem aplicar o strike
              memberName={`${FIRST_NAME} ${LAST_NAME}`}
            />
          )}
        </DialogPrimitive.DialogContent>
      </DialogPrimitive.Root>
    </div>
  )
}

// <div className="flex flex-col gap-5">
//             <div className="flex flex-col gap-1">
//               {/* Name */}
//               <h1 className="text-lg font-semi-bold">Nome</h1>
//               <input
//                 type="text" disabled={formDisabled}
//                 className={`rounded ${
//                   darkMode ? 'bg-gray-600' : 'bg-gray-300'
//                 } px-2 py-1 outline-none ${formDisabled ? "cursor-not-allowed" : null}`}
//               />
//               <span className="text-red-600">{}</span>
//             </div>
//           </div>

//           <div>
//             <div className="flex flex-col gap-1">
//               {/* Name */}
//               <h1 className="text-lg font-semi-bold">Nome</h1>
//               <input
//                 type="text" disabled={formDisabled}
//                 className={`rounded ${
//                   darkMode ? 'bg-gray-600' : 'bg-gray-300'
//                 } px-2 py-1 outline-none ${formDisabled ? "cursor-not-allowed" : null}`}
//               />
//               <span className="text-red-600">{}</span>
//             </div>
//           </div>
