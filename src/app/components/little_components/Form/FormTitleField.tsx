import { InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface FormTitleFiledProps extends InputHTMLAttributes<HTMLInputElement> {
  text: string
}

export default function FormTitleFiled({ text, ...rest }: FormTitleFiledProps) {
  return (
    <div>
      <input
        {...rest}
        type="text"
        placeholder={text}
        className={twMerge(
          'text-3xl text-black placeholder:text-3xl placeholder:text-black',
          rest.className
        )}
      />
    </div>
  )
}
