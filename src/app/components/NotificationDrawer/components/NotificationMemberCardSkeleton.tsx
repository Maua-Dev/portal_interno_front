import { TextSkeleton } from '../../TextSkeleton.tsx'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export default function NotificationMemberCardSkeleton({
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={twMerge(
        'bg flex w-full animate-pulse flex-col gap-4 px-4 py-5 text-skin-muted',
        props.className
      )}
    >
      <div className="flex items-center gap-3">
        <TextSkeleton className="h-10 w-10 rounded-full " />
        <div className="flex flex-col gap-1">
          <TextSkeleton className="h-4 w-32 rounded "></TextSkeleton>
          <TextSkeleton className="h-4 w-56 rounded"></TextSkeleton>
        </div>
      </div>
      <div className="flex flex-row items-end justify-between">
        <TextSkeleton className="h-4 w-24 rounded "></TextSkeleton>
        <div className="flex gap-3">
          <TextSkeleton className="h-8 w-16 rounded-md "></TextSkeleton>
          <TextSkeleton className="h-8 w-16 rounded-md "></TextSkeleton>
        </div>
      </div>
    </div>
  )
}
