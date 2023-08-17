import { ReactNode } from 'react'

const MidTitle = ({ children }: { children: ReactNode }) => {
  return <p className="mb-3 text-xl font-bold text-blue-600">{children}</p>
}

const SmallTitle = ({ children }: { children: ReactNode }) => {
  return <p className="text-sm font-bold text-gray-600">{children}</p>
}

export { MidTitle, SmallTitle }
