import logo from '../assets/logo_dev.png'
import logo_white from '../assets/logo_dev_white.png'
import { BiSolidUser } from 'react-icons/bi'
import { IoPeople } from 'react-icons/io5'
import { AiOutlineHistory, AiOutlineDoubleRight } from 'react-icons/ai'
import { IoMdExit } from 'react-icons/io'
import {
  BsFillPlusSquareFill,
  BsMoonStars,
  BsSun,
  BsClipboard
} from 'react-icons/bs'
import { useEffect, useState } from 'react'
import Historic from './Historic'
import ActionModal from './ActionModal'
import { useDarkMode } from '../hooks/useDarkMode'
import { useModal } from '../hooks/useModal'
import { useMember } from '../hooks/useMember'
import Projects from './Projects'
import { ProfileModal } from './ProfileModal'
import Members from './Members'

interface window {
  innerWidth: number
  innerHeight: number
}

export default function Navbar() {
  // Constant
  const maximumWidth: number = 1024

  // Hooks
  const { darkMode, toggleDarkMode } = useDarkMode()
  const { changeModalContent } = useModal()
  const { isAdmin, handleLogout, isOnHold } = useMember()

  // States
  const [hover, setHover] = useState(false)
  const [windowSize, setWindowSize] = useState<window>(getWindowSize())

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
          className={`fixed flex h-screen transform flex-col items-center justify-between gap-12 overflow-x-hidden px-4 py-10 transition-all duration-200 hover:z-40 ${
            !darkMode
              ? 'bg-white drop-shadow-md'
              : 'border-r-2 border-white bg-dev-gray text-white'
          } ${hover ? 'w-56' : 'w-28'}`}
        >
          <div className="flex flex-col items-center gap-12">
            <img
              src={darkMode ? logo_white : logo}
              alt="Logo da Dev. Community Mauá"
              className="h-14 w-16"
            />
            <div className="flex flex-col gap-8 font-sans text-3xl">
              <div
                className="flex cursor-pointer select-none gap-8 overflow-x-hidden"
                onClick={() => {
                  if (!isOnHold) changeModalContent(<ProfileModal />)
                }}
              >
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
              <div
                className="flex cursor-pointer select-none gap-8 overflow-x-hidden"
                onClick={() => {
                  if (!isOnHold) changeModalContent(<ActionModal />)
                }}
              >
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
              <div
                className="flex cursor-pointer select-none gap-8 overflow-x-hidden"
                onClick={() => {
                  if (!isOnHold) changeModalContent(<Historic />)
                }}
              >
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
              {isAdmin && (
                <>
                  <div
                    className="flex cursor-pointer select-none gap-8 overflow-x-hidden"
                    onClick={() => {
                      changeModalContent(<Projects />)
                    }}
                  >
                    <BsClipboard
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
                      Projetos
                    </p>
                  </div>
                  <div
                    onClick={() => {
                      changeModalContent(<Members />)
                    }}
                    className="flex cursor-pointer select-none gap-8 overflow-x-hidden"
                  >
                    <IoPeople
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
                      Membros
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-6 text-2xl">
            <IoMdExit
              onClick={handleLogout}
              className={`cursor-pointer ${
                darkMode ? 'text-white' : 'text-gray-700'
              } transition-all duration-100 hover:text-blue-600`}
            />
            {!darkMode ? (
              <BsMoonStars
                className="cursor-pointer text-gray-700 transition-all duration-100 hover:text-black"
                onClick={toggleDarkMode}
              />
            ) : (
              <BsSun
                className="cursor-pointer text-white transition-all duration-100 hover:text-blue-600"
                onClick={toggleDarkMode}
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
      ) : (
        <>
          <div
            className={`fixed z-40 flex w-full justify-center py-2 transition-all duration-200 ${
              darkMode
                ? 'border-b-2 border-white bg-dev-gray'
                : 'bg-white drop-shadow-md'
            }`}
          >
            <img
              src={darkMode ? logo_white : logo}
              alt="Logo da Dev. Community Mauá"
              className="h-8 w-10 select-none sm:h-10 sm:w-12"
            />
          </div>
          <div
            className={`fixed bottom-0 z-40 flex w-full justify-center py-4 text-2xl transition-all duration-200 sm:text-3xl ${
              darkMode
                ? 'border-t-2 border-white bg-dev-gray'
                : 'bg-white drop-shadow-md'
            }`}
          >
            <div className="flex gap-8">
              <BiSolidUser
                className={`transform cursor-pointer ${
                  !darkMode ? 'text-gray-700' : 'text-white'
                } transition-all duration-100 hover:fill-blue-600`}
                onClick={() => {
                  if (!isOnHold) changeModalContent(<ProfileModal />)
                }}
              />
              <BsFillPlusSquareFill
                className={`transform cursor-pointer ${
                  !darkMode ? 'text-gray-700' : 'text-white'
                } transition-all duration-100 ${
                  hover ? '-translate-x-0' : 'translate-x-0'
                } hover:fill-blue-600`}
                onClick={() => {
                  changeModalContent(<ActionModal />)
                }}
              />
              <AiOutlineHistory
                className={`transform cursor-pointer ${
                  !darkMode ? 'text-gray-700' : 'text-white'
                } transition-all duration-100 ${
                  hover ? '-translate-x-0' : 'translate-x-0'
                } hover:fill-blue-600`}
                onClick={() => {
                  changeModalContent(<Historic />)
                }}
              />
              {isAdmin && (
                <>
                  <BsClipboard
                    onClick={() => {
                      changeModalContent(<Projects />)
                    }}
                    className={`transform cursor-pointer ${
                      !darkMode ? 'text-gray-700' : 'text-white'
                    } transition-all duration-100 ${
                      hover ? '-translate-x-0' : 'translate-x-0'
                    } hover:fill-blue-600`}
                  />
                  <IoPeople
                    onClick={() => {
                      changeModalContent(<Members />)
                    }}
                    className={`transform cursor-pointer ${
                      !darkMode ? 'text-gray-700' : 'text-white'
                    } transition-all duration-100 ${
                      hover ? '-translate-x-0' : 'translate-x-0'
                    } hover:fill-blue-600`}
                  />
                </>
              )}
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
        </>
      )}
    </div>
  )
}
