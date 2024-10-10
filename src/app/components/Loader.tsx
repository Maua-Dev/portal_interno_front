import { ElementType } from 'react'

interface LoaderInterface {
  SkeletonComponent: ElementType
}

function List({ SkeletonComponent }: LoaderInterface) {
  return (
    <div className="flex h-screen w-full flex-col items-center gap-2 text-skin-base">
      <SkeletonComponent />
      <SkeletonComponent className="opacity-80" />
      <SkeletonComponent className="opacity-60" />
      <SkeletonComponent className="opacity-40" />
      <SkeletonComponent className="opacity-20" />
      <SkeletonComponent className="opacity-10" />
      <SkeletonComponent className="opacity-5" />
    </div>
  )
}

function Notification({ SkeletonComponent }: LoaderInterface) {
  return (
    <div className="flex h-screen w-full flex-col items-center text-skin-base">
      <SkeletonComponent className="opacity-80" />
      <SkeletonComponent className="opacity-40" />
      <SkeletonComponent className="opacity-10" />
    </div>
  )
}

export { List, Notification }
