import { ReactNode } from 'react'

const Display = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center">{children}</div>
  )
}

export const DisplayHours = ({ hours }: { hours: string }) => {
  return (
    <Display>
      <p className="text-sm md:text-base xl:text-2xl">Horas totais</p>
      <span className="text-lg font-bold md:text-2xl xl:text-4xl">{hours}</span>
    </Display>
  )
}
