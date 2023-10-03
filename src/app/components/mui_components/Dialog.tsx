import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Checkbox,
  TextField,
  DialogActions,
  Button
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import React, { useEffect } from 'react'

export const FilterDialog = ({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) => {
  const mobileStyle = {
    '& .MuiDialog-paper': {
      width: '72%',
      height: '60%',
      maxHeight: '60%',
      maxWidth: '72%',
      margin: 0,
      padding: 2,
      borderRadius: 4
    }
  }
  const desktopStyle = {
    '& .MuiDialog-paper': {
      width: '40%',
      height: '52%',
      maxHeight: '52%',
      maxWidth: '40%',
      margin: 0,
      padding: 2,
      borderRadius: 4
    }
  }

  const [dateValue, setDateValue] = React.useState<any | null>(null)

  useEffect(() => {
    if (dateValue === null || dateValue === undefined) return
    console.log(dateValue.$d.getTime())
  }, [dateValue])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      sx={window.innerWidth > 500 ? desktopStyle : mobileStyle}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2 style={{ color: 'rgba(37, 99, 235, 1)' }}>Filtrar atividades</h2>
        <div>
          <button onClick={onClose}>X</button>
        </div>
      </DialogTitle>
      <DialogContent
        dividers={true}
        sx={{
          borderTop: '1px solid #0000004c',
          height: '100%'
        }}
      >
        <h3>Escolha a data para filtrar as atividades:</h3>
        <div
          style={
            window.innerWidth > 500
              ? { display: 'flex' }
              : { display: 'flex', flexDirection: 'column' }
          }
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              sx={window.innerWidth > 500 ? { marginRight: '2rem' } : {}}
              components={['DatePicker']}
            >
              <DatePicker label="Data inicial" />
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label="Data final"
                value={dateValue}
                onChange={(newDateValue) => setDateValue(newDateValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div
          style={{
            paddingTop: '16px',
            paddingBottom: '16px',
            marginTop: '20px',
            borderTop: '1px solid black',
            width: '100%'
          }}
        >
          <h3>Nova página de atividades?</h3>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Sim" />
            <FormControlLabel control={<Checkbox />} label="Não" />
          </FormGroup>
        </div>
        <div
          style={{
            paddingTop: '16px',
            paddingBottom: '16px',
            borderTop: '1px solid black',
            width: '100%'
          }}
        >
          <h3 style={{ marginBottom: '20px' }}>
            Quantas atividades deseja ver?
          </h3>
          <FormGroup>
            <TextField label="Quantidade" type="number" />
          </FormGroup>
        </div>
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: 'rgba(37, 99, 235, 1)' }} onClick={() => null}>
          Aplicar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
