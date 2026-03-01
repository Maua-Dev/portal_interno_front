import { useEffect, useState } from 'react'
import { Member } from '../../../../@clean/shared/domain/entities/member'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { useDarkMode } from '../../../hooks/useDarkMode'
import Button from '../../Historic/components/Button'
import { millisecondsToHours } from '../../../utils/functions/timeStamp'
//import { date } from 'zod'
import { AiFillStar } from 'react-icons/ai'
import StrikeCard from '../components/StrikeCard'
import { useMember } from '../../../hooks/useMember'
import { Strike } from '../../../../@clean/shared/domain/entities/strike'
import { STRIKE_CATEGORY } from '../../../../@clean/shared/domain/enums/strike_category_enum'
import { toast } from 'react-toastify'

export interface StrikeData {
  strikeId?: string
  reason: STRIKE_CATEGORY
  comment: string
  date: number
  applierName?: string
}

interface MemberDialogProps {
  member: Member
  children: React.ReactNode
}

export default function MemberDialog({ member, children }: MemberDialogProps) {
  const [open, setOpen] = useState(false)
  const [formDisabled, setFormDisabled] = useState(true)
  const { darkMode } = useDarkMode()

  const nameArray = member.name.split(' ')
  const FIRST_NAME = nameArray[0]
  const LAST_NAME = nameArray[nameArray.length - 1]

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [showStrikeCard, setShowStrikeCard] = useState(false)

  const [currentStrikes, setCurrentStrikes] = useState(member.strikes || 0)

  const [isReadOnly, setIsReadOnly] = useState(false)

  // conexão com o backend
  const { createStrike, deleteStrike, getStrike, member: loggedInUser, allMembers, handleMember } = useMember()

  const [strikes, setStrikes] = useState<Strike[]>([])
  const [isLoadingStrikes, setIsLoadingStrikes] = useState(false)

  // Importar getStrike
  const [selectedStrikeToView, setSelectedStrikeToView] =
    useState<StrikeData | null>(null)

  const fetchStrikes = async () => {
    try {
      console.log('Fetching strikes for member:', member.userId, 'Expected strikesId list:', member.strikesId)
      
      const memberStrikes: Strike[] = []
      
      if (member.strikesId && member.strikesId.length > 0) {
        setIsLoadingStrikes(true)
        const fetchPromises = member.strikesId.map(id => 
          getStrike(id).catch(err => {
            console.error(`Error fetching individual strike ${id}:`, err)
            return null
          })
        )
        const results = await Promise.all(fetchPromises)
        results.forEach(s => {
          if (s) memberStrikes.push(s)
        })
      }

      memberStrikes.sort((a, b) => a.occurredDate - b.occurredDate)

      setStrikes(memberStrikes)
      setCurrentStrikes(memberStrikes.length || member.strikes || 0)
      console.log('Final strikes loaded:', memberStrikes.length)
    } catch (err: any) {
      console.error('Erro ao buscar strikes na fetchStrikes:', err)
      // Mantemos o currentStrikes do objeto member mesmo se a busca falhar
      setCurrentStrikes(member.strikes || 0)
    } finally {
      setIsLoadingStrikes(false)
    }
  }

  useEffect(() => {
    if (!open) return
    fetchStrikes()
  }, [open, member.userId]) // Removido getAllStrikes e getStrike da dependência para evitar loops se mudarem

  const handleConfirmStrike = async (data: {
    reason: STRIKE_CATEGORY
    comment: string
    date: string
  }) => {
    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      if (!loggedInUser?.userId) throw new Error('Owner ID not found')

      const newStrikeDetails = await createStrike(
        member.userId,
        data.reason,
        data.comment,
        Date.now(),
        loggedInUser.userId
      )

      toast.success('Strike aplicado com sucesso!', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })

      // Fetch the newly created strike immediately
      if (newStrikeDetails && newStrikeDetails.strike_id) {
        try {
          const freshStrike = await getStrike(newStrikeDetails.strike_id)
          const updatedStrikes = [...strikes, freshStrike].sort((a, b) => a.occurredDate - b.occurredDate)
          setStrikes(updatedStrikes)
          setCurrentStrikes(updatedStrikes.length)
        } catch (err) {
            console.error('Error fetching newly created strike', err)
            // fallback caching
            setCurrentStrikes(currentStrikes + 1)
        }
      } else {
        // Fallback if strikeId is not in return value properly or just missing
        setCurrentStrikes(currentStrikes + 1)
      }
      
      // Update the member's global profile
      await handleMember()

      setShowStrikeCard(false)
    } catch (error) {
      console.error('Falha ao criar strike', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleStarClick(index: number) {
    if (isLoadingStrikes) {
      toast.info('Carregando informações, aguarde um instante...', {
        position: 'top-right',
        autoClose: 2000
      })
      return
    }
    console.log('Star clicked:', index, 'Current strikes:', currentStrikes, 'Loaded strikes:', strikes.length)
    if (index < currentStrikes) {
      const strikeToView = strikes[index]
      if (!strikeToView) {
        toast.info('Carregando detalhes do strike... Tente novamente em um instante.', {
          position: 'top-right',
          autoClose: 2000
        })
        console.warn('Strike data not found for index:', index)
        return
      }
      let applierName = 'Desconhecido'
      if (strikeToView.ownerUserId === loggedInUser?.userId) {
        applierName = loggedInUser?.name || 'Desconhecido'
      } else {
        const applier = allMembers?.find((m) => m.userId === strikeToView.ownerUserId)
        if (applier) applierName = applier.name
      }

      setSelectedStrikeToView({
        strikeId: strikeToView.strikeId,
        reason: strikeToView.category,
        comment: strikeToView.description,
        date: strikeToView.occurredDate,
        applierName
      })
      setIsReadOnly(true)
      setShowStrikeCard(true)
      return
    }

    // Se clicou em uma estrela vazia, abre para criar um novo strike
    setSelectedStrikeToView(null)
    setIsReadOnly(false)
    setShowStrikeCard(true)
  }

  async function handleDeleteStrike(strikeId: string) {
    setIsSubmitting(true)
    try {
      await deleteStrike(strikeId)
      toast.success('Strike removido com sucesso!', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })

      // Recarrega strikes após deletar omitindo o strike que foi salvo localmente
      const updatedStrikes = strikes.filter((strike) => strike.strikeId !== strikeId)

      setStrikes(updatedStrikes)
      setCurrentStrikes(updatedStrikes.length)
      
      // update user locally regarding backend values
      await handleMember()
      
      setShowStrikeCard(false)
    } catch (error: any) {
      toast.error('Erro ao remover strike: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

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
          <DialogPrimitive.Title className="sr-only">
            Detalhes do Membro: {member.name}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Visualize e edite as informações do membro {member.name} e gerencie seus strikes.
          </DialogPrimitive.Description>
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
            <div className="flex flex-col justify-center">
              <div className="flex items-center pr-2">
                <h1 className="font-semi-bold text-lg">Strikes</h1>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: member.strikes_allowed || 0 }).map((_, i) => (
                  <AiFillStar
                    key={i}
                    className={`text-2xl transition-colors ${
                      i < currentStrikes
                        ? 'cursor-pointer text-yellow-400 hover:text-yellow-500' // Estrela Cheia
                        : 'cursor-pointer text-gray-400 hover:text-yellow-300' // Estrela Vazia
                    }`}
                    onClick={() => handleStarClick(i)}
                  />
                ))}
              </div>
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
              onConfirm={handleConfirmStrike}
              onCancel={() => setShowStrikeCard(false)}
              onDelete={handleDeleteStrike}
              memberName={`${FIRST_NAME} ${LAST_NAME}`}
              isSubmitting={isSubmitting}
              initialData={selectedStrikeToView}
              readOnly={isReadOnly}
            />
          )}
        </DialogPrimitive.DialogContent>
      </DialogPrimitive.Root>
    </div>
  )

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
}
