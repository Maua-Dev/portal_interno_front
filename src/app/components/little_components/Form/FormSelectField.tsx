import { HTMLAttributes } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

interface FormSelectFieldProps extends HTMLAttributes<HTMLSelectElement> {
  label: string
  type: string
  options: {
    name: string
    value: any
  }[]
}

export function FormSelectField({
  label,
  type,
  options,
  ...rest
}: FormSelectFieldProps) {
  const textInputClasses: { [key: string]: string } = {
    single: 'text-xl font-bold mb-3',
    child: 'mb-1 text-sm text-zinc-500'
  }

  return (
    <div className={rest.className}>
      <h1 className={textInputClasses[type]}>{label}</h1>
      <select
        {...rest}
        className="relative w-full border border-zinc-700 p-2 text-zinc-500"
      >
        <KeyboardArrowDownIcon className="absolute left-2" />
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.name}
            </option>
          )
        })}
      </select>
    </div>
  )
}
