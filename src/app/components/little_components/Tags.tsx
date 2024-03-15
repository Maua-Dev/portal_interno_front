import { HTMLAttributes, useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { ThemeContext } from '../../contexts/theme_context'
import Text from './Text'
import { X } from 'lucide-react'

type TagType =
  | 'BACKEND'
  | 'FRONTEND'
  | 'INFRA'
  | 'UX_UI'
  | 'PO'
  | 'INTERNAL'
  | 'DATA_SCIENCE'

interface TagProps {
  variant: string
}

interface VariantsProps {
  label: string
  style: string
}

export function Tag({ variant }: TagProps) {
  const { theme } = useContext(ThemeContext)
  const DARKNESS = theme ? '900' : '400'
  const variants: Record<string, VariantsProps> = {
    BACKEND: {
      label: 'BACK',
      style: `bg-red-600 text-red-${DARKNESS}`
    },
    FRONTEND: {
      label: 'FRONT',
      style: `bg-blue-600 text-blue-${DARKNESS}`
    },
    INFRA: {
      label: 'INFRA',
      style: `bg-gray-700 text-gray-${DARKNESS}`
    },
    UX_UI: {
      label: 'UX/UI',
      style: `bg-purple-500 text-purple-${DARKNESS}`
    },
    PO: {
      label: 'PO',
      style: `bg-green-600 text-green-${DARKNESS}`
    },
    INTERNAL: {
      label: 'INTERNAL',
      style: `bg-yellow-500 text-yellow-${DARKNESS}`
    },
    DATA_SCIENCE: {
      label: 'DATA',
      style: `bg-teal-500 text-teal-${DARKNESS}`
    }
  }

  const label = variants[variant].label
  const style = variants[variant].style

  return (
    <p
      className={twMerge(
        'h-fit w-fit rounded-md bg-opacity-40 p-0.5 px-1.5 text-xs underline-offset-1 hover:underline',
        style
      )}
    >
      {label}
    </p>
  )
}

interface FilterTagProps extends HTMLAttributes<HTMLDivElement> {
  label: string
}

export function FilterTag({ label, ...props }: FilterTagProps) {
  return (
    <div
      {...props}
      className={twMerge(
        'flex flex-row items-center justify-between gap-3 rounded-3xl bg-skin-base-foreground px-3 py-1.5',
        props.className
      )}
    >
      <Text className="font-medium text-skin-inverted" variant="muted">
        {label}
      </Text>
      <X className="h-5 cursor-pointer text-skin-inverted" />
    </div>
  )
}
