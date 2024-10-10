import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export function TextSkeleton({ ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={twMerge(
        'relative overflow-hidden rounded-xl bg-skin-skeleton-foreground before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmerX_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 hover:opacity-100',
        props.className
      )}
    />
  )
}
