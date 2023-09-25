import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { IconButton } from '@mui/material'
import { InputHTMLAttributes } from 'react'

interface FormListFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  // isForCreateAction: boolean
  onIconButtonClick?: () => void
  options: {
    name: string
    value: any
  }[]
}

export function FormListField({
  label,
  options,
  onIconButtonClick,
  ...rest
}: FormListFieldProps) {
  return (
    <div>
      <div className="mb-2 flex flex-row items-center justify-between pr-1">
        <h1 className="text-lg font-bold">{label}</h1>
        <IconButton className="p-0" onClick={onIconButtonClick}>
          <ControlPointIcon className="cursor-pointer text-blue-700 hover:text-blue-800" />
        </IconButton>
      </div>
      <div className=" h-48 w-full overflow-scroll rounded-md border border-black py-2 pl-1 pr-4">
        {options.map((option, index) => (
          <div className="flex justify-between" key={index}>
            <p>{option.name}</p>
            <input
              {...rest}
              key={index}
              type="checkbox"
              value={option.value}
              className={option.name === '' ? 'hidden' : ''}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
