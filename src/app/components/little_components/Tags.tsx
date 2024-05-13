import { HTMLAttributes, ReactElement, useContext, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { ThemeContext } from '../../contexts/theme_context'
import Text from './Text'
import {
  X,
  Code2,
  Presentation,
  SearchCode,
  Speech,
  GraduationCap,
  PencilRuler,
  Palette,
  Briefcase
} from 'lucide-react'

interface TagProps {
  variant: string
}

interface VariantsProps {
  label: string
  style: string
  icon?: ReactElement
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
    BUSINESS: {
      label: 'BUSINESS',
      style: `bg-green-600 text-green-${DARKNESS}`
    },
    INTERNAL: {
      label: 'INTERNAL',
      style: `bg-yellow-500 text-yellow-${DARKNESS}`
    },
    DATA_SCIENCE: {
      label: 'DATA',
      style: `bg-teal-500 text-teal-${DARKNESS}`
    },
    CODE: {
      label: 'Código'.toUpperCase(),
      style:
        'border border-skin-muted text-skin-muted text-md hover:no-underline',
      icon: <Code2 className="h-5 w-5" />
    },
    MEETING: {
      label: 'Reunião'.toUpperCase(),
      style:
        'border border-skin-muted text-skin-muted text-md hover:no-underline',
      icon: <Speech className="h-5 w-5" />
    },
    CODEREVIEW: {
      label: 'Revisão de Código'.toUpperCase(),
      style:
        'border border-skin-muted text-skin-muted text-md hover:no-underline',
      icon: <SearchCode className="h-5 w-5" />
    },
    LEARN: {
      label: 'Aprendizado'.toUpperCase(),
      style:
        'border border-skin-muted text-skin-muted text-md hover:no-underline',
      icon: <GraduationCap className="h-5 w-5" />
    },
    PRESENTATION: {
      label: 'Apresentação'.toUpperCase(),
      style:
        'border border-skin-muted text-skin-muted text-md hover:no-underline',
      icon: <Presentation className="h-5 w-5" />
    },
    DESIGN: {
      label: 'Design'.toUpperCase(),
      style:
        'border border-skin-muted text-skin-muted text-md hover:no-underline',
      icon: <Palette className="h-5 w-5" />
    },
    ARCHITECT: {
      label: 'Arquitetura'.toUpperCase(),
      style:
        'border border-skin-muted text-skin-muted text-md hover:no-underline',
      icon: <PencilRuler className="h-5 w-5" />
    },
    WORK: {
      label: 'Trabalho'.toUpperCase(),
      style:
        'border border-skin-muted text-skin-muted text-md hover:no-underline',
      icon: <Briefcase className="h-5 w-5" />
    }
  }

  const label = variants[variant].label
  const style = variants[variant].style
  const icon = variants[variant].icon

  return (
    <p
      className={twMerge(
        'flex h-fit w-fit flex-row items-center gap-2 rounded-md bg-opacity-40 p-0.5 px-1.5 text-xs underline-offset-1 hover:underline',
        style
      )}
    >
      {icon ? icon : null}
      {label}
    </p>
  )
}

interface FilterTagProps extends HTMLAttributes<HTMLDivElement> {
  label: string
  clearFilterProp: () => void
}

interface FilterProps {
  label: string
}

export function FilterTag({
  label,
  clearFilterProp,
  ...props
}: FilterTagProps) {
  const [isVisble, setVisibility] = useState<boolean>(true)

  const variants: Record<string, FilterProps> = {
    PI: {
      label: 'Portal Interno'
    },
    MF: {
      label: 'Mauá Food'
    },
    PT: {
      label: 'Portifólio'
    },
    SF: {
      label: 'Selfie Mauá'
    },
    SM: {
      label: 'Smile'
    },
    GM: {
      label: 'Gameficação'
    },
    BACKEND: {
      label: 'BACK-END'
    },
    FRONTEND: {
      label: 'FRONT-END'
    },
    INFRA: {
      label: 'INFRA'
    },
    UX_UI: {
      label: 'UX/UI'
    },
    PO: {
      label: 'PO'
    },
    INTERNAL: {
      label: 'INTERNAL'
    },
    DATA_SCIENCE: {
      label: 'DATA'
    },
    NEW: {
      label: 'Mais Recente'
    },
    OLD: {
      label: 'Mais Antigo'
    },
    BIGGER: {
      label: 'Maior Duração'
    },
    SMALLER: {
      label: 'Menor Duração'
    }
  }

  const filterVariant = variants[label] || { label: label }
  const filterName = filterVariant.label
  return (
    <div
      {...props}
      className={twMerge(
        `flex flex-row items-center justify-between gap-3 rounded-3xl bg-skin-base-foreground px-3 py-1.5 ${
          isVisble ? '' : 'hidden'
        }`,
        props.className
      )}
    >
      <Text className="font-medium text-skin-inverted" variant="muted">
        {filterName}
      </Text>
      <X
        onClick={() => {
          clearFilterProp()
          setVisibility(false)
        }}
        className="h-5 cursor-pointer text-skin-inverted"
      />
    </div>
  )
}
