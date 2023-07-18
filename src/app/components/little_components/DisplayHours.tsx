import { ReactNode } from 'react'

const Display = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-0">
      {children}
    </div>
  )
}

export const DisplayHours = ({ hours }: { hours: string }) => {
  return (
    <Display>
      <p className="text-2xl">Horas totais</p>
      <span className="text-4xl font-bold">{hours}</span>
    </Display>
  )
}
