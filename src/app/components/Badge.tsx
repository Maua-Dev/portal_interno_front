import { HTMLAttributes, useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { ThemeContext } from '../contexts/theme_context.tsx'

export default function Badge({ ...props }: HTMLAttributes<HTMLDivElement>) {
  const { darkMode } = useContext(ThemeContext)

  const style =
    'rounded-md bg-skin-fill px-3 py-1 md:text-sm lg:text-base ' +
    (darkMode ? 'hover:bg-zinc-800' : 'hover:bg-zinc-400/60')
  return <p className={twMerge(style, props.className)}>{props.children}</p>
}
