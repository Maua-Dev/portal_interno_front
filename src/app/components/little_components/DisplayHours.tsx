import { ReactNode } from 'react'

const Display = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center">{children}</div>
  )
}

export const DisplayHours = ({
  hours,
  mainCard
}: {
  hours: string
  mainCard?: boolean
}) => {
  return (
    <Display>
      <p
        className={
          mainCard
            ? 'text-xs md:text-sm xl:text-xl'
            : 'text-sm md:text-base xl:text-2xl '
        }
      >
        Horas totais
      </p>
      <span
        className={
          mainCard
            ? 'text-sm font-bold md:text-base xl:text-2xl '
            : 'text-lg font-bold md:text-2xl xl:text-4xl '
        }
      >
        {hours}
      </span>
    </Display>
  )
}
