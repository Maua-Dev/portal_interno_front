import { ReactNode } from 'react'

interface MainCardProps {
  children: ReactNode
  width?: string | undefined
  height?: string | undefined
  style?: string | undefined
}

const MainCard = ({ children, width, height, style }: MainCardProps) => {
  const widthApplied = width === undefined ? 'w-1/2' : width
  const heightApplied = height === undefined ? 'h-fit' : height
  return (
    <div
      className={
        'rounded-xl border-2 border-gray-400 px-7 py-5 ' +
        widthApplied +
        ' ' +
        heightApplied +
        ' ' +
        style
      }
    >
      {children}
    </div>
  )
}

export { MainCard }
