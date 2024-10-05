import { ElementType } from 'react'

interface LoaderInterface {
  SkeletonComponent: ElementType
}

export default function Loader({ SkeletonComponent }: LoaderInterface) {
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
