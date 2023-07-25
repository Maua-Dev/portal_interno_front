import { ReactNode } from 'react'

const MainCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-fit w-1/2 rounded-xl border-2 border-gray-400 px-7 py-2">
      {children}
    </div>
  )
}

export { MainCard }
