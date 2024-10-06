import { twMerge } from 'tailwind-merge'
import { useDarkMode } from '../hooks/useDarkMode.ts'

type AvatarProps = React.HTMLAttributes<HTMLDivElement> & {
  name: string
}

export function Avatar({ name, ...props }: AvatarProps) {
  const { darkMode } = useDarkMode()

  const splitName = name.trim().split(' ')
  const firstName = splitName[0]
  const lastName = splitName.length > 1 ? splitName[splitName.length - 1] : ''

  return (
    <div
      className={twMerge(
        `flex aspect-[1/1] h-8 w-8 items-center justify-center rounded-full text-skin-muted hover:text-skin-base ${
          darkMode ? 'bg-skin-secundary' : 'bg-skin-fill'
        }`,
        props.className
      )}
      {...props}
    >
      <p className="text-sm font-medium">
        {lastName ? `${firstName[0]}${lastName[0]}` : `${firstName[0]}`}
      </p>
    </div>
  )
}
