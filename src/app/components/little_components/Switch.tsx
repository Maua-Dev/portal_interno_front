import * as SwitchPrimitive from '@radix-ui/react-switch'
import { twMerge } from 'tailwind-merge'

function Thumb({
  children,
  ...props
}: React.ComponentPropsWithRef<typeof SwitchPrimitive.Thumb>) {
  return (
    <SwitchPrimitive.Thumb {...props} className={twMerge(props.className)}>
      {children}
    </SwitchPrimitive.Thumb>
  )
}

function Root({
  children,
  ...props
}: React.ComponentPropsWithRef<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root {...props} className={twMerge(props.className)}>
      {children}
    </SwitchPrimitive.Root>
  )
}

type variantType = 'regular'

interface variantsProps {
  root: string
  thumb: string
}

interface SwitchProps
  extends React.ComponentPropsWithRef<typeof SwitchPrimitive.Root> {
  variant: variantType
}

export default function Switch({ variant, children, ...props }: SwitchProps) {
  const variants: Record<variantType, variantsProps> = {
    regular: {
      root: 'relative h-6 w-12 rounded-full border-skin-muted border data-[state=checked]:bg-skin-button-blue-accent data-[state=unchecked]:bg-skin-fill',
      thumb:
        'block h-5 w-6 translate-x-0.5 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:border data-[state=checked]:bg-white data-[state=unchecked]:bg-skin-secundary'
    }
  }

  const rootStyle = variants[variant].root
  const thumbStyle = variants[variant].thumb

  return (
    <Root {...props} className={twMerge(rootStyle, props.className)}>
      <Thumb className={thumbStyle} />
    </Root>
  )
}
