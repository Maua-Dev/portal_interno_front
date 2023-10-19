import logo from '../assets/logo_dev.png'
import { BiSolidUser } from 'react-icons/bi'
import { AiOutlineHistory, AiOutlineDoubleRight } from 'react-icons/ai'
import { BsFillPlusSquareFill, BsMoonStars, BsSun } from 'react-icons/bs'
import { useState } from 'react'

export default function Navbar() {
  const [hover, setHover] = useState<boolean>(false)
  const [darkMode, setDarkMode] = useState<boolean>(false)

  return (
    <div
      className={`fixed z-40 flex h-screen transform flex-col items-center justify-between gap-12 overflow-x-hidden bg-white px-4 py-10 drop-shadow-md transition-all duration-200 ease-in-out ${
        hover ? 'w-56' : 'w-28'
      }`}
    >
      <div className="flex flex-col items-center gap-12">
        <img
          src={logo}
          alt="Logo da Dev. Community Mauá"
          className="h-14 w-16"
        />
        <div className="flex flex-col gap-8 font-sans text-3xl">
          <div className="flex cursor-pointer select-none gap-8 overflow-x-hidden">
            <BiSolidUser
              className={`transform cursor-pointer fill-gray-700 transition-all duration-100 ${
                hover ? '-translate-x-0' : 'translate-x-0'
              } hover:fill-blue-600`}
            />
            <p
              className={`transform text-xl transition-all duration-200 ${
                hover
                  ? 'relative translate-x-0 opacity-100 delay-[50ms]'
                  : 'absolute left-32 translate-x-32 opacity-0'
              }`}
            >
              Perfil
            </p>
          </div>
          <div className="flex cursor-pointer select-none gap-8 overflow-x-hidden">
            <BsFillPlusSquareFill
              className={`transform cursor-pointer fill-gray-700 transition-all duration-100 ${
                hover ? '-translate-x-0' : 'translate-x-0'
              } hover:fill-blue-600`}
            />
            <p
              className={`transform text-xl transition-all duration-200 ${
                hover
                  ? 'relative translate-x-0 opacity-100 delay-[100ms]'
                  : 'absolute left-32 translate-x-32 opacity-0'
              }`}
            >
              Tarefa
            </p>
          </div>
          <div className="flex cursor-pointer select-none gap-8 overflow-x-hidden">
            <AiOutlineHistory
              className={`transform cursor-pointer fill-gray-700 transition-all duration-100 ${
                hover ? '-translate-x-0' : 'translate-x-0'
              } hover:fill-blue-600`}
            />
            <p
              className={`transform text-xl transition-all duration-200 ${
                hover
                  ? 'relative translate-x-0 opacity-100 delay-[150ms]'
                  : 'absolute left-40 translate-x-32 opacity-0'
              }`}
            >
              Histórico
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 text-2xl">
        {darkMode ? (
          <BsSun
            className="cursor-pointer"
            onClick={() => setDarkMode(!darkMode)}
          />
        ) : (
          <BsMoonStars
            className="cursor-pointer"
            onClick={() => setDarkMode(!darkMode)}
          />
        )}
        <AiOutlineDoubleRight
          onClick={() => setHover(!hover)}
          className={`cursor-pointer transition-all duration-300 ${
            hover ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </div>
    </div>
  )
}
