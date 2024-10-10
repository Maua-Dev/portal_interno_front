import { LucideIcon } from 'lucide-react'
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
      <VscError className="h-6 w-6 rounded-full bg-red-600 text-white" />
    ),
    waiting: (
      <CgSandClock className="h-6 w-6 rounded-full bg-yellow-600 p-1 text-white" />
    ),
    approved: (
      <BsCheck className="h-6 w-6 rounded-full bg-skin-button-blue-accent text-white" />
    )
  }
  return <div className="w-7">{variants[variant]}</div>
}

interface IconText {
  text: string
  icon: LucideIcon
}

function IconText({ text, icon: Icon }: IconText) {
  return (
    <div className="flex flex-row items-center gap-1">
      <Icon className="h-4 w-4 text-skin-muted" />
      <p className="text-sm text-skin-muted">{text}</p>
    </div>
  )
}

export { StateIcon, IconText }
