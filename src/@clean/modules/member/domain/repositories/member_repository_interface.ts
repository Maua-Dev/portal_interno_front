import { Member } from '../../../../shared/domain/entities/member'
import { ACTIVE } from '../../../../shared/domain/enums/active_enum'
import { COURSE } from '../../../../shared/domain/enums/course_enum'
import { ROLE } from '../../../../shared/domain/enums/role_enum'
import { STACK } from '../../../../shared/domain/enums/stack_enum'

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

  getMember(): Promise<Member>

  getAllMembers(): Promise<Member[]>

  getAllMembersAdmin(): Promise<Member[]>

  updateMember(
    newName?: string,
    newEmailDev?: string,
    newRole?: ROLE,
    newStack?: STACK,
    newYear?: number,
    newCellphone?: string,
    newCourse?: COURSE,
    newActive?: ACTIVE
  ): Promise<Member>

  deleteMember(): Promise<Member>
}
