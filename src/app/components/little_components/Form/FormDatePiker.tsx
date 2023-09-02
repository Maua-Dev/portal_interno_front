import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'

interface FormDatePikerProps {
  label: string
}

export default function FormDatePiker({ label }: FormDatePikerProps) {
  return (
    <div className="w-full">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{
            '& .MuiInputLabel-root': { color: 'black' },
            '& .MuiOutlinedInput-root': {
              '& > fieldset': { borderColor: 'black', borderWidth: '1px' }
            },
            width: '100%'
          }}
          label={label}
          format="DD-MM-YYYY"
        />
      </LocalizationProvider>
    </div>
  )
}
