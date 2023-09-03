import { SelectHTMLAttributes } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

interface FormSelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
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
    single: 'text:lg sm:text-xl font-bold mb-3',
    child: 'mb-1 text-xs sm:text-base text-zinc-500'
  }

  return (
    <div className={rest.className}>
      <h1 className={textInputClasses[type]}>{label}</h1>
      <select
        {...rest}
        className="relative h-14 w-full border border-zinc-700 p-2 text-sm text-zinc-500 sm:text-base"
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
