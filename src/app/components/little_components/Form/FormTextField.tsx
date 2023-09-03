import { InputHTMLAttributes } from 'react'

interface FormTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  type: string
  dataType?: string
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
