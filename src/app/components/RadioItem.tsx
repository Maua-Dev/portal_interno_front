import * as RadioGroup from '@radix-ui/react-radio-group'
import { useDarkMode } from '../hooks/useDarkMode.ts'

export interface RadioItemProps {
  radioValue: string // The Value that the user selects ("Global Value")
  value: string
  label: string
  number?: number // Count to be displayed (Used in Radio Group in Notifications)
}

export default function RadioItem({
  radioValue,
  value,
  label,
  number
}: RadioItemProps) {
  const { darkMode } = useDarkMode()

  return (
    <RadioGroup.Item
      value={value}
      className={`rounded px-3 py-1 ${
        radioValue === value
          ? 'bg-skin-button-blue-accent-hover text-white'
          : `bg-skin-fill text-skin-muted ${
              darkMode ? 'hover:bg-zinc-900' : 'hover:bg-zinc-300'
            }`
      }`}
    >
      <p className={'text-base'}>
        {label}

        <span
          className={`my-auto ml-2 rounded bg-skin-secundary px-1.5 py-0.5 text-sm text-skin-base ${
            number ?? 'hidden'
          }`}
        >
          {number}
        </span>
      </p>
      <RadioGroup.Indicator />
    </RadioGroup.Item>
  )
}
