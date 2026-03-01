import { Member } from '../../@clean/shared/domain/entities/member'
import { COURSE } from '../../@clean/shared/domain/enums/course_enum'
import { ROLE } from '../../@clean/shared/domain/enums/role_enum'
import { STACK } from '../../@clean/shared/domain/enums/stack_enum'
import { ACTIVE } from '../../@clean/shared/domain/enums/active_enum'
import { Strike } from '../../@clean/shared/domain/entities/strike'
import type { StrikeCreationResponse } from '../../@clean/shared/domain/entities/strike'
import { STRIKE_CATEGORY } from '../../@clean/shared/domain/enums/strike_category_enum'

export interface MemberContextInterface {
  getMember: () => Promise<Member>
  getAllMembers: () => Promise<Member[]>
  createStrike: (
    memberUserId: string,
    reason: STRIKE_CATEGORY,
    comment: string,
    date: number,
    ownerUserId: string
  ) => Promise<StrikeCreationResponse>
  deleteStrike: (strikeId: string) => Promise<void>
  getStrike: (strikeId: string) => Promise<Strike>
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

export const defaultMemberContext: MemberContextInterface = {
  createStrike: () => Promise.resolve({} as StrikeCreationResponse),
  deleteStrike: () => Promise.resolve(),
  getStrike: () => Promise.resolve({} as Strike),
  getMember: async () => ({} as Member),
  getAllMembers: async () => [] as Member[],
  createMember: async () => ({} as Member),
  updateMember: async () => ({} as Member),
  deleteMember: async () => ({} as Member),
  handleMember: async () => {},
  handleAllMembers: async () => {},
  handleLogout: () => {},
  member: undefined,
  allMembers: [] as Member[],
  memberError: '',
  isAdmin: false,
  isRegister: false,
  isOnHold: false,
  changeMemberProfilePicture: async () => ({} as Member)
}
