import { createContext, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { http } from '../../@clean/shared/infra/http'
import { Member } from '../../@clean/shared/domain/entities/member'
import { COURSE, courseToEnum } from '../../@clean/shared/domain/enums/course_enum'
import { ROLE, roleToEnum } from '../../@clean/shared/domain/enums/role_enum'
import { STACK, stackToEnum } from '../../@clean/shared/domain/enums/stack_enum'
import { ACTIVE, activeToEnum } from '../../@clean/shared/domain/enums/active_enum'
import { Strike } from '../../@clean/shared/domain/entities/strike'
import { STRIKE_CATEGORY } from '../../@clean/shared/domain/enums/strike_category_enum'
import { MemberRepositoryHttp } from '../../@clean/shared/infra/repositories/member_repository_http'

import { defaultMemberContext } from './member_context_type'
import type { MemberContextInterface } from './member_context_type'

export const MemberContext = createContext<MemberContextInterface>(defaultMemberContext)

export function MemberProvider({ children }: PropsWithChildren) {
  const memberRepository = new MemberRepositoryHttp(http)
  const [memberError, setMemberError] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [allMembers, setAllMembers] = useState<Member[] | undefined>([])
  const [isRegister, setIsRegister] = useState(false)
  const [isOnHold, setIsOnHold] = useState(false)
  const [member, setMember] = useState<Member | undefined>()

  async function createStrike(
    memberUserId: string,
    reason: STRIKE_CATEGORY,
    comment: string,
    date: number,
    ownerUserId: string
  ) {
    try {
      const response = await memberRepository.createStrike(
        memberUserId,
        reason,
        comment,
        date,
        ownerUserId
      )
      return response
    } catch (error: any) {
      console.error('Detailed Create Strike Error:', error.response?.data)
      setMemberError(error.message)
      throw new Error(
        'Something went wrong on create strike: ' +
          (error.response?.data?.message || error.message)
      )
    }
  }

  async function deleteStrike(strikeId: string) {
    try {
      await memberRepository.deleteStrike(strikeId)
    } catch (error: any) {
      setMemberError(error.message)
      throw new Error(error.message)
    }
  }

  async function getStrike(strikeId: string): Promise<Strike> {
    try {
      const strike = await memberRepository.getStrike(strikeId)
      return strike
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async function handleAllMembers() {
    try {
      const member = await getMember()
      const allMembers = await getAllMembers()

      if (allMembers && member) {
        const members = allMembers
          .filter((m) => m.userId !== member?.userId)
          .sort((a, b) => a.name.localeCompare(b.name))
        setAllMembers(members)
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const handleMember = async () => {
    try {
      const token = localStorage.getItem('idToken')
      if (!token) {
        handleLogout()
        return
      }
      const member = await getMember()
      setMember(member)
    } catch (error: any) {
      const msg = (error.message || '').toLowerCase()
      console.log('handleMember error message:', error.message)
      console.log('handleMember error response:', error.response?.data)
      console.log('handleMember error status:', error.response?.status)
      if (msg.includes('user is not registered') || msg.includes('no items found')) {
        setIsRegister(true)
      } else if (msg.includes('user is not active') || msg.includes('no permission')) {
        setIsOnHold(true)
      } else {
        console.error('Error in handleMember:', error)
      }
    }
  }

  const handleAdmin = (role: string) => {
    return ['HEAD', 'DIRECTOR'].includes(role)
  }

  const handleLogout = () => {
    localStorage.removeItem('idToken')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    window.location.replace('/login')
  }

  async function getMember(): Promise<Member> {
    try {
      const member = await memberRepository.getMember()

      if (handleAdmin(member.role)) {
        setIsAdmin(true)
      } else {
        setIsAdmin(false)
      }

      return member
    } catch (error: any) {
      setMemberError(error.message)
      throw new Error('Something went wrong on get member: ' + error.message)
    }
  }

  async function getAllMembers(): Promise<Member[]> {
    try {
      const token = localStorage.getItem('idToken')
      if (!token) throw new Error('Token not found')
      const member = await getMember()

      let endpoint = '/get-all-members'
      if (handleAdmin(member.role)) {
        endpoint = '/get-all-members-admin'
      }

      const response = await http.post<any>(
        endpoint,
        {},
        { headers: { Authorization: token } }
      )

      const membersList: Member[] = []

      if (response.data.members && Array.isArray(response.data.members)) {
        response.data.members.forEach((item: any, index: number) => {
           const m = item.member
           try {
             membersList.push(new Member({
                name: m.name,
                emailDev: m.email_dev,
                email: m.email,
                ra: m.ra,
                role: roleToEnum(m.role),
                stack: stackToEnum(m.stack),
                year: m.year,
                cellphone: m.cellphone,
                course: courseToEnum(m.course),
                hiredDate: m.hired_date,
                deactivatedDate: m.deactivated_date,
                active: activeToEnum(m.active),
                userId: m.user_id,
                hoursWorked: m.hours_worked,
                project: m.project,
                photo: m.photo,
                strikes: m.strikes ?? 0,
                strikesId: m.strikes_id ?? [],
                strikes_allowed: m.strikes_allowed ?? 0
             }))
           } catch (e: any) {
             console.warn(`Aviso: Pulando membro no índice ${index} devido a erro: ${e.message}`, m)
           }
        })
      }

      return membersList
    } catch (error: any) {
      setMemberError(error.message)
      throw new Error(
        'Something went wrong on get all members: ' + error.message
      )
    }
  }

  async function createMember(
    ra: string,
    emailDev: string,
    role: ROLE,
    stack: STACK,
    year: number,
    cellphone: string,
    course: COURSE
  ) {
    try {
      const member = await memberRepository.createMember(
        ra,
        emailDev,
        role,
        stack,
        year,
        cellphone,
        course
      )
      return member
    } catch (error: any) {
      setMemberError(error.message)
      throw new Error('Something went wrong on create member: ' + error.message)
    }
  }

  async function updateMember(
    memberUserId: string,
    newName?: string,
    newEmailDev?: string,
    newRole?: ROLE,
    newStack?: STACK,
    newYear?: number,
    newCellphone?: string,
    newCourse?: COURSE,
    newActive?: ACTIVE
  ) {
    try {
      const member = await memberRepository.updateMember(
        memberUserId,
        newName,
        newEmailDev,
        newRole,
        newStack,
        newYear,
        newCellphone,
        newCourse,
        newActive
      )
      return member
    } catch (error: any) {
      setMemberError(error.message)
      throw new Error('Something went wrong on update member: ' + error.message)
    }
  }

  async function deleteMember() {
    try {
      const member = await memberRepository.deleteMember()
      return member
    } catch (error: any) {
      setMemberError(error.message)
      throw new Error('Something went wrong on delete member: ' + error.message)
    }
  }

  async function changeMemberProfilePicture(newPhoto: string) {
    try {
      if (!member) throw new Error('Member not found')
      
      const updatedMember = await memberRepository.updateMember(
        member.userId,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        newPhoto
      )

      setMember(updatedMember)

      return updatedMember
    } catch (error: any) {
      setMemberError(error.message)
      throw new Error('Something went wrong on change photo: ' + error.message)
    }
  }

  return (
    <MemberContext.Provider
      value={{
        member,
        getMember,
        getAllMembers,
        createMember,
        updateMember,
        deleteMember,
        memberError,
        handleMember,
        getStrike,
        handleAllMembers,
        allMembers,
        isAdmin,
        createStrike,
        deleteStrike,
        isRegister,
        isOnHold,
        handleLogout,
        changeMemberProfilePicture
      }}
    >
      {children}
    </MemberContext.Provider>
  )
}
