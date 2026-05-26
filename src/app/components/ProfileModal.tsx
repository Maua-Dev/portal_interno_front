import { useState, useEffect } from 'react'
import { useDarkMode } from '../hooks/useDarkMode'
import { useMember } from '../hooks/useMember'
import { raFormatterFromJson } from '../utils/functions/formatters'
import { Avatar } from './Avatar'
import { Separator } from './Separator'
import { FaRegClock } from 'react-icons/fa6'
import { millisecondsToHours } from '../utils/functions/timeStamp'
import { AiFillStar } from 'react-icons/ai'

import { Strike } from '../../@clean/shared/domain/entities/strike'
import StrikeCard from './Members/components/StrikeCard'
import type { StrikeData } from './Members/components/StrikeCard'
import { toast } from 'react-toastify'

export function ProfileModal() {
  const { darkMode } = useDarkMode()
  const { member, getStrike } = useMember()
  const [fade, setFade] = useState(false)
  const [currentStrikes, setCurrentStrikes] = useState(member?.strikes || 0)
  const [strikes, setStrikes] = useState<Strike[]>([])
  const [isLoadingStrikes, setIsLoadingStrikes] = useState(false)
  const [showStrikeCard, setShowStrikeCard] = useState(false)
  const [selectedStrikeToView, setSelectedStrikeToView] =
    useState<StrikeData | null>(null)

  const fetchStrikes = async () => {
    if (!member) return
    try {
      const memberStrikes: Strike[] = []

      if (member.strikesId && member.strikesId.length > 0) {
        setIsLoadingStrikes(true)
        const fetchPromises = member.strikesId.map((id) =>
          getStrike(id).catch((err) => {
            console.error(`Error fetching individual strike ${id}:`, err)
            return null
          })
        )
        const results = await Promise.all(fetchPromises)
        results.forEach((s) => {
          if (s) memberStrikes.push(s)
        })
      }

      memberStrikes.sort((a, b) => a.occurredDate - b.occurredDate)

      setStrikes(memberStrikes)
      setCurrentStrikes(memberStrikes.length || member.strikes || 0)
    } catch (err: any) {
      console.error('Erro ao buscar strikes na fetchStrikes:', err)
      setCurrentStrikes(member?.strikes || 0)
    } finally {
      setIsLoadingStrikes(false)
    }
  }

  useEffect(() => {
    fetchStrikes()
  }, [member?.userId])

  useEffect(() => {
    setTimeout(() => {
      setFade(true)
    }, 100)
  }, [])

  function handleStarClick(index: number) {
    if (isLoadingStrikes) {
      toast.info('Carregando informações, aguarde um instante...', {
        position: 'top-right',
        autoClose: 2000
      })
      return
    }

    if (index < currentStrikes) {
      const strikeToView = strikes[index]
      if (!strikeToView) {
        toast.info(
          'Carregando detalhes do strike... Tente novamente em um instante.',
          {
            position: 'top-right',
            autoClose: 2000
          }
        )
        return
      }

      setSelectedStrikeToView({
        strikeId: strikeToView.strikeId,
        reason: strikeToView.category,
        comment: strikeToView.description,
        date: strikeToView.occurredDate
      })
      setShowStrikeCard(true)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col justify-center gap-5 px-8 py-24 lg:ml-28 lg:h-auto lg:flex-row lg:pr-8">
      <div
        className={`flex h-full w-full flex-col gap-6 rounded-2xl p-6 transition-all duration-500 lg:mt-0 lg:w-[70%] ${
          darkMode ? 'bg-skin-secundary text-white' : 'bg-white'
        } ${fade ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
      >
        <h1 className="text-2xl font-bold sm:text-3xl">Resumo do seu perfil</h1>
        <div className="mt-2 flex h-auto w-full flex-col items-start gap-6 sm:flex-row">
          <Avatar
            isEditable
            member={member}
            className="h-28 w-28 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-2xl font-bold text-white sm:self-start"
          />
          <div className="flex h-full flex-col justify-around gap-1">
            <h1 className="text-xl font-bold sm:text-2xl">{member?.name}</h1>

            <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-3">
              <p className="text-lg">
                <b>RA:</b> {member?.ra && raFormatterFromJson(member?.ra)}
              </p>
              <p className="text-lg">
                <b>Curso:</b> {member?.course}
              </p>
              <p className="text-lg">
                <b>Ano:</b> {member?.year}º
              </p>
              <p className="text-lg">
                <b>Status:</b> {member?.active}
              </p>
            </div>
          </div>
        </div>
        <Separator />
        <h2 className="text-2xl font-bold">Informações da Dev</h2>
        <div className="flex flex-col gap-1">
          <p className="text-lg">
            <b>E-mail:</b> {member?.emailDev}
          </p>
          <p className="text-lg">
            <b>Área: </b>
            {member?.stack
              ? member?.stack.charAt(0).toUpperCase() +
                member?.stack.toLowerCase().slice(1)
              : ''}
          </p>
          <p className="text-lg">
            <b>Data de entrada: </b>
            {member?.hiredDate &&
              new Date(member?.hiredDate).toLocaleDateString()}
          </p>
        </div>
        {/* <Separator /> */}
        {/* <h2 className="text-2xl font-bold">Sobre mim</h2>
        <textarea
          readOnly
          className={`h-full min-h-24 resize-none rounded-xl sm:text-justify lg:min-h-0 ${
            darkMode ? 'bg-gray-800' : 'bg-gray-100'
          } p-3 outline-none`}
          value={`Meu nome é ${member?.name}, sou do curso de ${member?.course} do ${member?.year}º ano. Atualmente estou na área de ${member?.stack}. Estou empolgado para aprender mais sobre ${member?.stack} e me tornar um desenvolvedor melhor.
          `}
        /> */}
      </div>
      <div className="flex h-full w-full flex-col gap-4 lg:w-[30%]">
        <div
          className={`flex h-1/3 min-h-40 w-full flex-col items-center gap-6 rounded-2xl p-6 transition-all delay-200 duration-700 ${
            darkMode ? 'bg-skin-secundary text-white' : 'bg-white'
          } ${fade ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
        >
          <h1 className="flex w-full justify-start text-3xl font-bold">
            Horas totais
          </h1>

          <div className="flex h-full items-center justify-center gap-4 text-3xl md:text-4xl">
            <FaRegClock />
            <p>
              {millisecondsToHours(member?.hoursWorked || 0)} hora
              {member?.hoursWorked && member?.hoursWorked / 1000 / 60 / 60 > 1
                ? 's'
                : ''}
            </p>
          </div>
        </div>
        <div
          className={`flex h-1/3 min-h-40 w-full flex-col items-center gap-6 rounded-2xl p-6 transition-all delay-200 duration-700 ${
            darkMode ? 'bg-skin-secundary text-white' : 'bg-white'
          } ${fade ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
        >
          <h1 className="flex w-full justify-start text-3xl font-bold">
            Strikes
          </h1>
          {/* Enzo, aqui é uma das telas que vai ter q mexer  */}
          <div className="flex h-full items-center justify-center gap-4 text-3xl">
            {/* member?.strikes_allowed define o número TOTAL de estrelas */}
            {Array.from({ length: member?.strikes_allowed || 0 }).map(
              (_, i) => (
                <AiFillStar
                  key={i}
                  onClick={() => handleStarClick(i)}
                  className={`text-4xl transition-colors ${
                    i < currentStrikes
                      ? 'cursor-pointer text-yellow-400 hover:text-yellow-500'
                      : 'text-gray-400'
                  }`}
                />
              )
            )}
            {/* {activeStrikes.map((active, i) => (
              <AiFillStar
                key={i}
                className={`cursor-pointer text-4xl transition-colors ${
                  active ? 'text-yellow-400' : 'text-gray-400'
                }`}
                onClick={() =>
                  setActiveStrikes((prev) =>
                    prev.map((on, idx) => (idx === i ? !on : on))
                  )
                }
              />
            ))} */}
          </div>
        </div>
      </div>
      {showStrikeCard && (
        <StrikeCard
          onConfirm={() => {}}
          onCancel={() => setShowStrikeCard(false)}
          memberName={member?.name || ''}
          isSubmitting={false}
          initialData={selectedStrikeToView}
          readOnly={true}
        />
      )}
    </div>
  )
}
