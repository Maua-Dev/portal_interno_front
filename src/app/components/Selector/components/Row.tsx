import { IoMdClose } from 'react-icons/io'

export function Row({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-300 p-2 text-base">
      <p className="w-3/4">{text}</p>
      <IoMdClose onClick={onClick} className="cursor-pointer" />
    </div>
  )
}
