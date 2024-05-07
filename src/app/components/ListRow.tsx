import { useState } from 'react'
import { FaCircle } from 'react-icons/fa'
import { RiDeleteBinLine } from 'react-icons/ri'

interface ListRowProps {
  text: string
  onClick: () => void
}

export default function ListRow({ text, onClick }: ListRowProps) {
  const [visible, setVisible] = useState<boolean>(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div
      className="flex flex-row items-center gap-2"
      onMouseEnter={toggleVisibility}
      onMouseLeave={toggleVisibility}
    >
      <FaCircle className="text-[6px]" />
      <span>{text}</span>
      <button type="button" onClick={onClick}>
        <RiDeleteBinLine
          className={`transform transition-all duration-200 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </button>
    </div>
  )
}
