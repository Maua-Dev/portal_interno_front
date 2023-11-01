import { BiLoaderAlt } from 'react-icons/bi'

export default function Loader() {
  return (
    <div className="flex h-screen flex-row items-center gap-2 text-skin-base">
      <BiLoaderAlt className="animate-spin text-2xl" />
      <p className="text-xl">Carregando...</p>
    </div>
  )
}
