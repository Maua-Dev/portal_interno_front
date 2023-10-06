import { InputHTMLAttributes } from 'react'

interface CardListCellProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string
  subTitle: string
}

export function CardListCell({ title, subTitle, ...rest }: CardListCellProps) {
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <div>
        <h1 className="text-xl">{title}</h1>
        <p className="text-sm text-zinc-500">{subTitle}</p>
      </div>
      <input type="radio" {...rest} />
    </div>
  )
}
