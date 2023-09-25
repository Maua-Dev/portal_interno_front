import { InputHTMLAttributes, ReactNode } from 'react'

interface FormTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  type: string
  dataType?: string
  icon?: ReactNode
}

export function FormTextField({
  label,
  type,
  dataType,
  ...rest
}: FormTextFieldProps) {
  const textInputClasses: { [key: string]: string } = {
    single: 'text-xl font-bold mb-3',
    child: 'mb-1 text-sm text-zinc-500'
  }

  return (
    <div className={rest.className}>
      <h1 className={textInputClasses[type]}>{label}</h1>
      <input
        {...rest}
        type={dataType ? dataType : 'text'}
        className="h-14 w-full border border-zinc-700 p-2"
      />
    </div>
  )
}

interface FormIconTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  text: string
  icon: ReactNode
}

export function FormIconTextField({
  text,
  icon,
  ...rest
}: FormIconTextFieldProps) {
  return (
    <div className="flex w-8/12 flex-row items-center gap-5 rounded-sm border border-zinc-500 px-3">
      <input
        type="text"
        {...rest}
        placeholder={text}
        className="w-full outline-none placeholder:pl-4"
      />
      {icon}
    </div>
  )
}
