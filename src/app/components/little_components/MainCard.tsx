import { ReactNode } from 'react'

interface MainCardProps {
  children: ReactNode
  width?: string | undefined
}

const MainCard = ({ children, width }: MainCardProps) => {
  const widthApplied = width === undefined ? 'w-1/2' : width
  return (
    <div
      className={
        'h-fit rounded-xl border-2 border-gray-400 px-7 py-2 ' + widthApplied
      }
    >
      {children}
    </div>
  )
}

export { MainCard }
