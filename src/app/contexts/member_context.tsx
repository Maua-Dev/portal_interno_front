import { PropsWithChildren, createContext, useState } from 'react'
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

export interface MemberContextInterface {
  getMember: () => Promise<Member>

  getAllMembers: () => Promise<Member[]>

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

  handleAllMembers: () => Promise<void>

  allMembers: Member[] | undefined

  memberError: string

  isAdmin: boolean
}

const defaultContext: MemberContextInterface = {
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

  allMembers: [],

  memberError: '',

  isAdmin: false
}

export const MemberContext = createContext(defaultContext)

const getMembersUsecase = containerMember.get<GetMemberUsecase>(
  RegistryMember.GetMemberUsecase
)

const getAllMembersUsecase = containerMember.get<GetAllMembersUsecase>(
  RegistryMember.GetAllMembersUsecase
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

  const handleAllMembers = async () => {
    try {
      const allMembers = await getAllMembers()
      const member = await getMember()

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

  const handleAdmin = (role: string) => {
    return ['HEAD', 'DIRECTOR'].includes(role)
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
      const members = await getAllMembersUsecase.execute()

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

  return (
    <MemberContext.Provider
      value={{
        getMember,
        getAllMembers,
        createMember,
        updateMember,
        deleteMember,
        memberError,
        isAdmin,
        handleAllMembers,
        allMembers
      }}
    >
      {children}
    </MemberContext.Provider>
  )
}
