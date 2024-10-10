import Card from '../../Card'
import { BsThreeDots } from 'react-icons/bs'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { TextSkeleton } from '../../TextSkeleton'

export default function MemberCardSkeleton({
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <Card
      variant="lg"
      className={twMerge(
        'static flex h-fit w-full flex-row items-center justify-between p-3 shadow-sm shadow-gray-500 brightness-95 duration-150 ease-in sm:gap-0 md:p-4',
        props.className
      )}
    >
      <div
        className={
          'flex h-full w-1/2 flex-row items-center justify-start md:w-2/5'
        }
      >
        <TextSkeleton className="h-4 w-4 rounded-full" />
        <div className={'flex flex-col gap-2 pl-2'}>
          <TextSkeleton className="h-4 w-24 md:w-36" />
          <TextSkeleton className="h-3 w-16 md:hidden" />
        </div>
      </div>
      <div className={'hidden flex-row gap-3 md:flex md:w-full md:pl-10'}>
        <TextSkeleton className="h-4 w-16 rounded-sm" />
        <TextSkeleton className="h-4 w-16 rounded-sm" />
        <TextSkeleton className="h-4 w-16 rounded-sm" />
      </div>
      <div
        className={'flex w-1/2 flex-row justify-between gap-2 md:w-60 md:gap-6'}
      >
        <div className="flex flex-col justify-center gap-1">
          <TextSkeleton className="h-4 w-10" />
        </div>
        <BsThreeDots className="h-10 w-10 cursor-pointer p-2 text-skin-skeleton" />
      </div>
    </Card>
  )
}
