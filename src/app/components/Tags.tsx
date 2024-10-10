import { HTMLAttributes, ReactElement, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Text from './FilterBar/components/Text'
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
import { useDarkMode } from '../hooks/useDarkMode'
import { MotionProps, motion, AnimatePresence } from 'framer-motion'
import { ACTIVE } from '../../@clean/shared/domain/enums/active_enum.ts'
import HoverCard from './HoverCard.tsx'

interface TagProps {
  variant: string
}

interface VariantsProps {
  label: string
  style: string
  icon?: ReactElement
}

export function Tag({ variant }: TagProps) {
  const { darkMode } = useDarkMode()
  const DARKNESS = darkMode ? '900' : '400'

  // Fallback default values
  let label = variant
  let style = `bg-skin-fill text-skin-base ${
    darkMode ? 'hover:bg-zinc-800' : 'hover:bg-zinc-400/70'
  }`
  let icon = null

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

  // Safely check if variant exists in variants object
  if (variants[variant]) {
    label = variants[variant].label
    style = variants[variant].style
    icon = variants[variant].icon || null
  }

  return (
    <p
      className={twMerge(
        'flex h-fit w-fit flex-row items-center gap-2 rounded-md bg-opacity-40 p-1 px-3 text-xs font-medium underline-offset-1 hover:underline',
        style
      )}
    >
      {icon ? icon : null}
      {label}
    </p>
  )
}

interface FilterTagProps extends MotionProps {
  label: string
  clearFilterProp: () => void
  className?: string
}

interface FilterProps {
  label: string
}

export function FilterTag({
  label,
  clearFilterProp,
  ...props
}: FilterTagProps) {
  const [isVisible, setVisibility] = useState<boolean>(true)
  const { darkMode } = useDarkMode()

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
    },
    ACTIVE: {
      label: 'Ativo'
    },
    INACTIVE: {
      label: 'Desativado'
    },
    DISCONNECTED: {
      label: 'Desligado'
    },
    ON_HOLD: {
      label: 'Em Espera'
    },
    LESS: {
      label: 'Com Menos Horas'
    },
    FREEZE: {
      label: 'Congelado'
    },
    MORE: {
      label: 'Com Mais Horas'
    },
    1: {
      label: '1° ano'
    },
    2: {
      label: '2° ano'
    },
    3: {
      label: '3° ano'
    },
    4: {
      label: '4° ano'
    },
    5: {
      label: '5° ano'
    }
  }

  const filterVariant = variants[label] || { label: label }
  const filterName = filterVariant.label
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          {...props}
          className={twMerge(
            `flex flex-row items-center justify-between gap-3 rounded-md bg-skin-fill duration-150 ${
              darkMode ? 'hover:bg-zinc-800' : 'hover:bg-zinc-300'
            } px-3 py-1.5`,
            props.className
          )}
          initial={{ translateX: '10%', opacity: 0 }}
          animate={{ translateX: '0%', opacity: 1 }}
          exit={{ translateX: '-10%', opacity: 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          <Text className="font-medium" variant="muted">
            {filterName}
          </Text>
          <X
            onClick={() => {
              clearFilterProp()
              setVisibility(false)
            }}
            className="h-5 cursor-pointer text-skin-muted"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface MemberTagProps extends HTMLAttributes<HTMLDivElement> {
  situation: ACTIVE
}

export function MemberTag({ situation, ...props }: MemberTagProps) {
  const styleProps: { [key in ACTIVE]: { label: string; style: string } } = {
    ACTIVE: { label: 'Ativo', style: 'bg-emerald-600' },
    FREEZE: { label: 'Congelado', style: 'bg-yellow-600' },
    DISCONNECTED: { label: 'Desligado', style: 'bg-red-600' },
    ON_HOLD: { label: 'Em Espera', style: 'bg-gray-600' }
  }

  return (
    <HoverCard placeholder={styleProps[situation].label} side={'left'}>
      <div
        className={twMerge(styleProps[situation].style, props.className)}
      ></div>
    </HoverCard>
  )
}
