import { Member } from '../../../../shared/domain/entities/member'
import { ACTIVE } from '../../../../shared/domain/enums/active_enum'
import { COURSE } from '../../../../shared/domain/enums/course_enum'
import { ROLE } from '../../../../shared/domain/enums/role_enum'
import { STACK } from '../../../../shared/domain/enums/stack_enum'
import { Strike, type StrikeCreationResponse } from '../../../../shared/domain/entities/strike'
import { STRIKE_CATEGORY } from '../../../../shared/domain/enums/strike_category_enum'

export interface IMemberRepository {
  createMember(
    ra: string,
    emailDev: string,
    role: ROLE,
    stack: STACK,
    year: number,
    cellphone: string,
    course: COURSE
  ): Promise<Member>

  createStrike(
    memberUserId: string,
    reason: STRIKE_CATEGORY,
    comment: string,
    date: number,
    ownerUserId: string // qual admin deu o strike
  ): Promise<StrikeCreationResponse>

  getMember(): Promise<Member>

  getAllMembers(): Promise<Member[]>

  getAllMembersAdmin(): Promise<Member[]>

  updateMember(
    memberUserId: string,
    newName?: string,
    newEmailDev?: string,
    newRole?: ROLE,
    newStack?: STACK,
    newYear?: number,
    newCellphone?: string,
    newCourse?: COURSE,
    newActive?: ACTIVE,
    newPhoto?: string
  ): Promise<Member>

  deleteMember(): Promise<Member>

  getStrike(strikeId: string): Promise<Strike>

  getAllStrikes(): Promise<Strike[]>
}
