import { Search } from 'lucide-react'

export default function TextField() {
  return (
    <div className="relative h-10 w-72 overflow-hidden rounded-full border border-skin-muted bg-skin-fill focus:bg-red-500">
      <input
        type="text"
        className="peer z-20 h-full w-full rounded-full bg-transparent pl-3 placeholder:pl-7 placeholder:text-skin-base placeholder:transition-transform placeholder:duration-150 placeholder:ease-linear focus:outline-none focus:placeholder:-translate-x-7"
        placeholder="Digite o titulo da atividade..."
      />
      <Search className="group-:hidden pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-skin-base transition-transform duration-150 peer-focus:-translate-x-10" />
    </div>
  )
}
