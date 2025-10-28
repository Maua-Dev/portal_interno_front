import { createContext, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { Member } from '../../@clean/shared/domain/entities/member'
import { COURSE } from '../../@clean/shared/domain/enums/course_enum'
import { ROLE } from '../../@clean/shared/domain/enums/role_enum'
import { STACK } from '../../@clean/shared/domain/enums/stack_enum'
import {
  RegistryMember,
  containerMember
} from '../../@clean/shared/infra/containers/container_member'
import { GetMemberUsecase } from '../../@clean/modules/member/usecases/get_member_usecase'
import { GetAllMembersUsecase } from '../../@clean/modules/member/usecases/get_all_members_usecase'
import { UpdateMemberUsecase } from '../../@clean/modules/member/usecases/update_member_usecase'
import { DeleteMemberUsecase } from '../../@clean/modules/member/usecases/delete_member_usecase'
import { ACTIVE } from '../../@clean/shared/domain/enums/active_enum'
import { CreateMemberUsecase } from '../../@clean/modules/member/usecases/create_member_usecase'
import { GetAllMembersAdminUsecase } from '../../@clean/modules/member/usecases/get_all_members_admin_usecase.ts'
import { CreateStrikeUsecase } from '../../@clean/modules/member/usecases/create_strike_usecase'
import type { StrikeCreationResponse } from '../../@clean/shared/infra/repositories//member_repository_http.ts'

export interface MemberContextInterface {
  getMember: () => Promise<Member>

  getAllMembers: () => Promise<Member[]>

  createStrike: (
    memberUserId: string,
    reason: string,
    comment: string,
    date: number
  ) => Promise<StrikeCreationResponse>

  createMember: (
    ra: string,
    emailDev: string,
    role: ROLE,
    stack: STACK,
    year: number,
    cellphone: string,
    course: COURSE
  ) => Promise<Member>

  updateMember: (
    memberUserId: string,
    newName?: string,
    newEmailDev?: string,
    newRole?: ROLE,
    newStack?: STACK,
    newYear?: number,
    newCellphone?: string,
    newCourse?: COURSE,
    newActive?: ACTIVE
  ) => Promise<Member>

  deleteMember: () => Promise<Member>

  handleMember: () => Promise<void>

  handleAllMembers: () => Promise<void>

  handleLogout: () => void

  member: Member | undefined

  allMembers: Member[] | undefined

  memberError: string

  isAdmin: boolean

  isRegister: boolean

  isOnHold: boolean

  changeMemberProfilePicture: (newPhoto: string) => Promise<Member>
}

const defaultContext: MemberContextInterface = {
  createStrike: async (memberUserId, reason, comment, date) => {
    return {} as StrikeCreationResponse
  },
  getMember: async () => {
    return {} as Member
  },

  getAllMembers: async () => {
    return [] as Member[]
  },

  createMember: async () => {
    return {} as Member
  },

  updateMember: async () => {
    return {} as Member
  },

  deleteMember: async () => {
    return {} as Member
  },

  handleAllMembers: async () => {},

  handleMember: async () => {},

  handleLogout: () => {},

  changeMemberProfilePicture: async () => {
    return {} as Member
  },

  member: undefined,

  allMembers: [],

  memberError: '',

  isAdmin: false,

  isRegister: false,

  isOnHold: false
}

export const MemberContext = createContext(defaultContext)

const getMembersUsecase = containerMember.get<GetMemberUsecase>(
  RegistryMember.GetMemberUsecase
)
const createStrikeUsecase = containerMember.get<CreateStrikeUsecase>(
  RegistryMember.CreateStrikeUsecase
)

const getAllMembersUsecase = containerMember.get<GetAllMembersUsecase>(
  RegistryMember.GetAllMembersUsecase
)

const getAllMembersAdminUsecase =
  containerMember.get<GetAllMembersAdminUsecase>(
    RegistryMember.GetAllMembersAdimUsecase
  )

const createMemberUsecase = containerMember.get<CreateMemberUsecase>(
  RegistryMember.CreateMemberUsecase
)

const updateMemberUsecase = containerMember.get<UpdateMemberUsecase>(
  RegistryMember.UpdateMemberUsecase
)

const deleteMemberUsecase = containerMember.get<DeleteMemberUsecase>(
  RegistryMember.DeleteMemberUsecase
)

export function MemberProvider({ children }: PropsWithChildren) {
  const [memberError, setMemberError] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [allMembers, setAllMembers] = useState<Member[] | undefined>([])
  const [isRegister, setIsRegister] = useState(false)
  const [isOnHold, setIsOnHold] = useState(false)
  const [member, setMember] = useState<Member | undefined>()

  async function createStrike(
    memberUserId: string,
    reason: string,
    comment: string,
    date: number
  ) {
    try {
      const response = await createStrikeUsecase.execute(
        memberUserId,
        reason,
        comment,
        date
      )
      return response
    } catch (error: any) {
      setMemberError(error.message)
      throw new Error('Something went wrong on create strike: ' + error.message)
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
      const member = await getMember()
      setMember(member)
    } catch (error: any) {
      if (error.message.toLowerCase().includes('user is not registered')) {
        setIsRegister(true)
      } else if (error.message.toLowerCase().includes('user is not active')) {
        setIsOnHold(true)
      } else {
        window.location.replace('/login')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('idToken')
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
      const member = await getMembersUsecase.execute()

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
      let members
      const member = await getMembersUsecase.execute()

      if (handleAdmin(member.role)) {
        members = await getAllMembersAdminUsecase.execute()
      } else {
        members = await getAllMembersUsecase.execute()
      }

      console.log('===== CONTEXT DEBUG =====')
      console.log('Members from context:', members)
      console.log('First member:', members.members[0])
      console.log('First member cellphone:', members.members[0]?.cellphone)
      console.log('==========================')

      return members.members
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
      const createdMember = await createMemberUsecase.execute(
        ra,
        emailDev,
        role,
        stack,
        year,
        cellphone,
        course
      )
      return createdMember
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
      const updatedMember = await updateMemberUsecase.execute(
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
      return updatedMember
    } catch (error: any) {
      setMemberError(error.message)
      throw new Error('Something went wrong on update member: ' + error.message)
    }
  }

  async function deleteMember() {
    try {
      const deletedMember = await deleteMemberUsecase.execute()

      return deletedMember
    } catch (error: any) {
      setMemberError(error.message)
      throw new Error('Something went wrong on delete member: ' + error.message)
    }
  }

  async function changeMemberProfilePicture(newPhoto: string) {
    try {
      const response = await updateMemberUsecase.execute(
        member?.userId as string,
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

      // Update member context
      setMember(response)

      return response
    } catch (error: any) {
      setMemberError(error.message)
      throw new Error('Something went wrong on delete member: ' + error.message)
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
        handleAllMembers,
        allMembers,
        isAdmin,
        createStrike,
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
