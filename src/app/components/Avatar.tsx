import { twMerge } from 'tailwind-merge'

type AvatarProps = React.HTMLAttributes<HTMLDivElement> & {
  name: string
}

export function Avatar({ name, ...props }: AvatarProps) {
  const splitName = name.trim().split(' ')
  const firstName = splitName[0]
  const lastName = splitName.length > 1 ? splitName[splitName.length - 1] : ''

  return (
    <div
      className={twMerge(
        'flex aspect-[1/1] h-8 w-8 items-center justify-center rounded-full bg-skin-secundary text-skin-muted hover:text-skin-base',
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
