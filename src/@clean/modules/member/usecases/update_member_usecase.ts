import { ACTIVE } from '../../../shared/domain/enums/active_enum'
import { COURSE } from '../../../shared/domain/enums/course_enum'
import { ROLE } from '../../../shared/domain/enums/role_enum'
import { STACK } from '../../../shared/domain/enums/stack_enum'
import { IMemberRepository } from '../domain/repositories/member_repository_interface'

export class UpdateMemberUsecase {
  constructor(private readonly repo: IMemberRepository) {}

  async execute(
    newName?: string,
    newEmailDev?: string,
    newRole?: ROLE,
    newStack?: STACK,
    newYear?: number,
    newCellphone?: string,
    newCourse?: COURSE,
    newActive?: ACTIVE
  ) {
    const member = await this.repo.updateMember(
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
  }
}
