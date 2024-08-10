type AvatarProps = React.HTMLAttributes<HTMLDivElement> & {
  name: string
}

export function Avatar({ name, ...props }: AvatarProps) {
  return (
    <div
      // className={` ${className}`}
      {...props}
    >
      {name
        .split(' ')
        .map((n) => n[0])
        .join('')}
    </div>
  )
}
