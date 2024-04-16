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

export type MemberContextType = {
  getMember: () => Promise<Member | undefined>

  getAllMembers: () => Promise<Member[] | undefined>

  createMember: (
    ra: string,
    emailDev: string,
    role: ROLE,
    stack: STACK,
    year: number,
    cellphone: string,
    course: COURSE
  ) => Promise<Member | undefined>

  updateMember: (
    newName?: string,
    newEmailDev?: string,
    newRole?: ROLE,
    newStack?: STACK,
    newYear?: number,
    newCellphone?: string,
    newCourse?: COURSE,
    newActive?: ACTIVE
  ) => Promise<Member | undefined>

  deleteMember: () => Promise<Member | undefined>

  memberError: string
  setMemberError: (memberError: string) => void
}

const defaultContext: MemberContextType = {
  getMember: async () => {
    return undefined
  },

  getAllMembers: async () => {
    return []
  },

  createMember: async (
    _ra: string,
    _emailDev: string,
    _role: ROLE,
    _stack: STACK,
    _year: number,
    _cellphone: string,
    _course: COURSE
  ) => {
    return undefined
  },

  updateMember: async (
    _newName?: string,
    _newEmailDev?: string,
    _newRole?: ROLE,
    _newStack?: STACK,
    _newYear?: number,
    _newCellphone?: string,
    _newCourse?: COURSE,
    _newActive?: ACTIVE
  ) => {
    return undefined
  },

  deleteMember: async () => {
    return undefined
  },

  memberError: '',

  setMemberError: (_memberError: string) => {
    return ''
  }
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
  const [memberError, setMemberError] = useState<string>('')

  async function getMember() {
    try {
      const member = await getMembersUsecase.execute()

      return member
    } catch (error: any) {
      console.log('Something went wrong on get member: ', error)
    }
  }

  async function getAllMembers(): Promise<Member[] | undefined> {
    try {
      const members = await getAllMembersUsecase.execute()

      return members.members
    } catch (error: any) {
      console.log('Something went wrong on get all members: ', error)
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
      console.error('Something went wrong on create member: ', error.message)
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
      console.error('Something went wrong on update member: ', error.message)
    }
  }

  async function deleteMember() {
    try {
      const deletedMember = await deleteMemberUsecase.execute()

      return deletedMember
    } catch (error: any) {
      setMemberError(error.message)
      console.error('Something went wrong on delete member: ', error.message)
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
        setMemberError
      }}
    >
      {children}
    </MemberContext.Provider>
  )
}
