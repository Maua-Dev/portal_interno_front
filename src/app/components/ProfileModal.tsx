import { useState, useEffect } from 'react'
import { useDarkMode } from '../hooks/useDarkMode'
import { useMember } from '../hooks/useMember'
import { raFormatterFromJson } from '../utils/functions/formatters'
import { Avatar } from './Avatar'
import { Separator } from './Separator'

export function ProfileModal() {
  const { darkMode } = useDarkMode()
  const { member } = useMember()
  const [fade, setFade] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setFade(true)
    }, 100)
  }, [])
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 px-8 py-20 lg:ml-28 lg:h-screen lg:flex-row lg:pr-8">
      <div
        className={`flex h-full w-full flex-col gap-6 rounded-2xl p-6 transition-all duration-500 lg:mt-0 lg:w-[70%] ${
          darkMode ? 'bg-skin-secundary text-white' : 'bg-white'
        } ${fade ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
      >
        <h1 className="text-2xl font-bold sm:text-3xl">Resumo do seu perfil</h1>
        <div className="mt-2 flex h-auto w-full flex-col items-start gap-6 sm:flex-row">
          <Avatar
            name={member?.name || ''}
            className="flex h-28 w-28 items-center justify-center self-center rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-2xl font-bold text-white sm:self-start"
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
          <p className="text-lg">
            <b>Horas totais: </b>{' '}
            {member?.hoursWorked ? member?.hoursWorked / 1000 / 60 / 60 : 0}{' '}
            hora
            {member?.hoursWorked && member?.hoursWorked / 1000 / 60 / 60 > 1
              ? 's'
              : ''}
          </p>
        </div>
        <Separator />
        <h2 className="text-2xl font-bold">Sobre mim</h2>
        <textarea
          readOnly
          className={`h-full min-h-24 resize-none rounded-xl sm:text-justify lg:min-h-0 ${
            darkMode ? 'bg-gray-800' : 'bg-gray-100'
          } p-3 outline-none`}
          value={`Meu nome é ${member?.name}, sou do curso de ${member?.course} do ${member?.year}º ano. Atualmente estou na área de ${member?.stack}. Estou empolgado para aprender mais sobre ${member?.stack} e me tornar um desenvolvedor melhor.
          `}
        />
      </div>
      <div className="flex h-full w-full flex-col gap-4 lg:w-[30%]">
        <div
          className={`flex h-1/2 w-full flex-col gap-2 rounded-2xl p-6 transition-all delay-200 duration-700 ${
            darkMode ? 'bg-skin-secundary text-white' : 'bg-white'
          } ${fade ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
        >
          <h1 className="text-3xl font-bold">Projeto atual</h1>
          <p className="text-lg">Em elaboração</p>
        </div>
        <div
          className={`flex h-1/2 w-full flex-col gap-2 rounded-2xl p-6 transition-all delay-300 duration-1000 ${
            darkMode ? 'bg-skin-secundary text-white' : 'bg-white'
          } ${fade ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
        >
          <h1 className="text-3xl font-bold">Gráfico de horas</h1>
          <p className="text-lg">Em elaboração</p>
        </div>
      </div>
    </div>
  )
}
