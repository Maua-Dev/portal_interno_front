import type { AxiosInstance } from 'axios'
import type { IMemberRepository } from '../../../modules/member/domain/repositories/member_repository_interface'
import { Member, type JsonProps } from '../../domain/entities/member'
import { ACTIVE, activeToEnum } from '../../domain/enums/active_enum'
import { COURSE, courseToEnum } from '../../domain/enums/course_enum'
import { ROLE, roleToEnum } from '../../domain/enums/role_enum'
import { STACK, stackToEnum } from '../../domain/enums/stack_enum'
import { decorate, injectable } from 'inversify'
import { HTTP_STATUS_CODE } from '../../domain/enums/http_status_code'
import { NoItemsFoundError } from '../../domain/helpers/errors/domain_error'
import { Strike, type StrikeCreationResponse } from '../../domain/entities/strike'
import { STRIKE_CATEGORY } from '../../domain/enums/strike_category_enum'

// interface memberRawResponse... (mantido comentado como no original)

export interface memberOfGetAllMembersRawResponse {
  member: {
    name: string
    email_dev: string
    email: string
    ra: string
    role: string
    stack: string
    year: number
    cellphone: string
    course: string
    hired_date: number
    deactivated_date?: number
    active: string
    user_id: string
    project: string[]
    photo: string | null
    strikes: number | null
    strikes_id?: string[] | null
    strikes_allowed: number | null
  }
}

export interface memberOfGetAllMembersAdminRawResponse {
  member: {
    name: string
    email_dev: string
    email: string
    ra: string
    role: string
    stack: string
    year: number
    cellphone: string
    course: string
    hired_date: number
    deactivated_date?: number
    active: string
    user_id: string
    hours_worked: number
    project: string[]
    photo: string | null
    strikes: number | null
    strikes_id?: string[] | null
    strikes_allowed: number | null
  }
}

export interface getAllMembersAdminRawResponse {
  members: memberOfGetAllMembersAdminRawResponse[]
}

export interface getAllMembersRawResponse {
  members: memberOfGetAllMembersRawResponse[]
}

export class MemberRepositoryHttp implements IMemberRepository {
  constructor(private readonly http: AxiosInstance) {}

  async createStrike(
    memberUserId: string,
    reason: STRIKE_CATEGORY,
    comment: string,
    date: number,
    ownerUserId: string
  ): Promise<StrikeCreationResponse> {
    try {
      const token = localStorage.getItem('idToken')
      if (!token) throw new Error('Token not found')

      const response = await this.http.post<StrikeCreationResponse>(
        '/create-strike',
        {
          owner_user_id: ownerUserId,
          target_user_id: memberUserId,
          category: reason,
          description: comment,
          occurred_date: date,
          applier_user_id: ownerUserId // Adding this as it's present in the entity/response type
        },
        { headers: { Authorization: token } }
      )

      return response.data
    } catch (error: any) {
      console.error('Detailed createStrike Error Response:', error.response?.data)
      const errorMessage = error.response?.data?.message || error.message
      throw new Error(`Error Creating Strike: ${errorMessage}`)
    }
  }
  async deleteStrike(strikeId: string): Promise<void> {
    try {
      const token = localStorage.getItem('idToken')
      if (!token) throw new Error('Token not found')

      await this.http.delete('/delete-strike', {
        data: { strike_id: strikeId },
        headers: { Authorization: token }
      })
    } catch (error: any) {
      console.error('Detailed deleteStrike Error Response:', error.response?.data)
      const errorMessage = error.response?.data?.message || error.message
      throw new Error(`Error Deleting Strike: ${errorMessage}`)
    }
  }
  async getStrike(strikeId: string): Promise<Strike> {
    const token = localStorage.getItem('idToken')
    const response = await this.http.get(`/get-strike`, {
      params: { strike_id: strikeId },
      headers: { 
        Authorization: token || '',
        'Content-Type': undefined 
      }
    })
    const strikeData = response.data.strike || response.data
    return Strike.fromJSON(strikeData)
  }


  async createMember(
    ra: string,
    emailDev: string,
    role: ROLE,
    stack: STACK,
    year: number,
    cellphone: string,
    course: COURSE
  ): Promise<Member> {
    try {
      const token = localStorage.getItem('idToken')

      if (!token) {
        throw new Error('Token not found')
      }

      const response = await this.http.post<JsonProps>(
        '/create-member',
        {
          ra,
          email_dev: emailDev,
          role,
          stack,
          year,
          cellphone,
          course,
          hired_date: 1713141151000
        },
        {
          headers: {
            Authorization: token
          }
        }
      )

      const member = Member.fromJSON(response.data)

      return member
    } catch (error: any) {
      throw new Error('Error Creating Member: ' + error.response.data)
    }
  }

  async getMember(): Promise<Member> {
    try {
      const token = localStorage.getItem('idToken')
      if (!token) {
        throw new Error('Token not found')
      }

      const response = await this.http.post<JsonProps>(
        '/get-member',
        {},
        {
          headers: {
            Authorization: token
          }
        }
      )

      console.log('--- GET MEMBER RAW RESPONSE ---:', response.data.member)
      console.log('Strikes field:', response.data.member.strikes)
      console.log('Strikes_id field:', response.data.member.strikes_id)

      const member = Member.fromJSON(response.data)
      return member
    } catch (error: any) {
      if (error.response.status === HTTP_STATUS_CODE.NOT_FOUND) {
        throw new NoItemsFoundError('member')
      }
      throw new Error(error.response.data)
    }
  }

  async getAllMembers(): Promise<Member[]> {
    try {
      const token = localStorage.getItem('idToken')
      console.log('MemberRepositoryHttp: Token encontrado para getAllMembers?', !!token)

      if (!token) {
        throw new Error('Token not found')
      }

      const response = await this.http.post<getAllMembersRawResponse>(
        '/get-all-members',
        {},
        {
          headers: {
            Authorization: token
          }
        }
      )

      console.log('--- GET ALL MEMBERS RAW RESPONSE[0] ---:', response.data.members[0]?.member)

      const membersArray: Member[] = []

      response.data.members.forEach((member) => {
        const memberUnit: memberOfGetAllMembersRawResponse = member

        membersArray.push(
          new Member({
            name: memberUnit.member.name,
            emailDev: memberUnit.member.email_dev,
            email: memberUnit.member.email,
            ra: memberUnit.member.ra,
            role: roleToEnum(memberUnit.member.role),
            stack: stackToEnum(memberUnit.member.stack),
            year: memberUnit.member.year,
            cellphone: memberUnit.member.cellphone,
            course: courseToEnum(memberUnit.member.course),
            hiredDate: memberUnit.member.hired_date,
            deactivatedDate: memberUnit.member.deactivated_date,
            active: activeToEnum(memberUnit.member.active),
            userId: memberUnit.member.user_id,
            hoursWorked: undefined,
            project: memberUnit.member.project,
            photo: memberUnit.member.photo,
            strikes: memberUnit.member.strikes ?? null,
            strikesId: memberUnit.member.strikes_id || [],
            strikes_allowed: memberUnit.member.strikes_allowed ?? null
          })
        )
      })

      return membersArray
    } catch (error: any) {
      throw new Error('Error Getting All Members: ' + error.message)
    }
  }

  async getAllMembersAdmin(): Promise<Member[]> {
    try {
      const token = localStorage.getItem('idToken')

      if (!token) {
        throw new Error('Token not found')
      }

      const response = await this.http.post<getAllMembersAdminRawResponse>(
        '/get-all-members-admin',
        {},
        {
          headers: {
            Authorization: token
          }
        }
      )

      const membersArray: Member[] = []

      response.data.members.forEach((member) => {
        const memberUnit: memberOfGetAllMembersAdminRawResponse = member

        membersArray.push(
          new Member({
            name: memberUnit.member.name,
            emailDev: memberUnit.member.email_dev,
            email: memberUnit.member.email,
            ra: memberUnit.member.ra,
            role: roleToEnum(memberUnit.member.role),
            stack: stackToEnum(memberUnit.member.stack),
            year: memberUnit.member.year,
            cellphone: memberUnit.member.cellphone,
            course: courseToEnum(memberUnit.member.course),
            hiredDate: memberUnit.member.hired_date,
            deactivatedDate: memberUnit.member.deactivated_date,
            active: activeToEnum(memberUnit.member.active),
            userId: memberUnit.member.user_id,
            hoursWorked: memberUnit.member.hours_worked,
            project: memberUnit.member.project,
            photo: memberUnit.member.photo,
            strikes: memberUnit.member.strikes ?? null,
            strikesId: memberUnit.member.strikes_id || [],
            strikes_allowed: memberUnit.member.strikes_allowed ?? null
          })
        )
      })

      return membersArray
    } catch (error: any) {
      throw new Error('Error Getting All Members: ' + error.message)
    }
  }

  async updateMember(
    memberUserId: string,
    newName?: string | undefined,
    newEmailDev?: string | undefined,
    newRole?: ROLE | undefined,
    newStack?: STACK | undefined,
    newYear?: number | undefined,
    newCellphone?: string | undefined,
    newCourse?: COURSE | undefined,
    newActive?: ACTIVE | undefined,
    newPhoto?: string | undefined
  ): Promise<Member> {
    try {
      const token = localStorage.getItem('idToken')

      if (!token) {
        throw new Error('Token not found')
      }

      const response = await this.http.put<JsonProps>(
        '/update-member',
        {
          new_member_user_id: memberUserId,
          new_name: newName,
          new_email_dev: newEmailDev,
          new_role: newRole,
          new_stack: newStack,
          new_year: newYear,
          new_cellphone: newCellphone,
          new_course: newCourse,
          new_active: newActive,
          new_photo: newPhoto
        },
        {
          headers: {
            Authorization: token
          }
        }
      )

      const member = Member.fromJSON(response.data)

      return member
    } catch (error: any) {
      throw new Error('Error Updating Member: ' + error.response.data)
    }
  }

  async deleteMember(): Promise<Member> {
    try {
      const token = localStorage.getItem('idToken')

      if (!token) {
        throw new Error('Token not found')
      }

      const response = await this.http.delete<JsonProps>('/delete-member', {
        headers: {
          Authorization: token
        }
      })

      const member = Member.fromJSON(response.data)

      return member
    } catch (error: any) {
      throw new Error('Error Deleting Member: ' + error.response.data)
    }
  }
}

decorate(injectable(), MemberRepositoryHttp)
