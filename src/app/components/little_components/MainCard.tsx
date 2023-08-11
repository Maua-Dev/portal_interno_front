import { ReactNode } from 'react'

interface MainCardProps {
  children: ReactNode
  width?: string | undefined
  height?: string | undefined
}

const MainCard = ({ children, width, height }: MainCardProps) => {
  const widthApplied = width === undefined ? 'w-1/2' : width
  const heightApplied = height === undefined ? 'h-fit' : height
  return (
    <div
      className={
        'rounded-xl border-2 border-gray-400 px-7 py-2 ' +
        widthApplied +
        ' ' +
        heightApplied
      }
    >
      {children}
    </div>
  )
}

export { MainCard }
