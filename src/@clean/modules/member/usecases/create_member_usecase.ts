import { COURSE } from '../../../shared/domain/enums/course_enum'
import { ROLE } from '../../../shared/domain/enums/role_enum'
import { STACK } from '../../../shared/domain/enums/stack_enum'
import { IMemberRepository } from '../domain/repositories/member_repository_interface'

export class CreateMemberUsecase {
  constructor(private readonly repo: IMemberRepository) {}

  async execute(
    ra: string,
    emailDev: string,
    role: ROLE,
    stack: STACK,
    year: number,
    cellphone: string,
    course: COURSE
  ) {
    const createdMember = await this.repo.createMember(
      ra,
      emailDev,
      role,
      stack,
      year,
      cellphone,
      course
    )

    return createdMember
  }
}
