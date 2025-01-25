import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { Member } from '../../../@clean/shared/domain/entities/member'
import { stackToEnum } from '../../../@clean/shared/domain/enums/stack_enum'
import { FilterProps } from '../FilterBar'

const fileType =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
const fileExtension = '.xlsx'

export const exportToCSV = (
  apiData: Member[],
  currentMember: Member,
  fileName: string,
  filterProps: FilterProps
) => {
  // Inclui o membro atual no conjunto de dados original
  let filteredMembers = [...apiData, currentMember]

  // Projects Filter Logic
  if (filterProps.project) {
    filteredMembers = filteredMembers.filter((member) =>
      member.project.includes(filterProps.project)
    )
  }

  // Year Filter Logic
  if (filterProps.year) {
    filteredMembers = filteredMembers.filter(
      (member) => member.year.toString() === filterProps.year
    )
  }

  // Role Filter Logic
  if (filterProps.role) {
    filteredMembers = filteredMembers.filter(
      (member) => member.role === filterProps.role
    )
  }

  // Area Filter Logic
  if (filterProps.stack) {
    filteredMembers = filteredMembers.filter(
      (member) => member.stack === stackToEnum(filterProps.stack)
    )
  }

  // OrderBy Logic
  if (filterProps.orderBy === 'MORE') {
    filteredMembers.sort((a, b) => (b.hoursWorked || 0) - (a.hoursWorked || 0))
  } else if (filterProps.orderBy === 'LESS') {
    filteredMembers.sort((a, b) => (a.hoursWorked || 0) - (b.hoursWorked || 0))
  }

  // Situation Filter Logic
  if (filterProps.situation) {
    filteredMembers = filteredMembers.filter(
      (member) => member.active === filterProps.situation
    )
  }

  // Formata os dados para exportação
  const membersFormatted = filteredMembers.map((member) => ({
    Nome: member.name,
    RA: `${member.ra.substring(0, 2)}.${member.ra.substring(
      2,
      7
    )}-${member.ra.substring(7)}`,
    Horas_trabalhadas: member.hoursWorked
      ? member.hoursWorked / 1000 / 60 / 60
      : 0
  }))

  // Ordena os dados pelo nome
  membersFormatted.sort((a, b) => a.Nome.localeCompare(b.Nome))

  // Exportação para Excel
  try {
    const ws = XLSX.utils.json_to_sheet(membersFormatted)
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: fileType })
    saveAs(data, fileName + fileExtension)
  } catch (error) {
    console.error('Erro ao exportar o arquivo Excel:', error)
  }
}
