import HistoricActionCardSkeleton from './HistoricActionCardSkeleton'

export default function Loader() {
  return (
    <div className="flex w-full flex-col items-center gap-2 text-skin-base">
      <HistoricActionCardSkeleton />
      <HistoricActionCardSkeleton className="opacity-80" />
      <HistoricActionCardSkeleton className="opacity-60" />
      <HistoricActionCardSkeleton className="opacity-40" />
      <HistoricActionCardSkeleton className="opacity-20" />
      <HistoricActionCardSkeleton className="opacity-10" />
    </div>
  )
}
