import { ReactNode } from 'react'

const FlexColCenter = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col items-center">{children}</div>
}

const FlexCol = ({
  children,
  className
}: {
  children: ReactNode
  className?: string
}) => {
  return <div className={'flex flex-col ' + className}>{children}</div>
}

const FlexRow = ({
  children,
  className
}: {
  children: ReactNode
  className?: string
}) => {
  return <div className={'flex flex-row ' + className}>{children}</div>
}

export { FlexColCenter, FlexCol, FlexRow }
