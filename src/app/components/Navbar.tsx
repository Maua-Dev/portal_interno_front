import logo from '../assets/logo_dev.png'
import logo_white from '../assets/logo_dev_white.png'
import { BiSolidUser } from 'react-icons/bi'
import { AiOutlineHistory, AiOutlineDoubleRight } from 'react-icons/ai'
import {
  BsFillPlusSquareFill,
  BsMoonStars,
  BsSun,
  BsClipboard
} from 'react-icons/bs'
import { useEffect, useState } from 'react'
import useDarkMode from '../utils/functions/useDarkMode'

interface window {
  innerWidth: number
  innerHeight: number
}

export default function Navbar() {
  const [hover, setHover] = useState<boolean>(false)
  const { darkMode, toggleDarkMode } = useDarkMode()
  const [windowSize, setWindowSize] = useState<window>(getWindowSize())
  const maximumWidth: number = 768

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize())
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  function getWindowSize() {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }

  return (
    <div>
      {windowSize.innerWidth > maximumWidth ? (
        <div
          className={`fixed z-40 flex h-screen transform flex-col items-center justify-between  gap-12 overflow-x-hidden px-4 py-10 transition-all  duration-200 ease-in-out ${
            !darkMode
              ? 'bg-white drop-shadow-md'
              : 'border-r-2 border-white bg-black text-white'
          } ${hover ? 'w-56' : 'w-28'}`}
        >
          <div className="flex flex-col items-center gap-12">
            <img
              src={darkMode ? logo_white : logo}
              alt="Logo da Dev. Community Mauá"
              className="h-14 w-16"
            />
            <div className="flex flex-col gap-8 font-sans text-3xl">
              <div className="flex cursor-pointer select-none gap-8 overflow-x-hidden">
                <BiSolidUser
                  className={`transform cursor-pointer ${
                    !darkMode ? 'text-gray-700' : 'text-white'
                  } transition-all duration-100 ${
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
                  className={`transform cursor-pointer ${
                    !darkMode ? 'text-gray-700' : 'text-white'
                  } transition-all duration-100 ${
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
                  className={`transform cursor-pointer ${
                    !darkMode ? 'text-gray-700' : 'text-white'
                  } transition-all duration-100 ${
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
            {!darkMode ? (
              <BsMoonStars
                className="cursor-pointer text-gray-700 transition-all duration-100 hover:text-black"
                onClick={toggleDarkMode}
              />
            ) : (
              <BsSun className="cursor-pointer" onClick={toggleDarkMode} />
            )}
            <AiOutlineDoubleRight
              onClick={() => setHover(!hover)}
              className={`cursor-pointer transition-all duration-300 ${
                hover ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </div>
        </div>
      ) : (
        <div className="fixed z-40 flex h-screen w-screen flex-col justify-between">
          <div
            className={`flex justify-center py-2 ${
              darkMode
                ? 'border-b-2 border-white bg-black'
                : 'bg-white drop-shadow-md'
            }`}
          >
            <img
              src={darkMode ? logo_white : logo}
              alt="Logo da Dev. Community Mauá"
              className="h-10 w-12"
            />
          </div>
          <div
            className={`flex justify-center py-4 text-3xl ${
              darkMode
                ? 'border-t-2 border-white bg-black'
                : 'bg-white drop-shadow-md'
            }`}
          >
            <div className="flex gap-8">
              <BiSolidUser
                className={`transform cursor-pointer ${
                  !darkMode ? 'text-gray-700' : 'text-white'
                } transition-all duration-100 hover:fill-blue-600`}
              />
              <BsFillPlusSquareFill
                className={`transform cursor-pointer ${
                  !darkMode ? 'text-gray-700' : 'text-white'
                } transition-all duration-100 ${
                  hover ? '-translate-x-0' : 'translate-x-0'
                } hover:fill-blue-600`}
              />
              <AiOutlineHistory
                className={`transform cursor-pointer ${
                  !darkMode ? 'text-gray-700' : 'text-white'
                } transition-all duration-100 ${
                  hover ? '-translate-x-0' : 'translate-x-0'
                } hover:fill-blue-600`}
              />
              <BsClipboard
                className={`transform cursor-pointer ${
                  !darkMode ? 'text-gray-700' : 'text-white'
                } transition-all duration-100 ${
                  hover ? '-translate-x-0' : 'translate-x-0'
                } hover:fill-blue-600`}
              />
            </div>
            <div className="absolute right-0 mt-[3px] flex items-center justify-center pr-4 text-2xl">
              {!darkMode ? (
                <BsMoonStars
                  className="cursor-pointer text-gray-700 transition-all duration-100 hover:text-black"
                  onClick={toggleDarkMode}
                />
              ) : (
                <BsSun
                  className="cursor-pointer text-white"
                  onClick={toggleDarkMode}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
