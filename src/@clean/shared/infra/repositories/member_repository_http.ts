import { AxiosInstance } from 'axios'
import { IMemberRepository } from '../../../modules/member/domain/repositories/member_repository_interface'
import { JsonProps, Member } from '../../domain/entities/member'
import { ACTIVE, activeToEnum } from '../../domain/enums/active_enum'
import { COURSE, courseToEnum } from '../../domain/enums/course_enum'
import { ROLE, roleToEnum } from '../../domain/enums/role_enum'
import { STACK, stackToEnum } from '../../domain/enums/stack_enum'
import { decorate, injectable } from 'inversify'
import { HTTP_STATUS_CODE } from '../../domain/enums/http_status_code'
import { NoItemsFoundError } from '../../domain/helpers/errors/domain_error'

interface memberRawResponse {
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
  }
}

export interface getAllMembersRawResponse {
  members: memberRawResponse[]
}

export class MemberRepositoryHttp implements IMemberRepository {
  constructor(private readonly http: AxiosInstance) {}

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
            Authorization: 'Bearer ' + token
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
            Authorization: 'Bearer ' + token
          }
        }
      )

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

      if (!token) {
        throw new Error('Token not found')
      }

      const response = await this.http.post<getAllMembersRawResponse>(
        '/get-all-members',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      )

      const membersArray: Member[] = []

      response.data.members.forEach((member) => {
        const memberUnit: memberRawResponse = member

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
            userId: memberUnit.member.user_id
          })
        )
      })

      return membersArray
    } catch (error: any) {
      throw new Error('Error Getting All Members: ' + error.response.data)
    }
  }

  async updateMember(
    newName?: string | undefined,
    newEmailDev?: string | undefined,
    newRole?: ROLE | undefined,
    newStack?: STACK | undefined,
    newYear?: number | undefined,
    newCellphone?: string | undefined,
    newCourse?: COURSE | undefined,
    newActive?: ACTIVE | undefined
  ): Promise<Member> {
    try {
      const token = localStorage.getItem('idToken')

      if (!token) {
        throw new Error('Token not found')
      }

      const response = await this.http.put<JsonProps>('/update-member', {
        name: newName,
        email_dev: newEmailDev,
        role: newRole,
        stack: newStack,
        year: newYear,
        cellphone: newCellphone,
        course: newCourse,
        active: newActive
      })

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
          Authorization: 'Bearer ' + token
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
