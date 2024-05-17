import { ReactElement } from 'react'
import { BsCheck } from 'react-icons/bs'
import { CgSandClock } from 'react-icons/cg'
import { VscError } from 'react-icons/vsc'

type VariantsType = 'rejected' | 'waiting' | 'approved'

interface IconsProps {
  variant: VariantsType
}

function StateIcon({ variant }: IconsProps) {
  const variants: Record<VariantsType, ReactElement> = {
    rejected: (
      <VscError className="h-5 w-5 rounded-full bg-red-600 text-white" />
    ),
    waiting: (
      <CgSandClock className="h-5 w-5 rounded-full bg-yellow-600 text-black" />
    ),
    approved: (
      <BsCheck className="h-5 w-5 rounded-full bg-skin-button-blue-accent text-white" />
    )
  }
  return <div className="w-7">{variants[variant]}</div>
}

interface IconText {
  text: string
  icon: ReactElement
}

function IconText({ text, icon }: IconText) {
  return (
    <div className="flex flex-row items-center gap-1">
      {icon}
      <p className="text-sm text-skin-muted">{text}</p>
    </div>
  )
}

export { StateIcon, IconText }
