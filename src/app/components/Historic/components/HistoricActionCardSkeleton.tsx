import Card from '../../Card'
import { BsThreeDots } from 'react-icons/bs'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { TextSkeleton } from '../../TextSkeleton'

export default function HistoricActionCardSkeleton({
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <Card
      variant="lg"
      className={twMerge(
        'flex h-fit flex-row items-center justify-between overflow-hidden pr-6 opacity-80 shadow-sm shadow-gray-500 duration-150 ease-in',
        props.className
      )}
    >
      <div className="flex w-fit flex-row items-center gap-4 md:w-3/6">
        <TextSkeleton className="h-5 w-5" />
        <div className="flex flex-col gap-3 overflow-hidden">
          <TextSkeleton className="h-2 w-16 sm:h-2 sm:w-28 lg:h-4 lg:w-52" />
          <TextSkeleton className="h-2 w-14 sm:h-2 sm:w-12 lg:h-4 lg:w-32" />
        </div>
      </div>
      <div className="hidden w-1/5 flex-row justify-start gap-2 sm:flex">
        <TextSkeleton className="h-4 w-10 rounded-sm" />
        <TextSkeleton className="h-4 w-10 rounded-sm" />
        <TextSkeleton className="h-4 w-10 rounded-sm" />
      </div>
      <div className="flex w-fit flex-row items-center justify-between gap-3 md:w-1/5">
        <div className="flex flex-col justify-center gap-1">
          <TextSkeleton className="h-1.5 w-10" />
          <TextSkeleton className="h-1.5 w-8" />
        </div>
        <div>
          <BsThreeDots className="h-10 w-10 cursor-pointer p-2 text-skin-skeleton" />
        </div>
      </div>
    </Card>
  )
}
