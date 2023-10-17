import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'

interface FormDatePikerProps {
  label: string
  onChange: (value: Dayjs | null) => void
}

export default function FormDatePiker({ label, onChange }: FormDatePikerProps) {
  return (
    <div className="w-full">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <h1 className={'mb-1 pl-1 text-base text-zinc-500'}>{label}</h1>
        <DatePicker
          sx={{
            '& .MuiInputLabel-root': { color: 'black' },
            '& .MuiOutlinedInput-root': {
              '& > fieldset': { borderColor: 'black', borderWidth: '1px' }
            },
            width: '100%'
          }}
          format="DD-MM-YYYY"
          onChange={(newValue: Dayjs | null) => {
            onChange(newValue)
          }}
        />
      </LocalizationProvider>
    </div>
  )
}
