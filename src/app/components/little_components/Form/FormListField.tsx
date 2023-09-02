import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { IconButton } from '@mui/material'

interface FormListFieldProps {
  label: string
  isForCreateAction: boolean
  options: {
    name: string
    value: any
  }[]
}

export function FormListField({
  label,
  isForCreateAction,
  options
}: FormListFieldProps) {
  return (
    <div>
      <div className="mb-2 flex flex-row items-center justify-between pr-1">
        <h1 className="text-lg font-bold">{label}</h1>
        <IconButton>
          <ControlPointIcon className=" cursor-pointer text-blue-700 hover:text-blue-800" />
        </IconButton>
      </div>
      <div className=" h-40 w-full overflow-scroll rounded-md border border-black py-2 pl-1 pr-4">
        {options.map((option, index) => (
          <div className="flex justify-between" key={index}>
            <p>{option.name}</p>
            <input
              key={index}
              checked={!isForCreateAction}
              type="checkbox"
              name=""
              value={option.value}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
